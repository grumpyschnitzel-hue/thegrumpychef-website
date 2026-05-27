"""One-shot UTM tagger for internal /newsletter.html links."""
import re, os, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent  # work/website
CAMPAIGN = 'cta_footer_newsletter'
SOURCE = 'site'

def medium_for(relpath):
    p = relpath.as_posix()
    if p.startswith('blog/_template'):  return 'template'
    if p == 'blog/index.html':          return 'blog_index'
    if p.startswith('blog/'):           return 'blog'
    name = relpath.name
    return {
        'about.html':       'about',
        'index.html':       'home_footer',
        'kit.html':         'kit_page',
        'scorecard.html':   'scorecard',
        'standards.html':   'standards',
        'brochure-kit.html':'brochure',
        'privacy.html':     'legal_footer',
        'terms.html':       'legal_footer',
        'newsletter.html':  'self',
    }.get(name, 'site_other')

PATTERNS = [
    re.compile(r'href="(/newsletter\.html)"'),
    re.compile(r'href="(https://thegrumpychef\.ca/newsletter\.html)"'),
]

changed_total = 0
files_touched = []

SKIP_DIRS = {'tmp', 'docs', 'node_modules', 'Antigravity-Skill'}

for html in ROOT.rglob('*.html'):
    rel = html.relative_to(ROOT)
    if any(part in SKIP_DIRS for part in rel.parts):
        continue
    medium = medium_for(rel)
    if medium == 'self':
        continue

    text = html.read_text(encoding='utf-8')
    orig = text
    qs = f'?utm_source={SOURCE}&amp;utm_medium={medium}&amp;utm_campaign={CAMPAIGN}'

    for pat in PATTERNS:
        def repl(m, qs=qs):
            return f'href="{m.group(1)}{qs}"'
        text, n = pat.subn(repl, text)
        if n:
            changed_total += n

    if text != orig:
        files_touched.append((rel.as_posix(), medium))
        html.write_text(text, encoding='utf-8')

print(f"links tagged: {changed_total}")
print(f"files touched: {len(files_touched)}")
for f, m in files_touched:
    print(f"  {f}  ->  utm_medium={m}")
