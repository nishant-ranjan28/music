#!/usr/bin/env bash
# Wait for the YouTube Data API quota to reset, then fill unresolved ids for
# the given stations (all of them if none are named).
#
# The quota resets at midnight US Pacific, so this waits for the Pacific date
# to roll over rather than polling the API. Polling cost 100 units per probe —
# the waiter was spending the very quota it was waiting for, roughly 3,600
# units over a three hour wait.
#
#   ./scripts/wait-and-fill.sh sonu-nigam kumar-sanu
#   ./scripts/wait-and-fill.sh                  # every station

set -uo pipefail
cd "$(dirname "$0")/.."

SLUGS="$*"

if [ ! -f .env.local ]; then
  echo "missing .env.local with YT_API_KEY=..." >&2
  exit 1
fi
set -a
# shellcheck disable=SC1091
. ./.env.local
set +a

pacific_day() { TZ=America/Los_Angeles date +%Y-%j; }

START_DAY="$(pacific_day)"
echo "waiting for the Pacific date to roll over (now $(TZ=America/Los_Angeles date '+%a %H:%M %Z'))"

# 26h ceiling: one rollover always falls inside that, so a hang means
# something else is wrong and the run should stop rather than sit forever.
DEADLINE=$(( $(date +%s) + 26 * 3600 ))

while [ "$(pacific_day)" = "$START_DAY" ]; do
  if [ "$(date +%s)" -ge "$DEADLINE" ]; then
    echo "no rollover within 26h — giving up" >&2
    exit 1
  fi
  sleep 600
done

echo "quota window open at $(TZ=America/Los_Angeles date '+%a %H:%M %Z')"
sleep 120 # let the reset settle before the first search

echo
echo "== filling unresolved ids =="
node scripts/fill-ids.mjs $SLUGS

echo
echo "== auditing =="
node scripts/verify-ids.mjs --fix $SLUGS

echo
echo "== rebuilding =="
node build.mjs

echo
echo "Done. Review and commit if the ids changed."
