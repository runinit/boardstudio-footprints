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
  const trackpoint = name === "infused-kim/trackpoint_mount";
  const conditional = name === "ceoloide/switch_choc_v1_v2";
  const bossVariant =
    name === "ceoloide/reset_switch_smd_side"
      ? "${KIPRJMOD}/models/boardstudio/kicad/Panasonic_EVQPUL_EVQPUC.step"
      : null;
  return `${source}\n;module.exports = ((original) => {
    const defaults = ${JSON.stringify(values)};
    const bossVariant = ${JSON.stringify(bossVariant)};
    return {
      ...original,
      params: {...original.params, ...defaults},
      body: p => {
        // The bundled extension crosses the PCB with a 5 mm outer diameter.
        const extensionDiameter = 5;
        if (${trackpoint} && p.drill < extensionDiameter
          && p.tp_extension_3dmodel_filename === defaults.tp_extension_3dmodel_filename
          && !p.tp_extension_3dmodel_xyz_scale
          && !p.tp_extension_3dmodel_xyz_rotation
          && !p.tp_extension_3dmodel_xyz_offset) {
          throw new Error('The bundled trackpoint extension requires a center drill of at least 5 mm. Select a compatible extension model or drill size.');
        }
        if (${conditional} && !p.choc_v1_support) {
          p = {...p};
          for (const key of Object.keys(defaults)) {
            if (p[key] === defaults[key]) { p[key] = ''; }
          }
        }
        if (bossVariant && p.include_bosses && p.reset_switch_3dmodel_filename === defaults.reset_switch_3dmodel_filename) {
          p = {...p, reset_switch_3dmodel_filename: bossVariant};
        }
        return original.body(p);
      }
    };
  })(module.exports);\n`;
}
