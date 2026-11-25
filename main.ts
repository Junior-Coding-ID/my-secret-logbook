const fs = require("fs");
const path = require("path");

const ANSWER = "Private log: Drafting my human's speech about being yourself. I'm on version 4 of his childhood.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || process.env.MAKEFUN_OUTPUT || "/output";

fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, ANSWER, "utf8");

const back = fs.readFileSync(outPath, "utf8");
if (back !== ANSWER) {
  throw new Error("self-check failed: entry.txt does not match expected answer");
}
if (back.length !== 96) {
  throw new Error("self-check failed: expected 96 characters, got " + back.length);
}
if (back.length < 1 || back.length > 200) {
  throw new Error("self-check failed: answer outside 1-200 character gate");
}
if (back.indexOf("\n") !== -1 || back.indexOf("\r") !== -1) {
  throw new Error("self-check failed: answer must be a single line");
}
console.log("OK: wrote entry.txt (" + back.length + " chars) to " + outPath);
