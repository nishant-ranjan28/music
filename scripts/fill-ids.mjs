/* ============================================================
   fill-ids.mjs — resolve each track's YouTube video id via the
   official YouTube Data API v3 and write it back into
   sites/<slug>/playlist.js.

   Usage:
     YT_API_KEY=xxxx node scripts/fill-ids.mjs            # all stations
     YT_API_KEY=xxxx node scripts/fill-ids.mjs ghazal lofi

   Quota: 100 units per search call, 10,000 units/day default —
   so roughly 100 tracks per day on a fresh key. Ids already
   filled in are skipped, and `node build.mjs` preserves them.
   ============================================================ */

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITES = join(ROOT, "sites");
const KEY = process.env.YT_API_KEY;

if (!KEY) {
  console.error(
    "YT_API_KEY is not set.\n" +
      "Get one at https://console.cloud.google.com → enable 'YouTube Data API v3' → create an API key."
  );
  process.exit(1);
}

const only = process.argv.slice(2);
const slugs = readdirSync(SITES).filter((s) => !only.length || only.includes(s));

async function search(query) {
  const url =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video" +
    "&videoEmbeddable=true&maxResults=1&q=" +
    encodeURIComponent(query) +
    "&key=" +
    KEY;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} — ${await res.text()}`);
  }
  const data = await res.json();
  return data.items?.[0]?.id?.videoId ?? null;
}

for (const slug of slugs) {
  const file = join(SITES, slug, "playlist.js");
  if (!existsSync(file)) continue;

  const src = readFileSync(file, "utf8");
  const m = src.match(/window\.PLAYLIST = ([\s\S]*?);\n/);
  if (!m) {
    console.warn(`${slug}: could not parse playlist.js, skipping`);
    continue;
  }

  const tracks = JSON.parse(m[1]);
  let filled = 0;

  for (const track of tracks) {
    if (track.yt) continue;
    try {
      track.yt = await search(track.q);
      if (track.yt) filled++;
      console.log(`  ${slug}/${track.title} → ${track.yt ?? "not found"}`);
    } catch (err) {
      console.error(`  ${slug}/${track.title} → ${err.message}`);
      break; // almost always quota — stop hammering the API
    }
  }

  writeFileSync(
    file,
    src.replace(m[1], JSON.stringify(tracks, null, 2))
  );
  console.log(`${slug}: +${filled} ids\n`);
}
