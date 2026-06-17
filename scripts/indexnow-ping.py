#!/usr/bin/env python3
"""
indexnow-ping.py — Notify IndexNow (Bing, Yandex -> feeds ChatGPT/Copilot/Perplexity)
that pages on thegrumpychef.ca were published or updated.

IndexNow pushes URLs to participating search engines in minutes instead of waiting
for the next crawl. Google does NOT use IndexNow, but Bing's index is what ChatGPT
and Copilot read, and Perplexity leans on it too.

Key file: /11f1bf4a072c838762ce529682295a4f.txt must stay live at the web root.

Usage:
    # Submit specific URLs after publishing/updating:
    python scripts/indexnow-ping.py https://thegrumpychef.ca/blog/new-post.html

    # Submit every URL in sitemap.xml (use after a batch update):
    python scripts/indexnow-ping.py --all

Run AFTER the changed HTML is live on Netlify (push first, then ping) — IndexNow
crawlers verify the URL exists before indexing.
"""
import sys
import json
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
from pathlib import Path

HOST = "thegrumpychef.ca"
KEY = "11f1bf4a072c838762ce529682295a4f"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
ENDPOINT = "https://api.indexnow.org/indexnow"
SITEMAP = Path(__file__).resolve().parent.parent / "sitemap.xml"


def urls_from_sitemap() -> list[str]:
    tree = ET.parse(SITEMAP)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    return [loc.text.strip() for loc in tree.iterfind(".//sm:url/sm:loc", ns) if loc.text]


def submit(urls: list[str]) -> int:
    urls = [u for u in urls if u.startswith(f"https://{HOST}/")]
    if not urls:
        print("No valid thegrumpychef.ca URLs to submit.")
        return 1
    payload = json.dumps({
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }).encode("utf-8")
    req = urllib.request.Request(
        ENDPOINT, data=payload,
        headers={"Content-Type": "application/json; charset=utf-8"},
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            print(f"IndexNow HTTP {resp.status} — submitted {len(urls)} URL(s):")
            for u in urls:
                print(f"  {u}")
        return 0
    except urllib.error.HTTPError as e:
        # 200/202 = accepted. 422 = key/URL mismatch. 403 = key not found at root.
        print(f"IndexNow returned HTTP {e.code}: {e.reason}")
        print(f"  Body: {e.read().decode('utf-8', 'replace')}")
        return 0 if e.code in (200, 202) else 1
    except Exception as e:
        print(f"IndexNow ping failed: {e}")
        return 1


def main() -> int:
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        return 1
    if args == ["--all"]:
        return submit(urls_from_sitemap())
    return submit(args)


if __name__ == "__main__":
    raise SystemExit(main())
