#!/usr/bin/env bash
# Poll until the YouTube Data API quota window reopens, then find a playlist
# for the bhajan station and fill every unresolved id.
#
# The quota resets at 00:00 US Pacific. Searching before then returns
# rateLimitExceeded, so this waits rather than burning attempts.
#
#   ./scripts/wait-and-refill.sh [max_minutes]      default 90

set -uo pipefail
cd "$(dirname "$0")/.."

MAX_MIN="${1:-90}"
DEADLINE=$(( $(date +%s) + MAX_MIN * 60 ))

if [ ! -f .env.local ]; then
  echo "missing .env.local" >&2
  exit 1
fi
set -a
# shellcheck disable=SC1091
. ./.env.local
set +a

probe() {
  curl -s -o /dev/null -w '%{http_code}' \
    "https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&maxResults=1&q=test&key=${YT_API_KEY}"
}

echo "waiting for quota window (up to ${MAX_MIN} min)..."
while [ "$(date +%s)" -lt "$DEADLINE" ]; do
  code=$(probe)
  if [ "$code" = "200" ]; then
    echo "quota open at $(date '+%H:%M %Z')"
    break
  fi
  echo "  $(date '+%H:%M') — HTTP $code, sleeping 5 min"
  sleep 300
done

if [ "$(probe)" != "200" ]; then
  echo "quota still closed after ${MAX_MIN} min — giving up" >&2
  exit 1
fi

echo
echo "== finding a playlist for the bhajan station =="
node scripts/find-playlist.mjs bhajan "garbh sanskar mantra bhajan pregnancy"

echo
echo "== filling unresolved ids =="
node scripts/fill-ids.mjs

echo
echo "== auditing =="
node scripts/verify-ids.mjs --fix

echo
echo "== rebuilding =="
node build.mjs
