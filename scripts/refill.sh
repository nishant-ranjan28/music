#!/usr/bin/env bash
# Fill every unresolved track, drop anything that isn't the real song,
# and rebuild. Safe to re-run: resolved ids are skipped and preserved.
#
# The YouTube Data API quota resets at midnight US Pacific (12:30 PM IST).
# search.list costs 100 units of the 10,000/day allowance, so this handles
# roughly 100 tracks per run and stops cleanly on quotaExceeded.
#
#   ./scripts/refill.sh          fill, verify, build
#   ./scripts/refill.sh --push   also commit and push the result

set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -f .env.local ]; then
  echo "missing .env.local with YT_API_KEY=..." >&2
  exit 1
fi

set -a
# shellcheck disable=SC1091
. ./.env.local
set +a

echo "== filling unresolved tracks =="
node scripts/fill-ids.mjs

echo
echo "== auditing every resolved id =="
node scripts/verify-ids.mjs --fix

echo
echo "== rebuilding =="
node build.mjs

if [ "${1:-}" = "--push" ]; then
  if [ -n "$(git status --porcelain)" ]; then
    git add -A
    git commit -q -m "Fill and verify remaining YouTube ids"
    git push
    echo "pushed"
  else
    echo "nothing changed, not pushing"
  fi
fi
