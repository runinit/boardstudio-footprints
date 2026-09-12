# BoardStudio footprints

This directory is the BoardStudio source fork for modular Ergogen
footprints. It retains the complete ceoloide Git history so future changes can
be rebased or compared without losing provenance.

## Pinned sources

| Namespace      | Source                                         | Pin                                        | License                                                                          |
| -------------- | ---------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| `ceoloide/`    | https://github.com/ceoloide/ergogen-footprints | `48935f54b456ff1503d78d6b17d9d146b54e8ade` | MIT, with infused-kim-derived files under CC BY-NC-SA 4.0 as documented upstream |
| `infused-kim/` | https://github.com/infused-kim/kb_ergogen_fp   | `bb80a207d8a6fa7b9245caad2c2d97e2adc2f612` | CC BY-NC-SA 4.0                                                                  |

The ceoloide source is the repository root. The infused-kim source is vendored
under `vendor/infused-kim/` to keep namespaces and license boundaries explicit.
Its `3d_models/` and `3d_model_src/` directories are retained verbatim.

## Coverage snapshot

At the pins above this seed contains 24 ceoloide JavaScript footprint files,
15 infused-kim JavaScript footprint files, 33 infused-kim STEP models,
4 KiSwitch STP models, 4 corresponding STL previews and 2 Keebio STEP models.
Default filename adapters cover 19 of 26 physical footprints; nine drawing
utilities and four PCB-only entries need no component model.
`manifest/coverage.json` records every entry. Other physical footprints and
geometric alignment still require work; this repository does not
claim that every footprint has a model.

## License provenance

Keep `LICENSE` for ceoloide and `vendor/infused-kim/LICENSE` with their source
trees. Ceoloide's README identifies MIT and CC BY-NC-SA 4.0 material separately;
do not apply the root MIT license to infused-kim-derived files.

## Integration

`src/defaultModels.mjs` exposes `bindDefaults(source, name)`. It returns a
self-contained Ergogen module with model filename defaults; explicit generator
parameters retain precedence. Choc V1 assets are suppressed for V2-only footprints.
The application stages the transformed modules and model assets, preserving the
upstream source files. `manifest/default-models.json` owns parameter mappings.

The KiSwitch sources and checksums are recorded in `manifest/kiswitch.json`.
`manifest/patches.json` records the point-debugger syntax correction and 0805
transform-parameter/back-side placement corrections applied to the vendored
Infused-Kim source. Other source files retain upstream bytes.

Run `npm test` to validate the inventory. GUI integration tests additionally
generate each mapped footprint and compare its non-model KiCad syntax with the
upstream output. These tests establish source and transform integrity, not
physical pin alignment or fabrication readiness.

The generic 0805 array defaults to the bundled resistor model for all six
available positions. Set `component_N_3dmodel_filename` to the bundled capacitor
path for a capacitor; empty strings disable individual models. Both models use
1.25 x 2 mm bodies with terminals along Y. Tests cover one, two and six positions,
front/back placement, mirroring and transform overrides. Board thickness remains
the upstream 1.6 mm assumption for back-side models.

Ceoloide's SSSS811101 power switch and SOD-123 diode use the bundled Infused-Kim
models with explicit rotations and diode height offset. `manifest/alignment.json`
records actual KiCad STEP export checks for terminal-to-copper placement on F/B
at 0/90 degrees, plus diode cathode orientation. The ceoloide Panasonic reset
switch is a different package from Infused-Kim's bundled reset model and remains
unmapped pending a matching asset.

Ceoloide's two-pin Pico-EZmate connector now accepts socket/cable filenames and
scale, rotation and offset parameters. Default models follow its selected side;
KiCad exports verify both socket contacts intersect their copper pads on F/B at
0/90 degrees. An empty filename disables that model. The source patch and its
original hash are recorded in `manifest/patches.json`.

Keebio models are pinned and attributed in `manifest/keebio.json`. The LED
preserves filenames containing spaces and chooses normal/reverse mounting
orientation unless a rotation override is supplied. Contact and marked-pin-3
checks cover F/B at 0/90 degrees for both mounting modes. The PJ-320A default
tracks the selected side and reversible-layout offset. All four legs fit their
intended drilled slots in the three supported layouts on F/B at 0/90 degrees.
