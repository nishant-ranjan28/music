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

  var PLAYLIST = (window.PLAYLIST || []).slice();
  var SITE = window.SITE || {};

  /* Two sources of truth:

     - playlist mode (SITE.ytPlaylist): the station streams a real YouTube
       playlist. Unlimited length, updates when the playlist does, and needs
       no API key at runtime — the IFrame API takes a playlist id directly.
       Track metadata comes from the player via getVideoData().

     - static mode: the curated PLAYLIST array with hand-resolved video ids.

     In playlist mode any curated entry with a matching id still supplies the
     display title and artist, so the songs we bothered to name render exactly
     as designed and the rest fall back to a cleaned-up YouTube title. */
  var LIST_MODE = !!SITE.ytPlaylist;

  var OVERRIDES = {};
  PLAYLIST.forEach(function (t) {
    if (t.yt) OVERRIDES[t.yt] = t;
  });

  if (!LIST_MODE && !PLAYLIST.length) {
    console.warn("[player] empty playlist");
    return;
  }

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
    volume: $("#volume"),
    status: $("#status"),
    count: $("#count")
  };

  // ---------- order --------------------------------------------------
  var order = PLAYLIST.map(function (_, i) {
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

  var reducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var cursor = 0;
  var player = null;
  var ready = false;
  var playing = false;
  var pendingPlay = false;
  var skipTimer = null;
  var misses = 0; // consecutive tracks with no playable source

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
    var parts = String(d.title || "")
      .split(/\s*[|·•]\s*|\s+[-–—]\s+/)
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

  var lastShown = null;

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

  // ---------- rendering ----------------------------------------------
  function renderTrack() {
    var track = current();

    el.title.textContent = track.title;
    el.meta.textContent = [track.artist, track.year].filter(Boolean).join("  ·  ");

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

    document.title = track.title + " · " + (SITE.name || "radio");
  }

  function setStatus(html) {
    if (el.status) el.status.innerHTML = html || "";
  }

  var ICON_PLAY = "M8 5v14l11-7z";
  var ICON_PAUSE = "M6 5h4v14H6zm8 0h4v14h-4z";

  function renderPlayState() {
    if (el.playIcon) el.playIcon.setAttribute("d", playing ? ICON_PAUSE : ICON_PLAY);
    if (el.play) el.play.setAttribute("aria-label", playing ? "Pause" : "Play");
    document.body.classList.toggle("paused", !playing);
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

  function onReady() {
    ready = true;
    var stored = Number(localStorage.getItem("radio-volume"));
    var vol = isFinite(stored) && stored > 0 ? stored : 65;
    el.volume.value = vol;
    player.setVolume(vol);
    if (LIST_MODE) {
      player.loadPlaylist({ listType: "playlist", list: SITE.ytPlaylist });
      player.setShuffle(true);
      player.setLoop(true);
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
  var JUNK = /jukebox|non ?stop|nonstop|mashup|medley|all songs|full album|lofi|lo-fi|slowed|reverb|bass boosted|remix|mix\b/i;

  // Ghazal and qawwali recordings genuinely run long, so the ceiling is per
  // station rather than a flat 15 minutes.
  var MAX_SECONDS = SITE.maxSeconds || 900;
  var skips = 0;

  function isJunk() {
    var d = (player.getVideoData && player.getVideoData()) || {};
    if (d.title && JUNK.test(d.title)) return true;
    var secs = player.getDuration && player.getDuration();
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
      if (e.data === YT.PlayerState.PLAYING) skips = 0;
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

  el.volume.addEventListener("input", function () {
    var v = Number(el.volume.value);
    localStorage.setItem("radio-volume", String(v));
    if (ready) player.setVolume(v);
  });

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

  // ---------- init -------------------------------------------------------
  renderTrack();
  renderPlayState();
})();
