#!/usr/bin/env python3
"""
gen-og-image.py -- generate a per-post Open Graph card with Gemini Nano Banana Pro.

Matches the existing 22 cards: a moody, cinematic, dark-kitchen PHOTO (no headline
text baked in) with a small white sparkle mark in the bottom-right corner.
Output: images/og/<slug>.jpg, exactly 1200x630, ready for og:image / twitter:image.

Usage:
    python gen-og-image.py --slug <slug> --title "<headline>" [--scene "<subject>"]
                           [--model gemini-3-pro-image-preview] [--force]

Auth: reads GEMINI_API_KEY from the environment (source config.env first).
Wired into publish-blog-draft.py so every new post gets a card automatically.
"""
import os, sys, argparse, io

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # work/website
OG_DIR = os.path.join(ROOT, "images", "og")
W, H = 1200, 630
DEFAULT_MODEL = "gemini-3-pro-image-preview"  # Nano Banana Pro


def die(msg, code=1):
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(code)


def build_prompt(title, scene):
    """Brand-consistent prompt. No text, no logos, no watermarks -- the sparkle is
    stamped locally afterwards so it stays pixel-identical across every card."""
    subject = scene or (
        f'a scene that visually represents the theme "{title}" inside a '
        "professional restaurant kitchen"
    )
    return (
        "Cinematic, photorealistic editorial photograph for a restaurant-operations "
        f"blog. Subject: {subject}. "
        "Mood: dark, moody, atmospheric, end-of-service quiet. Setting: a real "
        "professional stainless-steel commercial kitchen. Lighting: dim, with a warm "
        "copper/amber heat-lamp glow against cool desaturated navy-blue shadows. "
        "Shot on a full-frame camera with a wide 35mm lens, shallow depth of field, "
        "fine film grain, high dynamic range. Wide 1.91:1 landscape composition with "
        "clear negative space in the lower-right quadrant. "
        "STRICTLY NO text, NO words, NO letters, NO logos, NO watermarks, NO signage, "
        "NO captions anywhere in the image. Photographic only."
    )


def generate_bytes(prompt, model):
    from google import genai
    from google.genai import types

    key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not key:
        die("GEMINI_API_KEY not set -- run: source config.env")
    client = genai.Client(api_key=key)

    cfg = types.GenerateContentConfig(
        response_modalities=["Image"],
        image_config=types.ImageConfig(aspect_ratio="16:9"),
    )
    try:
        resp = client.models.generate_content(model=model, contents=prompt, config=cfg)
    except Exception as e:
        # aspect_ratio / image_config unsupported on some model aliases -> retry plain
        try:
            resp = client.models.generate_content(
                model=model, contents=prompt,
                config=types.GenerateContentConfig(response_modalities=["Image"]),
            )
        except Exception as e2:
            die(f"Gemini image call failed ({model}): {e2 or e}")

    for cand in (resp.candidates or []):
        for part in (cand.content.parts or []):
            data = getattr(part, "inline_data", None)
            if data and data.data:
                return data.data
    die("Gemini returned no image data (check model access / content filters)")


def to_card(raw_bytes, slug):
    from PIL import Image, ImageDraw

    im = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
    # center-crop to the 1200x630 (1.905:1) aspect, then resize
    target = W / H
    sw, sh = im.size
    if sw / sh > target:
        nw = int(sh * target)
        im = im.crop(((sw - nw) // 2, 0, (sw - nw) // 2 + nw, sh))
    else:
        nh = int(sw / target)
        im = im.crop((0, (sh - nh) // 2, sw, (sh - nh) // 2 + nh))
    im = im.resize((W, H), Image.LANCZOS)

    # white 4-point sparkle mark, bottom-right -- matches the existing 22 cards
    draw = ImageDraw.Draw(im)
    cx, cy, r, w = W - 52, H - 52, 17, 5  # center, outer radius, waist
    pts = [
        (cx, cy - r), (cx + w, cy - w), (cx + r, cy), (cx + w, cy + w),
        (cx, cy + r), (cx - w, cy + w), (cx - r, cy), (cx - w, cy - w),
    ]
    draw.polygon(pts, fill=(248, 249, 250))  # --white #F8F9FA

    os.makedirs(OG_DIR, exist_ok=True)
    out = os.path.join(OG_DIR, f"{slug}.jpg")
    im.save(out, "JPEG", quality=86, optimize=True)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--slug", required=True)
    ap.add_argument("--title", required=True)
    ap.add_argument("--scene", default="", help="override the photographic subject")
    ap.add_argument("--model", default=DEFAULT_MODEL)
    ap.add_argument("--force", action="store_true", help="regenerate even if file exists")
    a = ap.parse_args()

    out = os.path.join(OG_DIR, f"{a.slug}.jpg")
    if os.path.exists(out) and not a.force:
        print(f"  OG image exists, skipping: images/og/{a.slug}.jpg (use --force to redo)")
        return

    prompt = build_prompt(a.title, a.scene)
    print(f"  generating OG card via {a.model} ...")
    raw = generate_bytes(prompt, a.model)
    path = to_card(raw, a.slug)
    rel = os.path.relpath(path, ROOT).replace("\\", "/")
    print(f"  OK -> {rel}")


if __name__ == "__main__":
    main()
