import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { bindDefaults, defaultModels } from "../src/defaultModels.mjs";

const source = new URL("../switch_mx.js", import.meta.url);
const before = createHash("sha256")
  .update(await readFile(source))
  .digest("hex");
assert.equal(
  defaultModels("ceoloide/switch_choc_v1_v2").switch_3dmodel_filename.endsWith(
    ".step",
  ),
  true,
);
const bound = bindDefaults(
  await readFile(new URL("../switch_choc_v1_v2.js", import.meta.url), "utf8"),
  "ceoloide/switch_choc_v1_v2",
);
assert.match(bound, /models\/boardstudio\/infused-kim\/Choc_V1_Switch\.step/);
assert.deepEqual(defaultModels("missing"), {});
const after = createHash("sha256")
  .update(await readFile(source))
  .digest("hex");
assert.equal(after, before);
