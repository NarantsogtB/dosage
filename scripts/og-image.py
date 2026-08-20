#!/usr/bin/env python3
"""Сошиалд хуваалцахад гарах зургийг үүсгэнэ (app/opengraph-image.png).

    python3 scripts/og-image.py

Шаардлага: Pillow. Гараар, хэрэгцээтэй үед л ажиллуулна — build-д ОРОХГҮЙ.
Уриа эсвэл эмийн тоо өөрчлөгдвөл дахин ажиллуулна.

Өнгө нь app/globals.css-ийн :root утгуудтай тохирно. Тэнд өөрчилвөл
ЭНД ч өөрчилнө.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
PAPER, INK, TEAL, MUTED = "#f4f8f8", "#0d191f", "#006c79", "#546871"

# Lato — хүмүүнлэг sans, кирилл бүрэн. Source Sans 3-ын хамгийн ойрын орлуулагч.
FONT_DIR = "/usr/share/fonts/truetype/lato"
OUT = Path(__file__).resolve().parent.parent / "app" / "opengraph-image.png"

HEADLINE = [("Жин оруулна.", INK), ("Тун гарна.", INK), ("Эх сурвалж нь хамт.", TEAL)]
TAGLINE = "Монгол эмчийн эмнэлзүйн тооцоолуур"
FOOTER = "50 эм  ·  Эх сурвалж заасан  ·  Бүртгэлгүй, үнэгүй"


def font(weight: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(f"{FONT_DIR}/Lato-{weight}.ttf", size)


def draw_wordmark(draw: ImageDraw.ImageDraw, x: int, y: int) -> None:
    """dosage нь бэхэн өнгөөр, .mn нь номингоор."""
    f = font("Bold", 34)
    draw.text((x, y), "dosage", font=f, fill=INK)
    draw.text((x + draw.textlength("dosage", font=f), y), ".mn", font=f, fill=TEAL)


def draw_headline(draw: ImageDraw.ImageDraw, x: int, y: int) -> int:
    """Гурван мөр + зүүн ирмэгийн зураас — бүтээгдэхүүний тунгийн зурвасын дүрс."""
    size, gap = 76, 96
    draw.rectangle([x - 28, y + 8, x - 22, y + gap * len(HEADLINE) - 4], fill=TEAL)
    for index, (text, colour) in enumerate(HEADLINE):
        draw.text((x, y + index * gap), text, font=font("Bold", size), fill=colour)
    return y + gap * len(HEADLINE)


def main() -> None:
    image = Image.new("RGB", (W, H), PAPER)
    draw = ImageDraw.Draw(image)
    left = 96

    draw_wordmark(draw, left, 74)
    bottom = draw_headline(draw, left, 170)
    draw.text((left, bottom + 18), TAGLINE, font=font("Regular", 32), fill=MUTED)
    draw.text((left, H - 82), FOOTER, font=font("Regular", 26), fill=MUTED)

    image.save(OUT, "PNG", optimize=True)
    print(f"✓ {OUT}  ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
