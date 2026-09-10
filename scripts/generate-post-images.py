#!/usr/bin/env python3
"""
Regenerate every LinkedIn image as a 1080x1080 square.

LinkedIn's mobile feed crops wide images heavily. A 1200x628 image loses
roughly 40% off each side. Square survives both mobile and desktop.

Reads data/linkedin-posts.txt and builds one image per dated post, using the
opening lines as the headline. Run it again whenever posts are added.
"""

import os, re, textwrap
from PIL import Image, ImageDraw, ImageFont

W = H = 1080
MARGIN = 72                 # generous safe area, nothing important near an edge
BG = (15, 15, 14)
AMBER = (193, 125, 46)
WHITE = (255, 255, 255)
GREY = (128, 128, 124)
DARK3 = (37, 37, 35)

POSTS = 'data/linkedin-posts.txt'
OUTDIR = 'data/post-images'
PHOTO = 'data/mihir.jpg'

FONT_CANDIDATES = [
    '/System/Library/Fonts/Helvetica.ttc',
    '/System/Library/Fonts/Supplemental/Arial.ttf',
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
]

def font(size):
    for fp in FONT_CANDIDATES:
        if os.path.exists(fp):
            try:
                return ImageFont.truetype(fp, size)
            except Exception:
                continue
    return ImageFont.load_default()


def parse_posts(path):
    """Return {date: [lines]} for every dated block."""
    posts, date, lines = {}, None, []
    with open(path) as f:
        for raw in f:
            s = raw.strip()
            if re.match(r'^\d{4}-\d{2}-\d{2}$', s):
                if date:
                    posts[date] = lines
                date, lines = s, []
            elif date is not None:
                lines.append(s)
    if date:
        posts[date] = lines
    return posts


def headline_from(lines):
    """
    The opening of a post is written to stop the scroll, so it is also the
    right thing to put on the image. Take the first one or two short lines.
    """
    body = [l for l in lines if l]
    if not body:
        return []
    first = body[0]
    if len(first) <= 60 and len(body) > 1 and len(body[1]) <= 60:
        return [first, body[1]]
    return [first]


def wrap_to_width(draw, text, f, maxw):
    words, out, cur = text.split(), [], ''
    for w in words:
        trial = (cur + ' ' + w).strip()
        if draw.textlength(trial, font=f) <= maxw:
            cur = trial
        else:
            if cur:
                out.append(cur)
            cur = w
    if cur:
        out.append(cur)
    return out


def fit_headline(draw, paras, maxw, maxh):
    """Shrink until the wrapped headline fits the box."""
    for size in range(84, 35, -3):
        f = font(size)
        lines = []
        for p in paras:
            lines.extend(wrap_to_width(draw, p, f, maxw))
        lh = int(size * 1.28)
        if len(lines) * lh <= maxh and len(lines) <= 6:
            return f, lines, lh
    f = font(34)
    lines = []
    for p in paras:
        lines.extend(wrap_to_width(draw, p, f, maxw))
    return f, lines[:6], int(34 * 1.28)


def make(date, lines, outpath):
    img = Image.new('RGB', (W, H), BG)
    d = ImageDraw.Draw(img)

    # Full-width rules top and bottom. They survive any crop that does happen.
    d.rectangle([0, 0, W, 10], fill=AMBER)
    d.rectangle([0, H - 10, W, H], fill=AMBER)

    f_small = font(23)
    f_name = font(25)

    # Photo bottom left, well inside the safe area
    photo_size = 104
    px, py = MARGIN, H - MARGIN - photo_size - 8
    try:
        p = Image.open(PHOTO).convert('RGB').resize((photo_size, photo_size))
        mask = Image.new('L', (photo_size, photo_size), 0)
        ImageDraw.Draw(mask).ellipse([0, 0, photo_size, photo_size], fill=255)
        img.paste(p, (px, py), mask)
        d.ellipse([px - 3, py - 3, px + photo_size + 3, py + photo_size + 3],
                  outline=AMBER, width=3)
        d.text((px + photo_size + 22, py + 28), 'Mihir Hindocha', fill=WHITE, font=f_name)
        d.text((px + photo_size + 22, py + 60), 'Founder, Lexalytic', fill=GREY, font=f_small)
    except Exception as e:
        print('  photo:', e)

    # Headline occupies the upper area, above the photo
    box_w = W - (MARGIN * 2)
    box_h = py - MARGIN - 70
    paras = headline_from(lines)
    if not paras:
        return False

    f_head, wrapped, lh = fit_headline(d, paras, box_w, box_h)

    # Centre the headline in the space above the photo
    total = len(wrapped) * lh
    top = MARGIN + 30
    y = top + max(0, (box_h - total) // 2)

    for ln in wrapped:
        d.text((MARGIN, y), ln, fill=WHITE, font=f_head)
        y += lh

    # Amber rule under the headline
    d.rectangle([MARGIN, y + 14, MARGIN + 120, y + 20], fill=AMBER)

    # Footer
    d.text((MARGIN, H - MARGIN + 4), 'lexalytic.com', fill=GREY, font=f_small)

    img.save(outpath, quality=95)
    return True


def main():
    if not os.path.exists(POSTS):
        print('Cannot find', POSTS)
        return
    os.makedirs(OUTDIR, exist_ok=True)

    posts = parse_posts(POSTS)
    made = skipped = 0

    for date, lines in sorted(posts.items()):
        y, m, dd = date.split('-')
        name = f'post-{["","jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"][int(m)]}{dd}.png'
        out = os.path.join(OUTDIR, name)
        if make(date, lines, out):
            made += 1
            print(f'  {date} -> {name}')
        else:
            skipped += 1
            print(f'  {date} skipped, no usable text')

    print(f'\n{made} images written to {OUTDIR}, {skipped} skipped')
    print('Size: 1080x1080, safe for LinkedIn mobile')


if __name__ == '__main__':
    main()
