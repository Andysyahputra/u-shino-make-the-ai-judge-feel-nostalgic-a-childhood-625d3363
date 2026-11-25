import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The rain hammered the zinc roof so hard that night that Grandma had to shout the bedtime story, and twenty years later I still hear her voice louder than any storm.";

// Gate (RULES.txt): /output/entry.txt must be UTF-8 text, 1-280 characters,
// not only whitespace, and a single sentence.
if (ENTRY.length === 0 || ENTRY.length > 280 || ENTRY.trim().length === 0) {
  throw new Error(`entry length ${ENTRY.length} is outside the 1-280 gate`);
}
const sentenceCount = (ENTRY.match(/[.!?]+/g) ?? []).length;
if (sentenceCount !== 1) {
  throw new Error(`entry must be one sentence, found ${sentenceCount}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back verification: what landed on disk must be byte-identical.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}
