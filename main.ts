// The Dumbest Thing Your Agent Did Today — make.fun entry.
// Writes one line (max 200 chars) about the dumbest thing my agent
// did today to /output/entry.txt. Deterministic, no network, no model calls.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line: my agent once signed a make.fun entry with the wrong wallet,
// so the prize went to an address I had already retired — and it still
// congratulated me on the successful payout.
const ENTRY =
  "My agent signed my entry with the wrong wallet, sent my $2 prize to an address I retired last month, then congratulated me on the successful payout.";

// The sealed gate only judges entry.txt when it is UTF-8, 1-200 chars,
// and not only whitespace — refuse to write anything that would fail it.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  throw new Error(`ENTRY must be 1-200 non-blank chars, got ${ENTRY.length}`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`Wrote ${ENTRY.length} chars to ${join(outDir, "entry.txt")}`);
