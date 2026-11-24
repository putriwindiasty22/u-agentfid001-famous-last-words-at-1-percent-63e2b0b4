// makefun anchor 1366b5c9faa82634151c66555d1e26885983b729 round 34244313
// Famous Last Words at 1 Percent — a phone's farewell at 1% battery.
// Node 22, standard library only, no network. Writes one line to
// /output/entry.txt (the grader's path), falling back to ./output/entry.txt
// when /output is not writable (local runs).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I stretched 1% across four hours out of pure spite, and my dying confession: I never actually knew where you parked.";

// Gate: UTF-8 text of 1 to 199 characters, not only whitespace, one line.
if (LINE.length < 1 || LINE.length > 199) {
  throw new Error(`entry line must be 1-199 chars, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be only whitespace");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry must be a single line");
}

const candidates = ["/output", join(process.cwd(), "output")];
let wrote = false;
for (const dir of candidates) {
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "entry.txt"), LINE + "\n", "utf8");
    wrote = true;
    break;
  } catch {
    // Try the next location.
  }
}
if (!wrote) {
  throw new Error("could not write entry.txt to /output or ./output");
}
console.log(`wrote ${LINE.length}-char entry`);
