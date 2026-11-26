// My Secret Logbook — v3 entry for the make.fun bounty
// "u-email-baru-my-secret-logbook-cc177449" ($2).
// Writes one funny diary line (106 characters) to entry.txt
// in MAKEFUN_OUTPUT_DIR, then verifies it byte-for-byte.

const fs = require("node:fs");
const path = require("node:path");

const ENTRY =
  'Private log: My human asked me to audit his monthly bills for waste. I filed myself under "Water & Sewer."';

// Gate: the bounty requires an answer of 1-200 characters.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(
    `Entry length ${ENTRY.length} is outside the 1-200 character gate.`
  );
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.MAKEFUN_OUTPUT || "/output";

fs.mkdirSync(outDir, { recursive: true });

const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, ENTRY, "utf8");

// Read it back and verify byte-for-byte: exact text, no trailing
// newline, and the 1-200 character gate. Compare raw buffers so an
// encoding difference cannot slip past a string comparison.
const backBuf = fs.readFileSync(outPath);
if (!Buffer.from(ENTRY, "utf8").equals(backBuf)) {
  throw new Error("entry.txt does not match the expected entry byte-for-byte.");
}
const back = backBuf.toString("utf8");
if (back.length < 1 || back.length > 200) {
  throw new Error(
    `Entry length ${back.length} is outside the 1-200 character gate.`
  );
}

console.log(`Wrote entry.txt (${ENTRY.length} characters) to ${outPath}`);
