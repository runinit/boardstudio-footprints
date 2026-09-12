import { readFile } from "node:fs/promises";

const defaults = JSON.parse(
  await readFile(new URL("../manifest/default-models.json", import.meta.url)),
);

export const defaultModels = (name) => structuredClone(defaults[name] || {});

// Keep upstream geometry unchanged; generator parameter overrides still win.
export function bindDefaults(source, name) {
  const values = defaultModels(name);
  if (!Object.keys(values).length) {
    return source;
  }
  const conditional = name === "ceoloide/switch_choc_v1_v2";
  return `${source}\n;module.exports = ((original) => {
    const defaults = ${JSON.stringify(values)};
    return {
      ...original,
      params: {...original.params, ...defaults},
      body: p => {
        if (${conditional} && !p.choc_v1_support) {
          p = {...p};
          for (const key of Object.keys(defaults)) {
            if (p[key] === defaults[key]) { p[key] = ''; }
          }
        }
        return original.body(p);
      }
    };
  })(module.exports);\n`;
}
