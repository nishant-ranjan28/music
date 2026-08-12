# Nostalgia radio — ten stations

Single-page ambient radio sites in the `saloon.wtf` format. Ten stations share one
design system and one player; each has its own palette, typography, scene and playlist.

| Station | Slug | Kind | Sound |
|---|---|---|---|
| pco.wtf | `std-booth` | place | Yellow-board PCO booth, 90s Bollywood longing |
| meterdown.wtf | `auto-rickshaw` | place | FM Rainbow-era hits at blown-speaker volume |
| kirana.wtf | `kirana-store` | place | Vividh Bharati over glass jars, 70s–80s |
| baraat.wtf | `baraat-band` | place | Brass band Bollywood, dhol, marigold lights |
| vhs.wtf | `wedding-vhs` | place | Wedding-video slow-mo love songs, scan lines |
| mehfil.wtf | `ghazal` | genre | Mehdi Hassan, Jagjit Singh, Ghulam Ali |
| cassette.wtf | `bollywood-90s` | genre | Kumar Sanu / Alka Yagnik cassette era |
| valve.wtf | `retro-rock` | genre | Classic rock through a valve amp |
| monsoon.wtf | `lofi` | genre | Lo-fi, rain, tape hiss |
| dargah.wtf | `qawwali` | genre | Nusrat, Sabri Brothers, Abida Parveen |

## Run it

Any static server. The player needs `http://`, not `file://`, because the
YouTube IFrame API checks the page origin.

```bash
python3 -m http.server 4321
# then open http://localhost:4321/index.html
```

## Layout

```
shared/base.css        design system — all themes set the same token names
shared/player.js       playlist controller (YouTube IFrame API, hidden iframe)
themes/themes.mjs      ← the only file you normally edit: 10 theme configs
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

Each track has a `yt` field holding an 11-character video id. **They are all `null`
right now** — the playlists are curated (real songs, real artists) but unresolved.
Until an id is filled in, the player falls back to the IFrame API's search list, and
if that fails it shows an "open on YouTube" link and advances after a few seconds.
That fallback is unreliable, so fill the ids before launching:

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

Generated per station from the theme's `glyph` on its `--accent` tile, so ten open
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
