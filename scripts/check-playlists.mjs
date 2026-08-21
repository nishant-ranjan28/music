/* ============================================================
   check-playlists.mjs — confirm each station's YouTube playlist
   still exists and still has videos in it.

   Playlists belong to other people. They get deleted, emptied or
   made private without warning, and the player only notices at
   runtime. This is a cheap standing check: playlists.list costs
   1 unit regardless of how many ids are passed.

   Usage:
     YT_API_KEY=xxx node scripts/check-playlists.mjs           # all
      YT_API_KEY=xxx node scripts/check-playlists.mjs kumar-sanu  # one

   Exit code 1 if any station's playlist is missing or empty, so a
   scheduled run fails loudly instead of silently.

   NOTE: this cannot catch every failure. A playlist can be public,
   populated and embeddable by every API measure and still return
   zero items to the embedded player — that is what happened to the
   first garbh sanskar list. Only loading it in a real embed proves
   it works; the player has a runtime fallback for the rest.
   ============================================================ */

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITES = join(ROOT, "sites");
const KEY = process.env.YT_API_KEY;

if (!KEY) {
  console.error("YT_API_KEY is not set.");
  process.exit(1);
}

const only = process.argv.slice(2);
const stations = [];

for (const slug of readdirSync(SITES)) {
  if (only.length && !only.includes(slug)) continue;
  const file = join(SITES, slug, "playlist.js");
  if (!existsSync(file)) continue;

  const src = readFileSync(file, "utf8");
  const id = src.match(/"ytPlaylist":\s*"([^"]+)"/)?.[1];
  const ids = (src.match(/"yt":\s*"[\w-]{11}"/g) || []).length;
  stations.push({ slug, id, ids });
}

const withPlaylists = stations.filter((s) => s.id);

let found = {};
if (withPlaylists.length) {
  const u = new URL("https://www.googleapis.com/youtube/v3/playlists");
  u.searchParams.set("part", "contentDetails,snippet,status");
  u.searchParams.set("id", withPlaylists.map((s) => s.id).join(","));
  u.searchParams.set("key", KEY);

  const res = await fetch(u);
  if (!res.ok) {
    console.error(`playlists.list failed: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  for (const p of (await res.json()).items || []) found[p.id] = p;
}

let bad = 0;

for (const s of stations) {
  if (!s.id) {
    console.log(`${s.slug.padEnd(15)} static — ${s.ids} ids`);
    continue;
  }

  const p = found[s.id];
  if (!p) {
    console.log(`${s.slug.padEnd(15)} GONE — playlist ${s.id} no longer resolves`);
    bad++;
    continue;
  }

  const n = p.contentDetails.itemCount;
  const privacy = p.status.privacyStatus;
  const flag = n === 0 || privacy !== "public";

  console.log(
    `${s.slug.padEnd(15)} ${flag ? "PROBLEM" : "ok".padEnd(7)} ` +
      `${String(n).padStart(4)} items, ${privacy}, ${s.ids} fallback ids — ` +
      p.snippet.title.slice(0, 34)
  );
  if (flag) bad++;
}

console.log(`\n${stations.length} checked, ${bad} with problems`);
process.exit(bad ? 1 : 0);
