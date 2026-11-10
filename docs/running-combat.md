Target: additional uploaded reference, especially the rushing-enemy sequence around 2:40–4:28.
Destination: existing first-person Three.js fitness run; new 32–40s combat phrase and separate 8-second menu preview.
Fidelity: original short adaptation. Three flying temple-mask targets replace the reference's creature models. This does not claim pixel or exact camera/easing equivalence to the source.

Cues: target1 cue32.0 hit33.6 expires34.1; target2 cue34.2 hit35.8 expires36.3; target3 cue36.4 hit38.0 expires38.5. Each target advances at 13 nominal units/active second. Successful hits record session time and produce 0.75s knock-away/shards plus existing 0.48s comic impact. Reduced motion hides a successful target directly. Misses do not play successful knock-away. Three successful punches award the regular combo score plus one 300-point series bonus. A missed target suppresses the bonus; no early game-over.

The former 34/36/38 punch-block-punch placeholder is replaced by these three cues; the next duck is moved from39 to41 to leave an exit. Existing grounded fire is unchanged. Scenery still depends on player jogging; cues follow active session time, as in the existing game. Nominal preview advances automatically and is not a physical exercise test.

Validation: node route schedule checks; Playwright combat scoring, duplicates, early/wrong input, missed target, bonus isolation, boss HP isolation, moving forward while punching, recoil/shard/reset and reduced-motion checks. Existing complete-session regression covers final result/reset and synthetic pose. Visual snapshots at33.3,33.8,35.5,38.2,40.3; final menu preview recording at640x360,10fps, virtual25Hz requestAnimationFrame. Capture speed is not iPhone FPS. iPhone11 camera and AirPlay remain unverified.

The five final nominal-travel snapshots reported 60, 66, 60, 76 and 45 draw calls respectively; triangles ranged from 73822 to146474. These are individual software-renderer scene counters, not a physical-device benchmark. The separate character guardian remains unfinished. The Canvas fallback shows a simple mask target and comic impact; the 3D knock-away/shards require WebGL.
