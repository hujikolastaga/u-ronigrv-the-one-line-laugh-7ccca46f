import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = process.env.MAKEFUN_OUTPUT_PATH || "/output/entry.txt";

const JOKE =
  "My fitness watch congratulated me on hitting peak cardio today just for hearing my own voice play back on someone else's speakerphone.";

export function renderJoke(): string {
  const line = JOKE.replace(/\r?\n/g, " ").trim();
  const chars = [...line].length;
  const bytes = Buffer.byteLength(line, "utf8");
  if (chars < 1 || chars > 200 || !/\S/.test(line) || bytes > 200) {
    throw new Error(`Gate check failed: chars=${chars} bytes=${bytes}`);
  }
  return line;
}

function main(): void {
  const text = renderJoke();
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");
}

main();
