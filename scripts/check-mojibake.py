#!/usr/bin/env python3
"""
Block commits that contain U+FFFD (replacement character, \xef\xbf\xbd) in
staged text files. Catches mojibake from editors that lose UTF-8 encoding
and replace umlauts / em-dashes with the black-diamond glyph.

Usage:
  python scripts/check-mojibake.py             # scan staged files (pre-commit hook)
  python scripts/check-mojibake.py --all       # scan entire repo
  python scripts/check-mojibake.py path1 ...   # scan specific files/dirs

Install as pre-commit hook (from repo root):
  ln -sf ../../scripts/check-mojibake.py .git/hooks/pre-commit  # POSIX
  cp scripts/check-mojibake.py .git/hooks/pre-commit            # Windows fallback
"""
import os, sys, subprocess

TEXT_EXTS = {'.html','.htm','.css','.js','.mjs','.json','.md','.txt','.xml','.svg','.yaml','.yml','.toml'}
SKIP_DIRS = {'.git', 'node_modules', 'tmp', 'output', '.netlify', 'dist', 'build'}
MARK = b'\xef\xbf\xbd'

def staged_files():
    try:
        out = subprocess.check_output(
            ['git', 'diff', '--cached', '--name-only', '--diff-filter=ACMR'],
            text=True
        )
    except subprocess.CalledProcessError:
        return []
    return [p for p in out.splitlines() if p.strip()]

def walk(paths):
    for base in paths:
        if os.path.isfile(base):
            yield base
        elif os.path.isdir(base):
            for d, dirs, files in os.walk(base):
                dirs[:] = [x for x in dirs if x not in SKIP_DIRS]
                for f in files:
                    yield os.path.join(d, f)

def scan(paths):
    bad = []
    for p in paths:
        if not os.path.isfile(p):
            continue
        ext = os.path.splitext(p)[1].lower()
        if ext not in TEXT_EXTS:
            continue
        try:
            data = open(p, 'rb').read()
        except OSError:
            continue
        c = data.count(MARK)
        if c:
            bad.append((p, c))
    return bad

def main():
    args = sys.argv[1:]
    if args and args[0] == '--all':
        paths = list(walk(['.']))
    elif args:
        paths = list(walk(args))
    else:
        paths = staged_files()
    bad = scan(paths)
    if bad:
        sys.stderr.write('MOJIBAKE GATE FAIL\n')
        sys.stderr.write('Found U+FFFD replacement chars (broken umlauts/em-dashes):\n')
        for p, c in sorted(bad, key=lambda x: -x[1]):
            sys.stderr.write(f'  {c:4d}  {p}\n')
        sys.stderr.write(
            '\nFix: re-encode as UTF-8 in your editor or run:\n'
            "  python scripts/check-mojibake.py --all  # to see all instances\n"
        )
        return 1
    return 0

if __name__ == '__main__':
    sys.exit(main())
