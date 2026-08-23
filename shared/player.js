/* ============================================================
   player.js — shared playlist controller for every theme.
   Requires (set by each site before this file loads):
     window.PLAYLIST    Array<{title, artist, year?, yt?, q?}>
     window.SITE        {name, tagline, playlistUrl?, shuffle?, searchFallback?}
   Audio is played through the official YouTube IFrame API
   (hidden iframe) — nothing is self-hosted or downloaded.
   ============================================================ */

(function () {
  "use strict";

  /* Station state is swappable: the switcher changes stations in place
     rather than navigating, because a page load would tear down the iframe
     and stop the audio. adoptStation() is the only thing that writes it. */
  var PLAYLIST = [];
  var SITE = {};
  var LIST_MODE = false;
  var OVERRIDES = {};
  var order = [];
  var cursor = 0;
  var MAX_SECONDS = 900;
  var lastShown = null;
  var skips = 0;

  // ---------- dom ----------------------------------------------------
  var $ = function (sel) {
    return document.querySelector(sel);
  };

  var el = {
    stage: $(".stage"),
    gate: $("#gate"),
    gateBtn: $("#gate-btn"),
    art: $("#art"),
    title: $("#track-title"),
    meta: $("#track-meta"),
    ticker: $("#ticker-text"),
    play: $("#btn-play"),
    playIcon: $("#icon-play"),
    prev: $("#btn-prev"),
    next: $("#btn-next"),
    status: $("#status"),
    count: $("#count"),
    card: $(".card"),
    ambience: $("#ambience"),
    bar: $("#bar"),
    fill: $("#progress-fill"),
    knob: $("#progress-knob"),
    tCur: $("#time-cur"),
    tDur: $("#time-dur")
  };

  var reducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var player = null;
  var ready = false;
  var playing = false;
  var pendingPlay = false;
  var skipTimer = null;
  var misses = 0; // consecutive tracks with no playable source
  var pendingShuffle = false;

  // progress / seek state
  var drag = null; // {frac} while the user is scrubbing
  // track-change choreography state
  var lastRenderedKey = null;
  var swapTimer = null;

  function adoptStation(site, tracks) {
    SITE = site || {};
    PLAYLIST = (tracks || []).slice();

    /* playlist mode (SITE.ytPlaylist): stream a real YouTube playlist. Needs
       no API key at runtime and follows the playlist as it changes; metadata
       comes from getVideoData(). Otherwise play the curated array of
       hand-resolved ids. Curated entries still override the display in
       playlist mode, keyed by video id. */
    LIST_MODE = !!SITE.ytPlaylist;
    MAX_SECONDS = SITE.maxSeconds || 900;

    OVERRIDES = {};
    PLAYLIST.forEach(function (t) {
      if (t.yt) OVERRIDES[t.yt] = t;
    });

    order = PLAYLIST.map(function (_, i) {
      return i;
    });
    if (SITE.shuffle !== false) {
      for (var i = order.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = order[i];
        order[i] = order[j];
        order[j] = t;
      }
    }

    cursor = 0;
    lastShown = null;
    misses = 0;
    skips = 0;
  }

  /* YouTube titles are written by uploaders, not designers:
       "Ole Ole Full Song | Yeh Dillagi | Saif Ali Khan, Kajol | Abhijeet"
     The song name is almost always the first pipe-separated segment; what
     follows is film, cast and singers, which makes a decent subtitle. */
  var TITLE_NOISE =
    /\b(full\s+)?(video\s+)?song\b|\bfull\s+video\b|\blyrical\b|\bwith\s+lyrics\b|\blyrics\b|\bofficial\s+(music\s+)?video\b|\bofficial\s+audio\b|\baudio\b|\bhd\b|\b4k\b|\bremastered\b|\bhq\b/gi;

  function tidy(s) {
    return (s || "")
      .replace(/\([^)]*\)|\[[^\]]*\]/g, " ") // "(Official Video)", "[HD]"
      .replace(TITLE_NOISE, " ")
      .replace(/\s*[-–—:]\s*$/, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  function fromVideoData() {
    var d = (player && player.getVideoData && player.getVideoData()) || {};
    if (!d.video_id) return null;

    var override = OVERRIDES[d.video_id];
    if (override) {
      return {
        title: override.title,
        artist: override.artist,
        year: override.year,
        yt: d.video_id
      };
    }

    // Uploaders separate with pipes ("Song | Film | Singers") or with spaced
    // hyphens ("The Police - Every Breath You Take"). Handle both.
    // A lone lowercase "l" between spaces is a stand-in for a pipe on a lot
    // of Indian uploads ("Vishnu mantra l Garbh sanskar music l 108 times").
    var parts = String(d.title || "")
      .split(/\s*[|·•]\s*|\s+[-–—]\s+|\s+l\s+/)
      .map(tidy)
      .filter(Boolean);

    // Drop segments that just repeat the channel ("...- Nupur Audio") and
    // any duplicates.
    var flat = function (x) {
      return String(x).toLowerCase().replace(/[^a-z0-9]/g, "");
    };
    // "ThePoliceVEVO" and "Eagles - Topic" both name the artist, and Western
    // uploads put it first: "The Police - Every Breath You Take". Dropping the
    // segment that matches the channel leaves the actual song title.
    var author = flat((d.author || "").replace(/vevo$|\s*-\s*topic$/i, ""));
    var seen = {};
    parts = parts.filter(function (s) {
      var k = flat(s);
      if (!k || seen[k]) return false;
      seen[k] = 1;
      return !(author && k.length > 3 && (k === author || author.indexOf(k) === 0));
    });

    // Prefer a Latin-script segment for the headline: the display faces carry
    // no Devanagari or Nastaliq, so those fall back to a system font and break
    // the type. The native-script version stays available in the subtitle.
    var latin = parts.filter(function (s) {
      return /[a-z]/i.test(s);
    });
    var title = (latin[0] || parts[0] || d.title || "—").slice(0, 64);

    var rest = parts.filter(function (s) {
      return s !== title;
    });

    // Channel names are a last resort for the subtitle, so tidy the branding
    // off them: "ThePoliceVEVO" reads as a YouTube artefact, "The Police" does not.
    var channel = String(d.author || "")
      .replace(/\s*-\s*topic$/i, "")
      .replace(/vevo$/i, "")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .trim();

    return {
      title: title,
      artist: rest.slice(0, 2).join("  ·  ") || channel,
      year: null,
      yt: d.video_id
    };
  }

  function current() {
    if (LIST_MODE) {
      // getVideoData() is briefly empty between videos — keep the outgoing
      // card up rather than flashing a placeholder.
      var d = fromVideoData();
      if (d) lastShown = d;
      return lastShown || { title: "…", artist: "", yt: null };
    }
    return PLAYLIST[order[cursor]];
  }

  function searchUrl(track) {
    var q = track.q || track.title + " " + track.artist;
    return "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
  }

  function fmtTime(s) {
    s = Math.max(0, Math.floor(Number(s) || 0));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }

  // ---------- rendering ----------------------------------------------
  function renderTrack() {
    var track = current();

    var meta = [track.artist, track.year].filter(Boolean).join("  ·  ");

    el.title.textContent = track.title;
    el.meta.textContent = meta;

    if (el.swTitle) el.swTitle.textContent = track.title;
    if (el.swMeta) el.swMeta.textContent = meta;

    if (el.count) {
      if (LIST_MODE) {
        var n = player && player.getPlaylist && player.getPlaylist();
        var i = player && player.getPlaylistIndex && player.getPlaylistIndex();
        el.count.textContent = n && n.length ? i + 1 + " / " + n.length : "";
      } else {
        el.count.textContent = cursor + 1 + " / " + order.length;
      }
    }

    if (el.ticker) {
      var line = "now playing — " + track.title + " — " + track.artist + "   ★   ";
      el.ticker.textContent = line;

      // Restart the marquee on every track change, otherwise the new title
      // inherits the outgoing one's position and appears already half
      // scrolled off. Duration scales with the text so a long title travels
      // at the same speed as a short one.
      if (!reducedMotion) {
        el.ticker.style.animation = "none";
        void el.ticker.offsetWidth; // force reflow so the restart takes
        el.ticker.style.animation =
          "ticker-scroll " + (6 + line.length * 0.28).toFixed(1) + "s linear infinite";
      }
    }

    // Album art: official YouTube thumbnail when we have a video id.
    // maxresdefault is a clean 16:9 frame; hqdefault is 4:3 with black bars
    // baked in, which show up as letterboxing inside the square crop. Older
    // uploads have no maxres, so fall back on error.
    if (track.yt) {
      var img = document.createElement("img");
      img.alt = "";
      img.loading = "lazy";
      img.src = "https://i.ytimg.com/vi/" + track.yt + "/maxresdefault.jpg";
      img.onerror = function () {
        img.onerror = null;
        img.classList.add("art--letterboxed");
        img.src = "https://i.ytimg.com/vi/" + track.yt + "/hqdefault.jpg";
      };
      el.art.textContent = "";
      el.art.appendChild(img);
    } else {
      el.art.innerHTML =
        '<div class="art-fallback">' + (SITE.glyph || "♫") + "</div>";
    }

    // Ambient glow behind the card mirrors the artwork.
    if (el.ambience) {
      el.ambience.style.backgroundImage = track.yt
        ? 'url("https://i.ytimg.com/vi/' + track.yt + '/hqdefault.jpg")'
        : "";
    }

    // Choreograph the change only when the song actually changed — playlist
    // mode re-renders on every CUED/BUFFERING state event.
    var key = track.title + "|" + track.yt;
    if (key !== lastRenderedKey && el.card) {
      lastRenderedKey = key;
      el.card.classList.remove("swap");
      void el.card.offsetWidth; // restart the animation
      el.card.classList.add("swap");
      clearTimeout(swapTimer);
      swapTimer = setTimeout(function () {
        el.card.classList.remove("swap");
      }, 900);
    }

    updateMediaSession(track);

    document.title = track.title + " · " + (SITE.name || "radio");
  }

  function setStatus(html) {
    if (el.status) el.status.innerHTML = html || "";
  }

  var ICON_PLAY = "M8 5v14l11-7z";
  var ICON_PAUSE = "M6 5h4v14H6zm8 0h4v14h-4z";

  function renderPlayState() {
    if (el.playIcon) el.playIcon.setAttribute("d", playing ? ICON_PAUSE : ICON_PLAY);
    if (el.swIcon) el.swIcon.setAttribute("d", playing ? ICON_PAUSE : ICON_PLAY);
    if (el.play) el.play.setAttribute("aria-label", playing ? "Pause" : "Play");
    document.body.classList.toggle("paused", !playing);
    document.body.classList.toggle("playing", playing);
    if ("mediaSession" in navigator) {
      try {
        navigator.mediaSession.playbackState = playing ? "playing" : "paused";
      } catch (err) { /* not supported */ }
    }
  }

  /* Lock screen / hardware keys / OS media UI: real metadata plus artwork,
     and play-pause-skip actions routed through the same code as the buttons. */
  function updateMediaSession(track) {
    if (!("mediaSession" in navigator) || !window.MediaMetadata) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist || "",
        album: SITE.name || "",
        artwork: track.yt
          ? [{
              src: "https://i.ytimg.com/vi/" + track.yt + "/hqdefault.jpg",
              sizes: "480x360",
              type: "image/jpeg"
            }]
          : []
      });
    } catch (err) { /* no-op */ }
  }

  // ---------- playback ------------------------------------------------
  function loadCurrent() {
    clearTimeout(skipTimer);
    renderTrack();
    setStatus("");

    // In playlist mode the player owns the queue; nothing to load by hand.
    if (LIST_MODE) return;

    if (!ready) {
      pendingPlay = true;
      return;
    }

    var track = current();

    if (track.yt) {
      player.loadVideoById(track.yt);
      return;
    }

    if (SITE.searchFallback !== false) {
      // No hard-coded video id yet — ask the embed to resolve it by search.
      try {
        player.loadPlaylist({
          listType: "search",
          list: track.q || track.title + " " + track.artist
        });
        return;
      } catch (err) {
        /* fall through to the manual link below */
      }
    }

    noSource(track, "no video id yet");
  }

  /* Called whenever a track has nothing playable behind it. We auto-advance
     so one dead video doesn't stall the station — but after a few misses in
     a row (typically: no `yt` ids filled in yet) we stop, because silently
     racing through the whole playlist is worse than saying so. */
  function noSource(track, reason) {
    playing = false;
    renderPlayState();
    clearTimeout(skipTimer);
    misses++;

    var link =
      ' — <a target="_blank" rel="noopener" href="' +
      searchUrl(track) +
      '">open on YouTube</a>';

    if (misses >= 4) {
      setStatus(
        "no playable video ids in this playlist — see README, then run fill-ids" + link
      );
      return;
    }

    setStatus(reason + link);
    skipTimer = setTimeout(next, reason === "unavailable here" ? 2500 : 6000);
  }

  function next() {
    if (LIST_MODE) {
      if (ready) player.nextVideo();
      return;
    }
    cursor = (cursor + 1) % order.length;
    loadCurrent();
  }

  function prev() {
    if (LIST_MODE) {
      if (ready) player.previousVideo();
      return;
    }
    cursor = (cursor - 1 + order.length) % order.length;
    loadCurrent();
  }

  function toggle() {
    if (!ready) return;
    if (playing) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }

  // ---------- youtube iframe api ---------------------------------------
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player("yt-host", {
      height: "1",
      width: "1",
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        playsinline: 1,
        rel: 0,
        origin: window.location.origin
      },
      events: {
        onReady: onReady,
        onStateChange: onStateChange,
        onError: onError
      }
    });
  };

  /* Some public playlists load fine through the Data API but come back empty
     in the embedded player — the garbh sanskar list did exactly that, leaving
     the station silent with no error. Fall back to the curated ids when that
     happens rather than showing a dead page. */
  function startPlaylist() {
    player.loadPlaylist({ listType: "playlist", list: SITE.ytPlaylist });
    player.setLoop(true);
    pendingShuffle = SITE.shuffle !== false;

    var wanted = SITE.ytPlaylist;
    setTimeout(function () {
      if (!LIST_MODE || SITE.ytPlaylist !== wanted) return;
      var pl = player.getPlaylist && player.getPlaylist();
      if (pl && pl.length) return;

      var playable = PLAYLIST.filter(function (t) {
        return t.yt;
      }).length;
      console.warn("[player] playlist " + wanted + " loaded empty");
      if (!playable) return;

      LIST_MODE = false;
      lastShown = null;
      loadCurrent();
      player.playVideo();
    }, 7000);
  }

  function onReady() {
    ready = true;
    /* No volume UI — the OS/hardware keys own it now. Keep any level a
       visitor set back when the slider existed, else the old default. */
    var stored = Number(localStorage.getItem("radio-volume"));
    player.setVolume(isFinite(stored) && stored > 0 ? stored : 65);
    if (LIST_MODE) {
      startPlaylist();
      return;
    }

    if (pendingPlay) {
      pendingPlay = false;
      loadCurrent();
      player.playVideo();
    }
  }

  /* Public playlists are padded with hour-long "Video Jukebox" compilations
     and lofi/bass-boosted remixes. Both break the one-song-at-a-time premise,
     so skip them the moment we can see what loaded. */
  var JUNK = /jukebox|non ?stop|nonstop|mashup|medley|all songs|full album|lofi|lo-fi|slowed|reverb|bass boosted|remix|mix\b|#shorts|\bshorts?\b/i;


  function isJunk() {
    var d = (player.getVideoData && player.getVideoData()) || {};
    if (d.title && JUNK.test(d.title)) return true;
    var secs = player.getDuration && player.getDuration();
    // Ceiling is per station: an hour-long stotram is the point on bhajan,
    // a compilation anywhere else.
    return !!secs && secs > MAX_SECONDS;
  }

  function onStateChange(e) {
    if (LIST_MODE) {
      if (
        (e.data === YT.PlayerState.PLAYING || e.data === YT.PlayerState.BUFFERING) &&
        skips < 8 &&
        isJunk()
      ) {
        skips++;
        player.nextVideo();
        return;
      }
      if (e.data === YT.PlayerState.PLAYING) {
        skips = 0;
        if (pendingShuffle) {
          pendingShuffle = false;
          player.setShuffle(true);
          /* setShuffle reorders what comes next but leaves the current video
             alone, so every visit still opened on the same track. Jump to a
             random entry as well, so a station feels different each time. */
          var list = player.getPlaylist && player.getPlaylist();
          if (list && list.length > 1) {
            player.playVideoAt(Math.floor(Math.random() * list.length));
          }
        }
      }
      // CUED/BUFFERING/PLAYING all mean the current video changed
      renderTrack();
      playing = e.data === YT.PlayerState.PLAYING;
      renderPlayState();
      return;
    }

    if (e.data === YT.PlayerState.ENDED) {
      next();
      return;
    }
    playing = e.data === YT.PlayerState.PLAYING;
    renderPlayState();
    if (playing) {
      clearTimeout(skipTimer);
      setStatus("");
      misses = 0;
    }
  }

  function onError() {
    if (LIST_MODE) {
      // YouTube advances past its own dead entries; just move on.
      if (ready) player.nextVideo();
      return;
    }
    // 2 / 5 / 100 / 101 / 150 — unplayable or embed-blocked.
    noSource(current(), "unavailable here");
  }

  function bootYouTubeApi() {
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
      return;
    }
    var s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
  }

  // ---------- events ----------------------------------------------------
  el.gateBtn.addEventListener("click", function () {
    el.gate.hidden = true;
    pendingPlay = true;
    bootYouTubeApi();
    if (ready) {
      loadCurrent();
      player.playVideo();
    }
  });

  el.play.addEventListener("click", toggle);
  // A manual skip clears the miss counter — the user asked for this track.
  el.next.addEventListener("click", function () {
    misses = 0;
    next();
  });
  el.prev.addEventListener("click", function () {
    misses = 0;
    prev();
  });

  // ---------- progress / seek --------------------------------------------
  var hasBar = el.bar && el.fill && el.knob && el.tCur && el.tDur;

  function setBar(frac, dur, cur) {
    var pct = (frac * 100).toFixed(2) + "%";
    el.fill.style.width = pct;
    el.knob.style.left = pct;
    el.tCur.textContent = fmtTime(cur);
    el.tDur.textContent = fmtTime(dur);
  }

  if (hasBar) {
    /* Poll rather than chase state events: getDuration() only becomes
       finite once a video is actually loaded, and playlist mode changes
       videos without telling us. Cheap enough at 400ms. */
    setInterval(function () {
      if (!ready || !player || !player.getDuration) return;
      var d = Number(player.getDuration());
      if (!(d > 0 && isFinite(d))) {
        if (!drag) {
          el.fill.style.width = "0%";
          el.knob.style.left = "0%";
          el.tDur.textContent = "\u2013:\u2013\u2013";
        }
        return;
      }
      if (drag) {
        setBar(drag.frac, d, drag.frac * d);
        return;
      }
      var c = Math.min(Math.max(Number(player.getCurrentTime()) || 0, 0), d);
      setBar(c / d, d, c);
    }, 400);

    function fracFromEvent(e) {
      var r = el.bar.getBoundingClientRect();
      return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    }

    el.bar.addEventListener("pointerdown", function (e) {
      if (!ready || !player || !player.getDuration) return;
      e.preventDefault();
      try { el.bar.setPointerCapture(e.pointerId); } catch (err) { /* ok */ }
      drag = { frac: fracFromEvent(e) };
      el.bar.classList.add("dragging");
    });

    el.bar.addEventListener("pointermove", function (e) {
      if (drag) drag = { frac: fracFromEvent(e) };
    });

    ["pointerup", "pointercancel"].forEach(function (ev) {
      el.bar.addEventListener(ev, function (e) {
        if (!drag) return;
        var frac = fracFromEvent(e);
        drag = null;
        el.bar.classList.remove("dragging");
        var d = ready && player.getDuration ? Number(player.getDuration()) : 0;
        if (d > 0 && isFinite(d) && player.seekTo) {
          player.seekTo(frac * d, true);
          setBar(frac, d, frac * d);
        }
      });
    });
  }

  // ---------- media session actions ---------------------------------------
  if ("mediaSession" in navigator) {
    [
      ["play", function () { if (ready) player.playVideo(); }],
      ["pause", function () { if (ready) player.pauseVideo(); }],
      ["previoustrack", function () { misses = 0; prev(); }],
      ["nexttrack", function () { misses = 0; next(); }]
    ].forEach(function (a) {
      try { navigator.mediaSession.setActionHandler(a[0], a[1]); } catch (err) { /* unsupported */ }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT") return;
    if (e.code === "Space") {
      e.preventDefault();
      if (!el.gate.hidden) {
        el.gateBtn.click();
      } else {
        toggle();
      }
    } else if (e.code === "ArrowRight") {
      next();
    } else if (e.code === "ArrowLeft") {
      prev();
    }
  });

  // ---------- station switcher --------------------------------------------
  /* Switching swaps the theme stylesheet, the scene markup and the station
     state in place. The iframe is never recreated, so the outgoing station
     keeps playing while the overlay is open — navigating to the hub instead
     would tear the audio down mid-song. */

  var STATIONS = window.STATIONS || [];
  var here = (location.pathname.match(/sites\/([^/]+)/) || [])[1] || "";
  var sw = null;

  function buildSwitcher() {
    if (!STATIONS.length) return;

    sw = document.createElement("div");
    sw.className = "switcher";
    sw.hidden = true;

    var html =
      '<div class="switcher-inner"><h2>All stations</h2>' +
      '<p class="switcher-note">the current station keeps playing while you browse</p>';

    // Recommended first, then the full catalogue — same order as the hub.
    var featured = STATIONS.filter(function (st) {
      return st.featured;
    }).sort(function (a, b) {
      return a.featured - b.featured;
    });

    [["featured", "Recommended"], ["place", "Places"], ["genre", "Genres"]].forEach(function (g) {
      var list =
        g[0] === "featured"
          ? featured
          : STATIONS.filter(function (st) {
              return st.kind === g[0];
            });
      if (!list.length) return;

      html += '<p class="switcher-note">' + g[1] + '</p><div class="switcher-grid">';
      list.forEach(function (st) {
        html +=
          '<button class="st" data-slug="' + st.slug + '"' +
          ' style="--a:' + st.accent + ';--b:' + st.bg + '"' +
          ' aria-current="' + (st.slug === here) + '">' +
          "<i>" + st.glyph + "</i><b>" + st.name + "</b>" +
          "<span>" + st.kicker + "</span></button>";
      });
      html += "</div>";
    });

    /* "all stations" is now an overlay, which left no way back to the hub.
       Offer it explicitly, and say what it costs — the hub is a real page
       load, so it stops the music. */
    html +=
      '<button class="switcher-close">close</button>' +
      '<a class="switcher-home" href="../../index.html"><span>homepage &#8599;</span>' +
      '<em>stops playback</em></a></div>';

    /* The transport sits behind the overlay, so browsing meant losing the
       ability to skip or pause. Mirror it along the bottom. */
    html +=
      '<div class="now-bar">' +
      '<span class="now-dot"></span>' +
      '<div class="now-text"><b id="sw-title">—</b><span id="sw-meta"></span></div>' +
      '<button class="tbtn" id="sw-play" aria-label="Play">' +
      '<svg viewBox="0 0 24 24"><path id="sw-icon" d="' + ICON_PLAY + '"/></svg></button>' +
      '<button class="tbtn" id="sw-next" aria-label="Next">' +
      '<svg viewBox="0 0 24 24"><path d="M16 6h2v12h-2zM6 18l9-6-9-6z"/></svg></button>' +
      "</div>";

    sw.innerHTML = html;
    document.body.appendChild(sw);

    el.swTitle = sw.querySelector("#sw-title");
    el.swMeta = sw.querySelector("#sw-meta");
    el.swIcon = sw.querySelector("#sw-icon");

    sw.querySelector("#sw-play").addEventListener("click", function (e) {
      e.stopPropagation();
      toggle();
    });
    sw.querySelector("#sw-next").addEventListener("click", function (e) {
      e.stopPropagation();
      misses = 0;
      next();
    });

    sw.addEventListener("click", function (e) {
      if (e.target === sw || e.target.className === "switcher-close") {
        sw.hidden = true;
        return;
      }
      var btn = e.target.closest && e.target.closest(".st");
      if (btn) switchStation(btn.getAttribute("data-slug"));
    });
  }

  function switchStation(slug) {
    var st = STATIONS.filter(function (x) {
      return x.slug === slug;
    })[0];
    if (!st || !sw) return;

    if (slug !== here) {
      here = slug;

      var css = document.getElementById("theme-css");
      if (css) css.href = "../" + slug + "/theme.css";

      // the display face differs per station and may not be loaded yet
      var fonts = document.getElementById("theme-fonts");
      if (fonts) fonts.href = st.fontsHref;

      var scene = document.querySelector(".scene");
      if (scene) scene.innerHTML = st.scene;

      var sign = document.querySelector(".sign");
      if (sign) sign.innerHTML = st.signHtml + "<small>" + st.kicker + "</small>";

      var tag = document.querySelector(".footer span:last-child");
      if (tag) tag.textContent = st.tagline;

      var themeColor = document.querySelector('meta[name="theme-color"]');
      if (themeColor) themeColor.setAttribute("content", st.bg);

      var icon = document.querySelector('link[rel="icon"]');
      if (icon) icon.href = "../" + slug + "/favicon.svg";

      // keep the URL shareable without reloading
      try {
        history.pushState({ slug: slug }, "", "../" + slug + "/");
      } catch (err) {
        /* file:// forbids pushState — harmless */
      }

      Array.prototype.forEach.call(sw.querySelectorAll(".st"), function (b) {
        b.setAttribute("aria-current", String(b.getAttribute("data-slug") === slug));
      });
    }

    sw.hidden = true;
    adoptStation(st.site, st.tracks);

    if (!ready) {
      pendingPlay = true;
      renderTrack();
      return;
    }

    if (LIST_MODE) {
      // loadPlaylist is ignored while a playlist is mid-playback, so stop
      // first. Shuffle is applied once the new list reports PLAYING —
      // setting it before the load lands has no effect either.
      player.stopVideo();
      startPlaylist();
    } else {
      loadCurrent();
      player.playVideo();
    }
    renderTrack();
  }

  window.addEventListener("popstate", function (e) {
    if (e.state && e.state.slug) switchStation(e.state.slug);
  });

  // ---------- init -------------------------------------------------------
  adoptStation(window.SITE, window.PLAYLIST);
  buildSwitcher();

  // "all stations" opens the overlay rather than navigating away
  var allLink = document.querySelector(".masthead-links a");
  if (allLink && STATIONS.length) {
    allLink.addEventListener("click", function (e) {
      e.preventDefault();
      sw.hidden = false;
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sw && !sw.hidden) sw.hidden = true;
  });

  renderTrack();
  renderPlayState();
})();
