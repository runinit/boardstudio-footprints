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
4 KiSwitch STP models, 4 corresponding STL previews 2 Keebio STEP models 1 Foostan OLED assembly and 3 KiCad STEP assets.
Default filename adapters cover 22 of 26 physical footprints; nine drawing
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

The SSD1306 default uses Foostan's OLED/socket/header assembly at the pin recorded
in `manifest/foostan.json`, retaining its MIT license. It translates the model's
header origin to the footprint's display-center origin and mirrors the pin order
on B. Eight KiCad checks cover its four mounting shafts on F/B at 0/90 degrees
in single-sided and reversible layouts. `qa/oled-pin-labels.png` shows the model's
etched pin labels used to verify signal order.

Panasonic EVQPU reset models come from the current KiCad package library at the
pin in `manifest/kicad.json`, with its CC-BY-SA license and design exception.
The default selects the boss/no-boss variant from `include_bosses`; explicit
filenames remain authoritative. Eight KiCad checks cover contacts and locating
bosses on F/B at 0/90 degrees.

JST PH S2B-PH-K now uses the pinned KiCad model, centered and oriented for
the selected side. Eight exported cases verify entry shafts and housing placement.
The model includes unloaded bent pins: full-depth rigid containment is not a
physical insertion test. The manufacturer's reference drill range is 0.7–0.8 mm,
with a larger-hole advisory for hard PCBs; existing 0.75 mm drills are unchanged.
See `manifest/kicad.json` for the datasheet and fit limitation.

The ceoloide nice!nano default now follows `side` and `reverse_mount` and
uses the bundled library's 5 mm socket spacing. Eight KiCad-exported checks
verify 24 main hole centers, module clearance and MCU package orientation.
Explicit XYZ transforms still override the default. Optional extra pins and
physical socket/header solids are outside this check's scope.

The ceoloide Choc V1 hotswap default places the switch and cap opposite the
socket side. Model transforms use `pcb_thickness` (1.6 mm by default) and
a 6.6 mm keycap seating offset; match `pcb_thickness` to the board when
changing board thickness. 32 exported cases verify switch pins and socket contacts on F/B at 0/90
degrees, including single/reversible, alternate pad placement and plated holes.
Solder-only and Choc V2 remain outside this check. Explicit model transforms
remain authoritative.

The ceoloide MX hotswap default places the switch opposite the socket side,
correcting the downloaded housing and socket datums. Match `pcb_thickness`
(default 1.6 mm) to the board. 32 exported cases verify switch pins and socket
contacts on F/B at 0/90 degrees, including reversible layouts, alternate pad
placement and plated holes. Explicit transforms remain authoritative.
Solder-only and other board thicknesses remain unverified.

The PTS636 THT reset footprint follows the manufacturer's 6.4 mm hole pitch
and 1.2 mm drills. Pads are 1.9 mm to retain the previous 0.35 mm annular ring.
This changes PCB geometry from upstream's 6.5 mm pitch and 1.0 mm drills;
pad numbers and nets remain unchanged. A matching 3D default is still pending.

### Supermini NRF52840

The Tsuki model (MIT, pinned in `manifest/tsuki.json`) is assigned by default.
The assembly assumes a 5 mm socket gap and 1.6 mm module PCB. Reversible
footprints mount the module on the back; explicit model transforms override
these defaults. `pcb_thickness` defaults to 1.6 mm and controls the front-layer
model offset for that back-mounted assembly.

Forty KiCad-exported cases verify main-hole alignment, chip/USB orientation,
and direct/jumper net paths across both footprint layers, 0/90 degree rotation,
normal/reverse mounting and jumper variants. Optional model holes differ by
0.06225 mm from the footprint. Nominal 0.64 mm square pins fit both 1 mm hole
sets with one 0.03112 mm header translation, leaving 0.01712 mm clearance.
This is a nominal geometry check, not manufactured-tolerance or socket proof.

### nice!view default assembly

The ceoloide nice!view default uses KiCad's 8.5 mm vertical five-pin socket.
Its tails fit the existing 1 mm PCB holes. The previous generic 5 mm socket
model had 0.8 by 0.65 mm rectangular tails that did not fit those holes.
The default display/header elevation is therefore 3.5 mm higher than the
original 5 mm socket assembly. Check enclosure clearance when adopting it.
Explicit display, header and socket transforms remain available for other
hardware. The footprint's copper, drill sizes and nets are unchanged.

The infused-kim nice!view default uses the same 8.5 mm socket and matching
display/header elevations. Its `display_3dmodel_side` override is preserved,
including reversible back mounting. Unlike ceoloide, this upstream footprint
provides jumper pads without connecting tracks: route sockets to their local
jumper pads before fabrication. The model correction does not add copper.

### Infused-kim nice!nano socket assembly

The controller now uses two KiCad 8.5 mm sockets at 15.24 mm row spacing.
`scripts/assembleNanoSockets.py` positions unchanged copies of the pinned
single-row source; provenance and translations are in `manifest/kicad.json`.
The paired model retains KiCad's license and model exception.

The MCU/header assembly is 3.5 mm higher than the original 5 mm socket
assembly. Model-origin offsets also correct MCU/header hole alignment.
Hole sizes and centers remain unchanged; review enclosure clearance.
Custom jumper pads now rotate with the footprint, fixing disconnected
socket-to-jumper paths at rotated placements.

### Two-pin Molex polarity conventions

The two libraries use different default nets for the same connector geometry:
ceoloide assigns pin 1 to BAT_N and pin 2 to BAT_P; infused-kim assigns pin 1
to RAW and pin 2 to GND. The model bindings preserve those definitions.
Choose or override nets to match the intended cable pinout; swapping library
entries does not preserve default polarity.

### Gateron KS-33 default

The KS-27/KS-33 footprint defaults to the KS-33 Low Profile 2.0 switch
from GilDev/GDEK, retained unchanged under that repository's CERN-OHL-S-2.0
license. Source commit and hashes are in `manifest/gdek.json`. This default
represents KS-33; it does not establish KS-27 body or travel equivalence.
Hotswap mounts the switch opposite the footprint side; solder-only mounts
it on the footprint side. Automatic transforms use the model's four planar
feet and `pcb_thickness` (default 1.6 mm). Explicit XYZ overrides win.
Sixteen native/KiCad candidate exports verified both mounting modes, sides,
0/90-degree rotations, and reversible variants against actual drill holes
and input/output nets. The socket model is not supplied by this asset.
