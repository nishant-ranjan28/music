/* ============================================================
   counter.js — live + total visitor counts in the footer.

   Talks to /api/hit. If that endpoint is missing or has no storage
   configured, the element stays empty and nothing appears — the site
   is static-first and must work with no backend at all.
   ============================================================ */

(function () {
  "use strict";

  var el = document.getElementById("counter");
  if (!el) return;

  // Stable per browser so refreshes are not counted as new visits, and so
  // one person is one listener rather than one per tab.
  var KEY = "radio-visitor-id";
  var id;
  try {
    id = localStorage.getItem(KEY);
    if (!id) {
      id = "v" + Math.random().toString(36).slice(2, 12) + Date.now().toString(36).slice(-6);
      localStorage.setItem(KEY, id);
    }
  } catch (err) {
    // private mode with storage disabled — still count, just not stably
    id = "v" + Math.random().toString(36).slice(2, 12) + Date.now().toString(36).slice(-6);
  }

  var counted = false;
  try {
    counted = sessionStorage.getItem("radio-counted") === "1";
  } catch (err) {
    /* ignore */
  }

  // API is at the site root; station pages live two levels down.
  var API = (location.pathname.indexOf("/sites/") === 0 ? "../../" : "") + "api/hit";

  function format(n) {
    return n >= 1000 ? n.toLocaleString("en-US") : String(n);
  }

  function render(d) {
    if (!d || !d.enabled) {
      el.textContent = "";
      return;
    }
    el.innerHTML =
      '<i class="counter-dot"></i>' +
      format(d.live) +
      (d.live === 1 ? " listening" : " listening") +
      '<span class="counter-sep">·</span>' +
      format(d.total) +
      " visits";
  }

  function beat() {
    var fresh = !counted;
    fetch(API + "?id=" + encodeURIComponent(id) + (fresh ? "&new=1" : ""), {
      cache: "no-store"
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        if (fresh) {
          counted = true;
          try {
            sessionStorage.setItem("radio-counted", "1");
          } catch (err) {
            /* ignore */
          }
        }
        render(d);
      })
      .catch(function () {
        el.textContent = "";
      });
  }

  beat();
  var timer = setInterval(beat, 20000);

  // No point holding a slot in the presence set while backgrounded, and
  // resuming should refresh the numbers immediately.
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      clearInterval(timer);
    } else {
      beat();
      timer = setInterval(beat, 20000);
    }
  });
})();
