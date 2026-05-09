"""
build-webp.py — Generate responsive WebP variants for hero images.
Usage: python scripts/build-webp.py  (run from work/website/)
"""

import os
from pathlib import Path
from PIL import Image

IMAGES_DIR = Path(__file__).parent.parent / "images"
QUALITY = 82
TARGET_WIDTHS = [480, 768, 1200, 1920]

SOURCES = [
    "chris-chef-portrait.jpg",
    "chris-cooking-action.jpg",
    "chris-sharpening-knife.jpg",
    "Kitchen1.jpg",
    "black-forest-sunlight.jpg",
]


def build_variants():
    generated = []
    skipped = []

    for src_name in SOURCES:
        src_path = IMAGES_DIR / src_name
        if not src_path.exists():
            print(f"MISSING: {src_path} — skipping")
            continue

        with Image.open(src_path) as img:
            src_w, src_h = img.size
            basename = src_path.stem

            for width in TARGET_WIDTHS:
                if width > src_w:
                    print(f"SKIP (upscale): {basename}-{width}.webp — source is {src_w}px wide")
                    skipped.append(f"{basename}-{width}.webp")
                    continue

                out_path = IMAGES_DIR / f"{basename}-{width}.webp"

                if out_path.exists():
                    print(f"EXISTS: {out_path.name} — skipping")
                    skipped.append(out_path.name)
                    continue

                height = round(src_h * (width / src_w))
                resized = img.resize((width, height), Image.LANCZOS)
                resized.save(out_path, format="WEBP", quality=QUALITY, method=6)

                src_kb = src_path.stat().st_size // 1024
                out_kb = out_path.stat().st_size // 1024
                print(f"CREATED: {out_path.name} ({out_kb} KB)  [source: {src_kb} KB]")
                generated.append(out_path.name)

    print(f"\nDone. {len(generated)} created, {len(skipped)} skipped.")


if __name__ == "__main__":
    build_variants()
