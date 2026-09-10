#!/usr/bin/env python3
"""
Add Article JSON-LD and correct reading times across every blog post.

Run from the repo root:
    python3 add-article-schema.py --dry-run
    python3 add-article-schema.py
"""

import os, re, sys, json, glob

DRY = '--dry-run' in sys.argv

AUTHOR = {
    '@type': 'Person',
    'name': 'Mihir Hindocha',
    'url': 'https://www.lexalytic.com/about',
    'jobTitle': 'Founder',
    'worksFor': {'@type': 'Organization', 'name': 'Lexalytic', 'url': 'https://www.lexalytic.com'},
    'knowsAbout': [
        'Business intelligence', 'Data automation', 'Custom software development',
        'Power BI', 'Web development',
    ],
    'alumniOf': {'@type': 'CollegeOrUniversity', 'name': 'BSc Financial Computing'},
}

PUBLISHER = {
    '@type': 'Organization',
    'name': 'Lexalytic',
    'url': 'https://www.lexalytic.com',
    'logo': {'@type': 'ImageObject', 'url': 'https://www.lexalytic.com/linkedin-banner.png'},
}

MONTHS = {m: i for i, m in enumerate(
    ['', 'January', 'February', 'March', 'April', 'May', 'June',
     'July', 'August', 'September', 'October', 'November', 'December'])}

WPM = 225


def grab(pattern, s, group=1):
    m = re.search(pattern, s)
    return m.group(group) if m else None


def prose_words(s):
    """Rough word count of the visible prose, ignoring JSX and metadata."""
    body = s
    # drop the metadata export
    body = re.sub(r'export const metadata[\s\S]*?^\}', '', body, flags=re.M)
    # drop any existing schema objects
    body = re.sub(r'const \w*[Ss]chema\w* = \{[\s\S]*?^\}', '', body, flags=re.M)
    # keep only string literals that look like prose
    strings = re.findall(r">([^<>{}]{40,})<", body)
    strings += re.findall(r"'([^']{60,})'", body)
    text = ' '.join(strings)
    return len(text.split())


def iso_date(human, slug_hint=None):
    """September 2026 -> 2026-09-15, using mid month since we only have month precision."""
    if not human:
        return None
    m = re.match(r'([A-Z][a-z]+)\s+(\d{4})', human.strip())
    if not m:
        return None
    month = MONTHS.get(m.group(1))
    if not month:
        return None
    return f'{m.group(2)}-{month:02d}-15'


def process(path):
    s = open(path, encoding='utf-8').read()
    slug = os.path.basename(os.path.dirname(path))
    changed = []

    compact = re.sub(r'\s+', '', s)
    has_article = '"@type":"Article"' in compact or "'@type':'Article'" in compact

    title = grab(r"title:\s*'([^']+)'", s) or grab(r'title:\s*"([^"]+)"', s)
    desc = grab(r"description:\s*'([^']+)'", s) or grab(r'description:\s*"([^"]+)"', s)
    canonical = grab(r"canonical:\s*'([^']+)'", s)
    date_human = grab(r">\s*([A-Z][a-z]+ 20\d\d)\s*·", s)

    if not title or not canonical:
        return None, f'could not read metadata'

    # strip the " | Lexalytic" suffix for the headline
    headline = re.sub(r'\s*\|\s*Lexalytic\s*$', '', title)

    # ---- reading time ----
    words = prose_words(s)
    mins = max(2, round(words / WPM))
    current = grab(r'·\s*(\d+)\s*min read', s)
    if current and int(current) != mins:
        s = re.sub(r'·\s*\d+\s*min read', f'· {mins} min read', s)
        changed.append(f'read time {current} -> {mins} ({words} words)')

    # ---- article schema ----
    if not has_article:
        published = iso_date(date_human) or '2026-01-01'
        schema = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            'headline': headline,
            'description': desc or '',
            'datePublished': published,
            'dateModified': published,
            'author': AUTHOR,
            'publisher': PUBLISHER,
            'mainEntityOfPage': {'@type': 'WebPage', '@id': canonical},
            'inLanguage': 'en-GB',
            'wordCount': words,
            'articleSection': grab(r"borderRadius: '100px' \}\}>([^<]+)<", s) or 'Business',
        }

        block = 'const articleSchema = ' + json.dumps(schema, indent=2, ensure_ascii=False) + '\n\n'

        # insert the const before the component
        m = re.search(r'export default function \w+\(\) \{', s)
        if not m:
            return None, 'could not find component'
        s = s[:m.start()] + block + s[m.start():]

        tag = ('\n      <script type="application/ld+json" '
               'dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />')

        # Two shapes exist in this repo: a fragment wrapper, or a bare div.
        m2 = re.search(r'return \(\s*\n\s*<>', s)
        if m2:
            s = s[:m2.end()] + tag + s[m2.end():]
            changed.append('article schema added')
        else:
            m3 = re.search(r'return \(\s*\n\s*<div[^>]*>', s)
            if m3:
                s = s[:m3.end()] + tag + s[m3.end():]
                changed.append('article schema added')
            else:
                return None, 'could not find the return opening'

    if not changed:
        return None, None

    if not DRY:
        open(path, 'w', encoding='utf-8').write(s)
    return changed, None


def main():
    posts = sorted(glob.glob('app/blog/*/page.tsx'))
    if not posts:
        print('No posts found. Run this from the repo root.')
        sys.exit(1)

    done = skipped = failed = 0
    problems = []

    for p in posts:
        changed, err = process(p)
        slug = os.path.basename(os.path.dirname(p))
        if err:
            failed += 1
            problems.append((slug, err))
        elif changed:
            done += 1
            print(f'  {slug}: {", ".join(changed)}')
        else:
            skipped += 1

    print()
    print(f'{done} updated, {skipped} already fine, {failed} could not be read')
    if problems:
        print('\nNeed a manual look:')
        for slug, err in problems:
            print(f'  {slug}: {err}')
    if DRY:
        print('\nDry run, nothing written. Run without --dry-run to apply.')


if __name__ == '__main__':
    main()
