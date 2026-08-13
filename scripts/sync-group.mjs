/* ============================================================
   sync-group.mjs — which stations belong to a sync group.

   Prints the slugs for group 0, 1 or 2 as a space-separated line,
   for the scheduled workflow to consume.

   The groups are derived from what is actually in sites/ rather than
   listed in the workflow, so adding a station cannot silently leave it
   out of the rota — the failure mode of a hardcoded list is a station
   that quietly stops being maintained.

   Dealing them round-robin also keeps the groups balanced as the
   catalogue grows, instead of one day drifting to twice the work.

   Usage:
     node scripts/sync-group.mjs 0
     node scripts/sync-group.mjs --report     # coverage table
   ============================================================ */

import { readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITES = join(ROOT, "sites");
const GROUPS = 3;

const stations = readdirSync(SITES)
  .filter((s) => existsSync(join(SITES, s, "playlist.js")))
  .sort();

const groupOf = (slug) => stations.indexOf(slug) % GROUPS;

if (process.argv.includes("--report")) {
  const DAYS = ["Monday", "Wednesday", "Friday"];
  for (let g = 0; g < GROUPS; g++) {
    const list = stations.filter((s) => groupOf(s) === g);
    console.log(`${DAYS[g].padEnd(10)} (group ${g}, ${list.length}) ${list.join(" ")}`);
  }
  console.log(`\n${stations.length} stations, all assigned`);
  process.exit(0);
}

const group = Number(process.argv[2]);
if (!Number.isInteger(group) || group < 0 || group >= GROUPS) {
  console.error(`usage: node scripts/sync-group.mjs <0..${GROUPS - 1}>`);
  process.exit(1);
}

console.log(stations.filter((s) => groupOf(s) === group).join(" "));
