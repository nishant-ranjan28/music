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

  if (!PLAYLIST.length) {
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

  var cursor = 0;
  var player = null;
  var ready = false;
  var playing = false;
  var pendingPlay = false;
  var skipTimer = null;
  var misses = 0; // consecutive tracks with no playable source

  function current() {
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
      el.count.textContent = cursor + 1 + " / " + order.length;
    }

    if (el.ticker) {
      el.ticker.textContent =
        "now playing — " + track.title + " — " + track.artist + "   ★   ";
    }

    // Album art: official YouTube thumbnail when we have a video id.
    if (track.yt) {
      el.art.innerHTML =
        '<img alt="" src="https://i.ytimg.com/vi/' +
        track.yt +
        '/hqdefault.jpg" loading="lazy">';
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
    cursor = (cursor + 1) % order.length;
    loadCurrent();
  }

  function prev() {
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
    if (pendingPlay) {
      pendingPlay = false;
      loadCurrent();
      player.playVideo();
    }
  }

  function onStateChange(e) {
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
