#!/usr/bin/env python3
"""
publish-blog-draft.py — turn a blog markdown draft into a deploy-ready HTML page
plus index card, RSS item, and sitemap URL. Review-gated: builds + opens a local
preview by default. Does NOT push. Run git push yourself after eyeballing it.

Usage:
    python publish-blog-draft.py <draft.md> [--no-open]

Input  : work/website/blog/drafts/YYYY-MM-DD-slug.md (frontmatter + markdown body)
Output : blog/<slug>.html (new) + edits to blog/index.html, blog/feed.xml, sitemap.xml
"""
import sys, os, re, html, datetime, math, webbrowser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # work/website
BLOG = os.path.join(ROOT, "blog")
TEMPLATE = os.path.join(BLOG, "_template.html")

PILLAR_BADGE = {
    "STAFF": ("badge-strategy", "Staff & Systems"),
    "PROFIT": ("badge-recovery", "Profit Recovery"),
    "MENU": ("badge-pricing", "Menu & Pricing"),
    "FOOD COST": ("badge-pricing", "Food Cost & Pricing"),
    "SYSTEMS": ("badge-strategy", "Systems"),
}
DEFAULT_BADGE = ("badge-strategy", "Restaurant Operations")


def die(msg):
    print("ERROR:", msg); sys.exit(1)


# ---------- frontmatter ----------
def parse_front(text):
    if not text.startswith("---"):
        die("draft has no YAML frontmatter")
    _, fm, body = text.split("---", 2)
    meta, faq, cur = {}, [], None
    for raw in fm.splitlines():
        if not raw.strip():
            continue
        if re.match(r"^\s*-\s*q:", raw):
            cur = {"q": raw.split("q:", 1)[1].strip().strip('"')}
            faq.append(cur); continue
        if re.match(r"^\s+a:", raw) and cur is not None:
            cur["a"] = raw.split("a:", 1)[1].strip().strip('"'); continue
        m = re.match(r"^([a-z_]+):\s*(.*)$", raw)
        if m:
            cur = None
            k, v = m.group(1), m.group(2).strip().strip('"')
            meta[k] = v
    meta["faq"] = faq
    return meta, body.strip()


# ---------- markdown -> html ----------
def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', t)
    t = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", t)
    return t


def md_to_html(md):
    lines = md.splitlines()
    out, i, first_h1_dropped = [], 0, False
    while i < len(lines):
        ln = lines[i].rstrip()
        if not ln.strip():
            i += 1; continue
        if ln.startswith("# ") and not first_h1_dropped:
            first_h1_dropped = True; i += 1; continue          # title lives in <header>
        if ln.startswith("## "):
            out.append(f"        <h2>{inline(ln[3:].strip())}</h2>"); i += 1; continue
        if ln.startswith("### "):
            out.append(f"        <h3>{inline(ln[4:].strip())}</h3>"); i += 1; continue
        if re.match(r"^\d+\.\s", ln):
            items = []
            while i < len(lines) and re.match(r"^\d+\.\s", lines[i].strip()):
                items.append("          <li>" + inline(re.sub(r"^\d+\.\s", "", lines[i].strip())) + "</li>")
                i += 1
            out.append("        <ol>\n" + "\n".join(items) + "\n        </ol>"); continue
        if re.match(r"^[-*]\s", ln.strip()):
            items = []
            while i < len(lines) and re.match(r"^[-*]\s", lines[i].strip()):
                items.append("          <li>" + inline(re.sub(r"^[-*]\s", "", lines[i].strip())) + "</li>")
                i += 1
            out.append("        <ul>\n" + "\n".join(items) + "\n        </ul>"); continue
        # paragraph (gather until blank)
        para = [ln]
        i += 1
        while i < len(lines) and lines[i].strip() and not re.match(r"^(#{1,3}\s|\d+\.\s|[-*]\s)", lines[i].strip()):
            para.append(lines[i].rstrip()); i += 1
        out.append("        <p>" + inline(" ".join(para)) + "</p>")
    return "\n".join(out)


# ---------- builders ----------
def build_html(meta, body_html):
    tpl = open(TEMPLATE, encoding="utf-8").read()
    head, _, tail = tpl.partition('<article class="article-body">')
    _, _, faq_onward = tail.partition('<div class="faq-section">')
    page = head + '<article class="article-body">\n' + body_html + '\n\n        <div class="faq-section">' + faq_onward

    date = meta["published_date"]
    dt = datetime.date.fromisoformat(date)
    wc = int(re.sub(r"\D", "", meta.get("word_count", "1000")) or 1000)
    read_time = max(1, round(wc / 200))
    title = meta["title"]
    faq = meta["faq"] + [{"q": "", "a": ""}] * 3

    reps = {
        "[ARTICLE_TITLE_SHORT]": title if len(title) < 60 else title[:57] + "...",
        "[ARTICLE_TITLE]": title,
        "[META_DESCRIPTION]": meta["meta_description"],
        "[SLUG]": meta["slug"],
        "[YYYY-MM-DD]": date,
        "[KEYWORDS]": meta.get("keywords", ""),
        "[WORD_COUNT]": str(wc),
        "[READ_TIME]": str(read_time),
        "[MONTH DD, YYYY]": dt.strftime("%B %d, %Y"),
        "[CTA_TEXT — e.g., Start the Free Calculator]": "Start the Free Calculator",
        "[FAQ_Q1]": faq[0]["q"], "[FAQ_A1]": faq[0].get("a", ""),
        "[FAQ_Q2]": faq[1]["q"], "[FAQ_A2]": faq[1].get("a", ""),
        "[FAQ_Q3]": faq[2]["q"], "[FAQ_A3]": faq[2].get("a", ""),
    }
    # related articles — pull blog internal_links from body, pad with newest existing
    related = related_links(meta, body_html)
    for n, (slug, rt) in enumerate(related, 1):
        reps[f"[RELATED_{n}_SLUG]"] = slug
        reps[f"[RELATED_{n}_TITLE]"] = rt
    for k, v in reps.items():
        page = page.replace(k, v)
    left = re.findall(r"\[[A-Z_0-9 ]+\]", page)
    if left:
        print("  WARN unresolved placeholders:", sorted(set(left))[:8])
    return page


def related_links(meta, body_html):
    found = []
    for slug in re.findall(r'/blog/([a-z0-9\-]+)\.html', body_html):
        if slug != meta["slug"] and slug not in [s for s, _ in found]:
            t = title_of(slug)
            if t:
                found.append((slug, t))
    for slug in newest_existing(meta["slug"]):
        if len(found) >= 3:
            break
        if slug not in [s for s, _ in found]:
            found.append((slug, title_of(slug) or slug))
    return (found + [("restaurant-profit-leak", "Find Your Restaurant's #1 Profit Leak")] * 3)[:3]


def title_of(slug):
    p = os.path.join(BLOG, slug + ".html")
    if not os.path.exists(p):
        return None
    m = re.search(r"<title>(.*?)\s*\|", open(p, encoding="utf-8").read())
    return m.group(1).strip() if m else None


def newest_existing(self_slug):
    items = []
    for f in os.listdir(BLOG):
        if f.endswith(".html") and not f.startswith("_") and f not in ("index.html",):
            slug = f[:-5]
            if slug != self_slug:
                items.append((os.path.getmtime(os.path.join(BLOG, f)), slug))
    return [s for _, s in sorted(items, reverse=True)]


def update_index(meta):
    p = os.path.join(BLOG, "index.html")
    s = open(p, encoding="utf-8").read()
    url = f"https://thegrumpychef.ca/blog/{meta['slug']}.html"
    if url in s:
        print("  index: already present, skipping"); return
    badge_cls, badge_label = PILLAR_BADGE.get(meta.get("pillar", "").upper(), DEFAULT_BADGE)
    card = (
        '        <div class="article-card">\n'
        f'          <div class="article-badge {badge_cls}">{badge_label}</div>\n'
        f'          <div class="article-title"><a href="/blog/{meta["slug"]}.html">{html.escape(meta["title"])}</a></div>\n'
        f'          <div class="article-desc">{html.escape(meta["meta_description"])}</div>\n'
        f'          <a href="/blog/{meta["slug"]}.html" class="article-link">Read Article &rarr;</a>\n'
        '        </div>\n'
    )
    anchor = '<div class="articles-grid">\n'
    idx = s.find('New This Week')
    gi = s.find(anchor, idx)
    if gi == -1:
        die("index.html: could not find New This Week articles-grid")
    insert_at = gi + len(anchor)
    s = s[:insert_at] + card + s[insert_at:]
    # ItemList schema entry at position 1, then renumber
    li = (
        '            {\n'
        '              "@type": "ListItem",\n'
        '              "position": 1,\n'
        f'              "name": "{meta["title"]}",\n'
        f'              "url": "{url}"\n'
        '            },\n'
    )
    s = s.replace('"itemListElement": [\n', '"itemListElement": [\n' + li, 1)
    n = [0]
    def renum(m):
        n[0] += 1; return f'"position": {n[0]}'
    s = re.sub(r'"position": \d+', renum, s)
    open(p, "w", encoding="utf-8").write(s)
    print("  index.html: card + schema added")


def update_feed(meta):
    p = os.path.join(BLOG, "feed.xml")
    s = open(p, encoding="utf-8").read()
    url = f"https://thegrumpychef.ca/blog/{meta['slug']}.html"
    if url in s:
        print("  feed: already present, skipping"); return
    dt = datetime.datetime.fromisoformat(meta["published_date"] + "T09:00:00")
    pub = dt.strftime("%a, %d %b %Y 09:00:00 -0700")
    item = (
        "    <item>\n"
        f"      <title>{html.escape(meta['title'])}</title>\n"
        f"      <link>{url}</link>\n"
        f"      <description>{html.escape(meta['meta_description'])}</description>\n"
        f"      <pubDate>{pub}</pubDate>\n"
        f"      <guid>{url}</guid>\n"
        "    </item>\n"
    )
    anchor = re.search(r'<atom:link[^>]*/>\n', s)
    if not anchor:
        die("feed.xml: atom:link anchor not found")
    s = s[:anchor.end()] + item + s[anchor.end():]
    s = re.sub(r"<lastBuildDate>.*?</lastBuildDate>", f"<lastBuildDate>{pub}</lastBuildDate>", s)
    open(p, "w", encoding="utf-8").write(s)
    print("  feed.xml: item added + lastBuildDate updated")


def update_sitemap(meta):
    p = os.path.join(ROOT, "sitemap.xml")
    s = open(p, encoding="utf-8").read()
    url = f"https://thegrumpychef.ca/blog/{meta['slug']}.html"
    if url in s:
        print("  sitemap: already present, skipping"); return
    block = (
        "  <url>\n"
        f"    <loc>{url}</loc>\n"
        f"    <lastmod>{meta['published_date']}</lastmod>\n"
        "    <changefreq>monthly</changefreq>\n"
        "    <priority>0.7</priority>\n"
        "  </url>\n"
    )
    s = s.replace("</urlset>", block + "</urlset>")
    open(p, "w", encoding="utf-8").write(s)
    print("  sitemap.xml: url added")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a for a in sys.argv[1:] if a.startswith("--")}
    if not args:
        die("usage: publish-blog-draft.py <draft.md> [--no-open]")
    draft = args[0]
    if not os.path.isabs(draft):
        draft = os.path.join(os.getcwd(), draft)
    if not os.path.exists(draft):
        die(f"draft not found: {draft}")
    meta, body = parse_front(open(draft, encoding="utf-8").read())
    for req in ("title", "slug", "meta_description", "published_date"):
        if not meta.get(req):
            die(f"frontmatter missing: {req}")
    body_html = md_to_html(body)
    page = build_html(meta, body_html)
    out = os.path.join(BLOG, meta["slug"] + ".html")
    open(out, "w", encoding="utf-8").write(page)
    print(f"  wrote {os.path.relpath(out, ROOT)} ({len(page)} bytes)")
    update_index(meta)
    update_feed(meta)
    update_sitemap(meta)
    print("\nBUILT (not pushed). Preview, then commit + push to go live:")
    print(f"  git -C \"{ROOT}\" add blog/{meta['slug']}.html blog/index.html blog/feed.xml sitemap.xml")
    print(f"  git -C \"{ROOT}\" commit -m \"blog: {meta['slug']}\" && git -C \"{ROOT}\" push")
    if "--no-open" not in flags:
        webbrowser.open("file:///" + out.replace("\\", "/"))


if __name__ == "__main__":
    main()
