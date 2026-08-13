/* ============================================================
   /api/hit — visitor counters.

   total : every page load, incremented once per browser session
   live  : how many people are listening right now

   "Live" is a presence set rather than a counter: each visitor writes
   its id with the current timestamp on a heartbeat, entries older than
   the window are dropped, and the remaining count is who is here. A
   plain increment/decrement pair would drift every time a browser is
   closed without firing an unload.

   Storage is Redis over the Upstash REST API — no client library, so
   this file has no dependencies and the repo stays build-free. Works
   with either the Vercel KV or the Upstash integration's env vars.

   With no storage configured the endpoint reports disabled and the
   page simply does not show counters, rather than showing zeroes.
   ============================================================ */

const URL_ =
  process.env.KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.REDIS_REST_URL;

const TOKEN =
  process.env.KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.REDIS_REST_TOKEN;

const PRESENCE_KEY = "radio:presence";
const TOTAL_KEY = "radio:total";

// How long a heartbeat counts for. The client beats every 20s, so this
// tolerates one missed beat before dropping someone.
const WINDOW_SECONDS = 50;

async function redis(commands) {
  const res = await fetch(`${URL_}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commands)
  });
  if (!res.ok) throw new Error(`redis ${res.status}: ${await res.text()}`);
  return (await res.json()).map((r) => r.result);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (!URL_ || !TOKEN) {
    res.status(200).json({ enabled: false });
    return;
  }

  const url = new URL(req.url, `https://${req.headers.host}`);
  const id = String(url.searchParams.get("id") || "").slice(0, 40);
  const fresh = url.searchParams.get("new") === "1";

  if (!/^[A-Za-z0-9_-]{6,40}$/.test(id)) {
    res.status(400).json({ error: "bad id" });
    return;
  }

  const now = Math.floor(Date.now() / 1000);

  try {
    const commands = [
      ["ZADD", PRESENCE_KEY, String(now), id],
      ["ZREMRANGEBYSCORE", PRESENCE_KEY, "0", String(now - WINDOW_SECONDS)],
      ["ZCARD", PRESENCE_KEY],
      // Let the set expire on its own if the site goes quiet, so a stale
      // key cannot keep reporting phantom listeners.
      ["EXPIRE", PRESENCE_KEY, String(WINDOW_SECONDS * 4)]
    ];

    // Only the first beat of a session counts as a visit; the heartbeats
    // that follow must not inflate the total.
    if (fresh) commands.push(["INCR", TOTAL_KEY]);
    else commands.push(["GET", TOTAL_KEY]);

    const out = await redis(commands);

    res.status(200).json({
      enabled: true,
      live: Number(out[2]) || 0,
      total: Number(out[4]) || 0
    });
  } catch (err) {
    // A counter is decoration; never let it take the page down.
    res.status(200).json({ enabled: false, error: String(err.message || err) });
  }
}
