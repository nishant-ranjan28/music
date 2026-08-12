/* ============================================================
   verify-ids.mjs — check that each resolved id is actually the
   curated song, and not a compilation or a different artist.

   videos.list costs 1 unit per 50 ids, so auditing the whole
   catalogue is ~4 units. Cheap enough to run after every fill.

   A track is rejected when:
     - the video title looks like a jukebox / mashup / full album
     - no word of the curated artist appears in the video title
       or the channel name
     - the video is very long (compilations, typically > 15 min)

   Usage:
     YT_API_KEY=xxx node scripts/verify-ids.mjs           # report only
     YT_API_KEY=xxx node scripts/verify-ids.mjs --fix     # null out the bad ones
   ============================================================ */

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITES = join(ROOT, "sites");
const KEY = process.env.YT_API_KEY;
const FIX = process.argv.includes("--fix");
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));

if (!KEY) {
  console.error("YT_API_KEY is not set.");
  process.exit(1);
}

const COMPILATION =
  /\b(jukebox|non ?stop|nonstop|mashup|medley|all songs|full album|audio songs|best of|superhit songs|hit songs|top \d+|collection|greatest hits|mix)\b/i;

const STOPWORDS = new Set(["the", "and", "kumar", "singh", "khan", "ali", "das", "lal"]);

/* Official label and auto-generated "- Topic" channels almost never name the
   playback singer in the title — an Ishtar or YRF upload of a 1994 song lists
   the actors instead. Treat those as trustworthy so the artist check doesn't
   reject correct videos; apply it only to unknown channels, where a title
   naming the wrong artist is a real signal. */
const TRUSTED_CHANNEL =
  /t-series|yrf|yash raj|saregama|ishtar|universal music|sony music|tips|venus|zee music|shemaroo|eros|speed records|oriental star|records|music india|classics|- topic|official/i;

function norm(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** ISO 8601 duration -> seconds */
function seconds(iso) {
  const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso || "") || [];
  return (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0);
}

async function videosList(ids) {
  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "snippet,contentDetails");
  url.searchParams.set("id", ids.join(","));
  url.searchParams.set("key", KEY);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return (await res.json()).items || [];
}

const slugs = readdirSync(SITES).filter((s) => !only.length || only.includes(s));
let checked = 0;
let bad = 0;

for (const slug of slugs) {
  const file = join(SITES, slug, "playlist.js");
  if (!existsSync(file)) continue;

  const src = readFileSync(file, "utf8");
  const m = src.match(/window\.PLAYLIST = ([\s\S]*?);\n/);
  if (!m) continue;

  const tracks = JSON.parse(m[1]);
  const withIds = tracks.filter((t) => t.yt);
  if (!withIds.length) continue;

  const meta = {};
  for (let i = 0; i < withIds.length; i += 50) {
    for (const v of await videosList(withIds.slice(i, i + 50).map((t) => t.yt))) {
      meta[v.id] = {
        title: v.snippet.title,
        channel: v.snippet.channelTitle,
        secs: seconds(v.contentDetails?.duration)
      };
    }
  }

  const problems = [];
  for (const t of withIds) {
    checked++;
    const v = meta[t.yt];
    if (!v) {
      problems.push([t, "video unavailable"]);
      continue;
    }
    const haystack = norm(v.title + " " + v.channel);

    if (COMPILATION.test(v.title)) {
      problems.push([t, `compilation: "${v.title.slice(0, 44)}"`]);
      continue;
    }
    if (v.secs > 900) {
      problems.push([t, `${Math.round(v.secs / 60)} min — likely a compilation`]);
      continue;
    }
    if (TRUSTED_CHANNEL.test(v.channel)) continue;

    const words = norm(t.artist)
      .split(" ")
      .filter((w) => w.length > 3 && !STOPWORDS.has(w));
    if (words.length && !words.some((w) => haystack.includes(w))) {
      problems.push([t, `artist mismatch: "${v.title.slice(0, 40)}" / ${v.channel}`]);
    }
  }

  if (problems.length) {
    console.log(`\n${slug}  (${problems.length}/${withIds.length} rejected)`);
    for (const [t, why] of problems) console.log(`  ✗ ${t.title.padEnd(30)} ${why}`);
    bad += problems.length;
    if (FIX) {
      for (const [t] of problems) t.yt = null;
      writeFileSync(file, src.replace(m[1], JSON.stringify(tracks, null, 2)));
    }
  } else {
    console.log(`${slug}: all ${withIds.length} ok`);
  }
}

console.log(
  `\n${checked} checked, ${bad} rejected${FIX ? " and cleared" : " (re-run with --fix to clear)"}`
);
