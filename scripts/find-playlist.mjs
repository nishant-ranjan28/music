/* ============================================================
   find-playlist.mjs — search for a public playlist for a station,
   sanity-check that it holds individual songs rather than hour-long
   jukebox compilations, and write its id into themes.mjs.

   The jukebox check matters: two Tips Official playlists picked by
   item count alone turned out to contain the same compilation videos,
   so two stations played identical audio and every entry tripped the
   player's compilation filter.

   Usage:
     YT_API_KEY=xxx node scripts/find-playlist.mjs <slug> "<search terms>"
   ============================================================ */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const KEY = process.env.YT_API_KEY;
const [slug, query] = process.argv.slice(2);

if (!KEY || !slug || !query) {
  console.error('usage: YT_API_KEY=xxx node scripts/find-playlist.mjs <slug> "<terms>"');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(path, params, tries = 4) {
  const u = new URL(`https://www.googleapis.com/youtube/v3/${path}`);
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
  u.searchParams.set("key", KEY);
  for (let i = 0; i < tries; i++) {
    const r = await fetch(u);
    if (r.ok) return r.json();
    const body = await r.text();
    const reason = body.match(/"reason":\s*"([^"]+)"/)?.[1] || r.statusText;
    if (reason !== "rateLimitExceeded" || i === tries - 1) {
      throw new Error(`${r.status} ${reason}`);
    }
    await sleep(8000 * (i + 1));
  }
}

const JUNK = /jukebox|non ?stop|nonstop|mashup|medley|all songs|full album|top \d+/i;

const found = await api("search", {
  part: "snippet",
  type: "playlist",
  maxResults: 10,
  q: query
});
await sleep(1500);

const details = await api("playlists", {
  part: "contentDetails,snippet",
  id: found.items.map((i) => i.id.playlistId).join(",")
});

// Biggest first — depth is the point, but only among lists that pass the check.
const ranked = details.items.sort(
  (a, b) => b.contentDetails.itemCount - a.contentDetails.itemCount
);

let chosen = null;
for (const pl of ranked) {
  if (pl.contentDetails.itemCount < 15) continue;
  await sleep(1200);
  let items;
  try {
    items = await api("playlistItems", {
      part: "snippet",
      maxResults: 8,
      playlistId: pl.id
    });
  } catch {
    continue; // private or deleted
  }
  const titles = (items.items || []).map((i) => i.snippet.title);
  if (!titles.length) continue;
  const junk = titles.filter((t) => JUNK.test(t)).length;
  const ratio = junk / titles.length;
  console.log(
    `  ${String(pl.contentDetails.itemCount).padStart(4)} | ${pl.snippet.channelTitle.slice(0, 22).padEnd(22)} | ${Math.round(ratio * 100)}% compilations | ${pl.snippet.title.slice(0, 40)}`
  );
  if (ratio <= 0.25 && !chosen) {
    chosen = { id: pl.id, title: pl.snippet.title, channel: pl.snippet.channelTitle, n: pl.contentDetails.itemCount };
  }
}

if (!chosen) {
  console.error("no playlist passed the compilation check — leaving themes.mjs alone");
  process.exit(2);
}

console.log(`\nchosen: ${chosen.channel} — ${chosen.title} (${chosen.n} tracks)\n  ${chosen.id}`);

const file = join(ROOT, "themes", "themes.mjs");
let src = readFileSync(file, "utf8");
const anchor = `    slug: "${slug}",`;
if (!src.includes(anchor)) {
  console.error(`slug "${slug}" not found in themes.mjs`);
  process.exit(3);
}

const note = `    // ${chosen.channel} — ${chosen.title.replace(/\s+/g, " ").slice(0, 60)}, ~${chosen.n} tracks`;
const existing = new RegExp(`(${anchor}\\n)(?:    //[^\\n]*\\n)?    ytPlaylist: "[^"]*",\\n`);

src = existing.test(src)
  ? src.replace(existing, `$1${note}\n    ytPlaylist: "${chosen.id}",\n`)
  : src.replace(anchor, `${anchor}\n${note}\n    ytPlaylist: "${chosen.id}",`);

writeFileSync(file, src);
console.log(`wrote ytPlaylist for ${slug}`);
