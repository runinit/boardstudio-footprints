import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { join } from "node:path";

const run = promisify(execFile);
const root = new URL("..", import.meta.url).pathname;
await run(process.execPath, ["scripts/inventory.mjs"], { cwd: root });
const manifest = JSON.parse(
  await readFile(join(root, "manifest/sources.json")),
);
assert.equal(Object.keys(manifest.footprints.ceoloide).length, 24);
assert.equal(Object.keys(manifest.footprints["infused-kim"]).length, 15);
assert.ok(
  Object.keys(manifest.footprints.ceoloide).every(
    (name) => !name.includes("vendor/"),
  ),
);
assert.ok(manifest.mappings.pcbOnly.includes("pads"));
assert.ok(!manifest.mappings.nonphysical.includes("pads"));
assert.equal(manifest.generatedAt, undefined);
