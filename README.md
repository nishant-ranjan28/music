# Nostalgia radio — four singers

Live at <https://nostalgia.iamnishant.in>

Single-page ambient radio sites in the `saloon.wtf` format. Every station shares one
design system and one player; each has its own palette, typography, scene and playlist.

| Station | Slug | Kind | Sound |
|---|---|---|---|
| Sanam | `udit-narayan` | artist | Udit Narayan, the 90s romance king |
| Sitara | `sonu-nigam` | artist | Sonu Nigam, Border to Kal Ho Naa Ho |
| Raabta | `arijit-singh` | artist | Arijit Singh, late-night 2010s heartbreak |
| Aashiqui | `kumar-sanu` | artist | Kumar Sanu, cassette-era melody |

Every station streams a public YouTube playlist and keeps a curated track list as a
fallback for when that playlist breaks.

## Run it

Any static server. The player needs `http://`, not `file://`, because the
YouTube IFrame API checks the page origin.

```bash
python3 -m http.server 4321
# then open http://localhost:4321/index.html
```

## Switching stations without stopping the music

"All stations" on a station page opens an in-page overlay rather than navigating
to the hub. Picking a station swaps the theme stylesheet, the scene markup and the
station state in place and pushes the new URL with `history.pushState`.

This is the only way the audio can survive the change: the player lives in a hidden
iframe, and any real navigation destroys it mid-song. The hub at `/` is still a
normal page — it is the entry point, so nothing is playing yet when you are there.

`build.mjs` generates `shared/stations.js`, a manifest of every station (metadata,
scene markup, playlist id, tracks) that each page loads so the switcher has
everything it needs without fetching.

Two YouTube IFrame API quirks are worth knowing if you touch this:
`loadPlaylist` is ignored while a playlist is mid-playback, so the switch calls
`stopVideo()` first; and `setShuffle` has no effect until the new list reports
`PLAYING`, so it is deferred to the state change.

## Layout

```
shared/base.css        design system — all themes set the same token names
shared/player.js       playlist controller (YouTube IFrame API, hidden iframe)
themes/themes.mjs      ← the only file you normally edit: one config per station
build.mjs              generates sites/ + the hub index.html
scripts/fill-ids.mjs   resolves YouTube video ids via the Data API
sites/<slug>/          generated: index.html, theme.css, playlist.js, og.svg, favicon.svg
index.html             generated hub linking all stations
favicon.svg            generated hub icon
```

`sites/` is generated output — edit `themes/themes.mjs` and re-run `node build.mjs`.
The one exception is the `yt` ids inside `sites/*/playlist.js`: the build reads them
back in before overwriting, so hand-filled or script-filled ids survive a rebuild.

## Adding a station

Append one object to the `themes` array in `themes/themes.mjs`:

```js
{
  slug: "chai-stall", kind: "place",
  name: "cutting.wtf",
  sign: "C U T T I N G",  kicker: "half glass · extra kadak",
  tagline: "...", gateTitle: "...", gateCopy: "...", ogDesc: "...", glyph: "☕",
  fonts: { display: "Anton", body: "Inter", href: "https://fonts.googleapis.com/..." },
  tokens: { "--bg": "#120e07", "--accent": "#f7c948", /* ...see any existing theme */ },
  scene: `<div class="steam"></div>`,       // decoration, pointer-events: none
  css:   `.steam{position:absolute;...}`,   // scoped styles for that scene
  js:    ``,                                // optional, runs after the player
  tracks: [["Song", "Artist", 1994], ...]
}
```

Then `node build.mjs`. Nothing else needs touching.

### Required tokens

Themes must set: `--bg --surface --ink --ink-dim --accent --accent-2 --on-accent --line`.
Everything else in `base.css` has a fallback. Useful optional ones: `--bg-gradient`,
`--sign-ink`, `--sign-shadow`, `--sign-tracking`, `--card-radius`, `--card-border`,
`--card-blur`, `--art-radius`, `--art-filter`, `--grain-opacity`, `--grain-blend`,
`--vignette`.

## Audio — read this before launch

**No audio is hosted here.** Every track plays through the official YouTube IFrame
API in a hidden iframe, which is the licensed path. Do not swap in self-hosted MP3s
of copyrighted songs.

Each track has a `yt` field holding an 11-character video id. These are the fallback
the player uses when a station's playlist fails to load, and they also supply the
display title and artist for any track the playlist happens to contain. Fill missing
ones with:

```bash
YT_API_KEY=xxxx node scripts/fill-ids.mjs            # every station
YT_API_KEY=xxxx node scripts/fill-ids.mjs ghazal     # one station
```

Get a key at console.cloud.google.com → enable **YouTube Data API v3** → create an
API key. Search costs 100 quota units per call against a 10,000/day default, so
budget roughly 100 tracks per day, or request more quota. Already-filled ids are
skipped on re-runs.

Or fill them by hand — the id is the `v=` parameter of a YouTube watch URL:

```js
{ "title": "Ranjish Hi Sahi", "artist": "Mehdi Hassan", "yt": "dQw4w9WgXcQ" }
```

Prefer official-label uploads: they are less likely to be taken down and less likely
to be embed-blocked. The player already handles embed-blocked videos by skipping
forward, but a playlist full of them is a bad first impression.

Album art comes free once ids exist — the player uses
`i.ytimg.com/vi/<id>/hqdefault.jpg`, no API call needed.

## Favicons

Generated per station from the theme's `glyph` on its `--accent` tile, so many open
tabs stay tellable apart. Wired up as `icon`, `apple-touch-icon` and `mask-icon`.

The glyph is drawn as text with `&#xFE0E;` (text presentation selector) and a
symbol-font stack, which forces monochrome — without it macOS renders `☎`, `⚡` and
friends as colour emoji and ignores the fill. If you swap in a new glyph, check it
still renders monochrome.

SVG favicons cover every current browser. If you need IE/legacy or a Windows tile,
convert:

```bash
for d in sites/*/; do rsvg-convert -w 180 -h 180 "$d/favicon.svg" -o "$d/apple-touch-icon.png"; done
```

## Visitor counters

The footer shows how many people are listening right now and how many visits there
have been in total. `api/hit.mjs` is a Vercel serverless function; `shared/counter.js`
calls it on load and then every 20 seconds.

"Live" is a presence set, not a counter: each visitor writes its id with a timestamp
on every heartbeat, entries older than 50 seconds are dropped, and what remains is
who is here. Incrementing on load and decrementing on unload drifts upward forever,
because browsers are closed without firing unload all the time.

Visits count once per browser session, so refreshing does not inflate them. The
visitor id lives in `localStorage`, so one person is one listener rather than one
per tab.

**Storage setup.** In the Vercel dashboard: *Storage → Create → Upstash for Redis →
connect to this project*. The env vars are injected automatically, and the function
accepts either the Vercel KV or Upstash naming:

```
KV_REST_API_URL / KV_REST_API_TOKEN
UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
```

**With no storage configured the counters simply do not appear.** The endpoint
reports `enabled: false`, the element stays empty and `.counter:empty` hides it —
the site is static-first and has to work with no backend at all, which is also what
happens when you run it locally with `python3 -m http.server`.

## Keeping stations alive

Playlists belong to other people. Videos get deleted, region-blocked or made
private, playlists get emptied, and uploaders replace single songs with hour-long
compilations. Nothing here notices on its own.

`.github/workflows/sync-stations.yml` runs three schedules two days apart, each
covering part of the catalogue:

Membership is not listed anywhere — `scripts/sync-group.mjs` deals the
stations in `sites/` round-robin across Monday, Wednesday and Friday. A new
station therefore joins the rota automatically, and the groups stay balanced
as the catalogue grows. To see the current split:

```bash
node scripts/sync-group.mjs --report
```

Each run checks the playlists still resolve, fills missing ids, audits what it
filled, rebuilds, and commits if anything changed. They fire at 08:37 UTC,
which is just after the YouTube quota resets at midnight US Pacific — the
earlier 02:23 UTC slot landed at 19:23 PT, near the end of a Pacific day when
the quota is most likely spent. Splitting into three keeps
every run well under the 10,000 units/day allowance — one search costs 100 of
them, which is what made a single full pass impossible by hand.

**It needs one secret.** Add your key under *Settings → Secrets and variables →
Actions* as `YT_API_KEY`, or:

```bash
gh secret set YT_API_KEY --repo <owner>/<repo>
```

Run a group by hand from the Actions tab (*Run workflow*), optionally passing
specific slugs.

### What the sync cannot catch

`check-playlists.mjs` asks the Data API whether a playlist is public and
populated. That is not sufficient: the first garbh sanskar playlist reported
public with 40 embeddable videos and returned **zero items** to the embedded
player, leaving the station silent with nothing in the console. Only loading a
playlist in a real embed proves it works.

The player covers the rest at runtime — if a playlist arrives empty it falls
back to that station's curated ids, which is why the ids are still worth
filling even though every station now streams a playlist.

## OG images

`sites/<slug>/og.svg` is generated. X, WhatsApp and iMessage will not render an SVG
link preview, so convert to PNG before launch:

```bash
# with rsvg-convert (brew install librsvg)
for d in sites/*/; do rsvg-convert -w 1200 -h 630 "$d/og.svg" -o "$d/og.png"; done
```

The generated card is a starting point. Per the plan, the OG image is most of why
these sites spread — it is worth designing each one by hand before launch.

## Deploy

Static, no build step at serve time. Point Vercel / Netlify / Cloudflare Pages at
the repo root. For one domain per station, set each project's root directory to
`sites/<slug>/` and rewrite `../../shared/` to a copy of `shared/` inside that
directory, or serve everything from one domain with the hub at `/`.

## Not built (deliberately, per the plan)

Accounts, likes, search, multi-page navigation, ambient sfx layer, analytics.
