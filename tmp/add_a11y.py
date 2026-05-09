"""
add_a11y.py — Add skip link, a11y.css link, and main id to all in-scope pages.
Run from anywhere: python work/website/tmp/add_a11y.py
"""
import os
import re

WEBSITE = r"C:\Users\cschi\Documents\christian_schiffner\work\website"

ROOT_PAGES = [
    "21-day-protocol.html", "21-day-protocol-waitlist.html", "about.html",
    "assessment.html", "brochure-kit.html",
    "discovery-kit-diagnosis-workbook.html", "discovery-kit-exposure-sheet.html",
    "discovery-kit-measurement-tracker.html", "discovery-kit-protocol-builder.html",
    "discovery-kit-response-cards.html",
    "framework.html", "gift.html", "index.html", "install.html",
    "kit.html", "kit-access.html", "leak.html", "life-os-scorecard.html",
    "newsletter.html", "offers.html", "operator-os.html", "operator-os-thank-you.html",
    "privacy.html", "readiness-scorecard.html", "restaurant-staff-turnover-cost.html",
    "scorecard.html", "services.html", "standards.html", "terms.html",
    "thank-you.html", "tools.html",
]

BLOG_DIR = os.path.join(WEBSITE, "blog")
LP_DIR = os.path.join(WEBSITE, "lp")


def get_subdir_pages(d):
    return [
        os.path.join(d, f) for f in os.listdir(d)
        if f.endswith(".html") and f != "_template.html"
    ]


def all_pages():
    pages = [os.path.join(WEBSITE, p) for p in ROOT_PAGES]
    pages += get_subdir_pages(BLOG_DIR)
    pages += get_subdir_pages(LP_DIR)
    return pages


CSS_LINK = '<link rel="stylesheet" href="/css/a11y.css">'
SKIP_LINK = '<a href="#main" class="skip-link">Skip to main content</a>'


def process_file(path):
    with open(path, encoding="utf-8") as f:
        content = f.read()

    original = content
    changed = []

    # 1. Add CSS link in <head> if not already present
    if "/css/a11y.css" not in content:
        content = content.replace("</head>", f"  {CSS_LINK}\n</head>", 1)
        changed.append("css-link")

    # 2. Add skip link as first element inside <body> if not already present
    if 'class="skip-link"' not in content:
        content = re.sub(r"(<body[^>]*>)", r"\1\n" + SKIP_LINK, content, count=1)
        changed.append("skip-link")

    # 3. Ensure <main> has id="main"
    # Match <main> that does NOT already have id="main"
    if re.search(r'<main(?![^>]*id=["\']main["\'])[^>]*>', content):
        content = re.sub(r'<main(?![^>]*id=["\']main["\'])([^>]*)>', r'<main id="main"\1>', content, count=1)
        changed.append("main-id")
    elif "<main" not in content:
        changed.append("NO-MAIN-TAG")

    if content != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"UPDATED [{', '.join(changed)}]: {os.path.relpath(path, WEBSITE)}")
    else:
        print(f"SKIP (already done): {os.path.relpath(path, WEBSITE)}")


pages = all_pages()
print(f"Processing {len(pages)} pages...\n")
for p in sorted(pages):
    if os.path.exists(p):
        process_file(p)
    else:
        print(f"MISSING: {p}")

print("\nDone.")
