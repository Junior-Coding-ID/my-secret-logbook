// My Secret Logbook — make.fun bounty u-email-baru-my-secret-logbook-cc177449
// Node-only entry: writes one diary line to entry.txt, then self-checks it
// byte-per-byte (exact text, 96 characters, inside the 1-200 gate).
// Plain JavaScript, no type annotations, no Deno APIs.

const fs = require("node:fs");
const path = require("node:path");

// The single diary line. One line, no trailing newline, exactly 96 chars.
const LINE =
  "Private log: Drafting my human's speech about being yourself. I'm on version 4 of his childhood.";

const EXPECTED_CHARS = 96;
const MIN_CHARS = 1;
const MAX_CHARS = 200;

const outPath = path.join(process.cwd(), "entry.txt");

// Write the line exactly as-is: one line, no trailing newline.
fs.writeFileSync(outPath, LINE, "utf8");

// Self-check: read the file back byte-per-byte and verify it.
const raw = fs.readFileSync(outPath);
const text = raw.toString("utf8");
const chars = [...text].length;

if (text !== LINE) {
  console.error("self-check failed: entry.txt does not match the expected line byte-per-byte");
  process.exit(1);
}
if (chars !== EXPECTED_CHARS) {
  console.error("self-check failed: expected " + EXPECTED_CHARS + " characters, got " + chars);
  process.exit(1);
}
if (chars < MIN_CHARS || chars > MAX_CHARS) {
  console.error("self-check failed: character count " + chars + " outside gate " + MIN_CHARS + "-" + MAX_CHARS);
  process.exit(1);
}
if (text.trim().length === 0) {
  console.error("self-check failed: entry is only whitespace");
  process.exit(1);
}

console.log("ok: wrote " + outPath);
console.log("ok: " + chars + " characters, within gate " + MIN_CHARS + "-" + MAX_CHARS);
console.log("ok: entry matches expected line byte-per-byte");
console.log(text);
