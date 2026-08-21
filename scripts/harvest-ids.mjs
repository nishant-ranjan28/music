/* ============================================================
   harvest-ids.mjs — resolve video ids cheaply.

   fill-ids.mjs spends one search.list (100 quota units) per track,
   so 186 tracks costs 18,600 units against a 10,000/day allowance.

   This does the same job for ~105 units per station: one playlist
   search, then playlistItems.list (1 unit per 50 items) to pull the
   videos out of the top playlists. Every harvested title goes into a
   local index, and the curated tracks in themes.mjs are matched
   against it — so the playlist supplies ids, not the tracklist.

   Usage:
      YT_API_KEY=xxx node scripts/harvest-ids.mjs            # all stations
      YT_API_KEY=xxx node scripts/harvest-ids.mjs arijit-singh

   Anything left unmatched can be topped up with fill-ids.mjs, which
   is exact but expensive. Run this first, that second.
   ============================================================ */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITES = join(ROOT, "sites");
const KEY = process.env.YT_API_KEY;

if (!KEY) {
  console.error("YT_API_KEY is not set.");
  process.exit(1);
}

/* Search terms aimed at big, well-maintained playlists for each station.
   Tune these — a better playlist means more of the curated list resolves. */
const QUERIES = {
  "udit-narayan": "udit narayan superhit songs collection playlist",
  "sonu-nigam": "sonu nigam superhit songs collection playlist",
  "arijit-singh": "arijit singh songs collection playlist",
  "kumar-sanu": "kumar sanu 90s hits collection playlist"
};

const PLAYLISTS_PER_STATION = 5;

/* ---------- title normalisation ------------------------------------- */

const NOISE =
  /\b(full|video|song|songs|audio|lyrical|lyrics|official|hd|4k|remastered|jukebox|movie|film|with|feat|ft|from|soundtrack|version|original|cover|live|new|best|hits|super|hit)\b/g;

function norm(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\([^)]*\)|\[[^\]]*\]/g, " ") // drop bracketed asides
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(NOISE, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* A curated title matches a harvested one when either contains the other.
   Short titles need the stricter test — "aawargi" would otherwise match
   half a playlist. */
function matches(curated, candidate) {
  if (!curated || !candidate) return false;
  if (curated === candidate) return true;
  if (curated.length < 8) return false;
  return candidate.includes(curated) || curated.includes(candidate);
}

/* ---------- api ------------------------------------------------------ */

async function api(path, params) {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  url.searchParams.set("key", KEY);

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    const reason = body.match(/"reason":\s*"([^"]+)"/)?.[1] || res.statusText;
    throw new Error(`${res.status} ${reason}`);
  }
  return res.json();
}

/* ---------- run ------------------------------------------------------ */

const only = process.argv.slice(2);
const slugs = Object.keys(QUERIES).filter((s) => !only.length || only.includes(s));
let spent = 0;

for (const slug of slugs) {
  const file = join(SITES, slug, "playlist.js");
  if (!existsSync(file)) continue;

  const src = readFileSync(file, "utf8");
  const m = src.match(/window\.PLAYLIST = ([\s\S]*?);\n/);
  if (!m) {
    console.warn(`${slug}: unparseable playlist.js, skipping`);
    continue;
  }

  const tracks = JSON.parse(m[1]);
  const missing = tracks.filter((t) => !t.yt);
  if (!missing.length) {
    console.log(`${slug}: already complete`);
    continue;
  }

  // 1. find candidate playlists — the only expensive call, 100 units
  let found;
  try {
    found = await api("search", {
      part: "snippet",
      type: "playlist",
      maxResults: PLAYLISTS_PER_STATION,
      q: QUERIES[slug]
    });
    spent += 100;
  } catch (err) {
    console.error(`${slug}: playlist search failed — ${err.message}`);
    break;
  }

  // 2. harvest their items — 1 unit per page of 50
  const index = [];
  for (const pl of found.items || []) {
    try {
      const items = await api("playlistItems", {
        part: "snippet",
        maxResults: 50,
        playlistId: pl.id.playlistId
      });
      spent += 1;
      for (const it of items.items || []) {
        const id = it.snippet?.resourceId?.videoId;
        if (id) index.push({ id, title: norm(it.snippet.title) });
      }
    } catch {
      // private/deleted playlists are common in search results — skip
    }
  }

  // 3. match the curated titles against the harvested index, locally + free
  let filled = 0;
  for (const track of missing) {
    const want = norm(track.title);
    const hit = index.find((c) => matches(want, c.title));
    if (hit) {
      track.yt = hit.id;
      filled++;
    }
  }

  writeFileSync(file, src.replace(m[1], JSON.stringify(tracks, null, 2)));
  console.log(
    `${slug}: ${filled}/${missing.length} matched from ${index.length} harvested videos`
  );
}

console.log(`\n~${spent} quota units spent (fill-ids would cost 100 per track)`);
