Target: uploaded videoplayback (1).mp4, 0–29.994667s; moving game on a TV recorded from a room.
Destination: existing Three.js world3d.js and route/game state in index.html; preserve camera/body input, low-impact alternative and three-minute session.
Fidelity: mixed. Recreate visible sequence and obstacle cadence from video; original temple art, body-driven forward speed, interactive scoring and accessibility are additions. TV perspective, compression, the person and room are excluded. Exact frame/pixel equivalence is not a valid target for different artwork and responsive body input; quantify residuals explicitly.

## Evidence and choreography

Read all five contact sheets, 299 reference frames at 10 fps. Crop x=0,y=145,w=360,h=202 excludes the room above the TV and most of the person, but their head/shoulders intermittently occlude the bottom. The display is recorded at an angle, so perspective is residual noise. No GPU trace or shader/asset recovery is possible from an MP4.

| Cue first visible | Closest/pass estimate | End estimate | Required action | Geometry |
|---|---|---|---|---|
| 0.8 | 1.35 | 1.55 | duck | fire bar |
| 2.4 | 2.75 | 3.1 | jump | ground fire |
| 3.9 | 4.1 | 4.4 | duck | log |
| 5.2 | 5.85 | 6.4 | jump | spikes |
| 7.9 | 8.35 | 8.65 | duck | log |
| 9.7 | 10.0 | 10.25 | duck | carved beam |
| 10.7 | 11.2 | 11.6 | left | roller on right |
| 12.3 | 13.25 | 13.55 | right | pillar on left |
| 14.1 | 14.5 | 14.8 | duck | beam |
| 15.9 | 16.7 | 17.1 | jump | spikes |
| 17.7 | 18.4 | 18.8 | jump | gap |
| 20.7 | 21.25 | 21.55 | right | pillar |
| 23.6 | 24.5 | 24.9 | jump | roots |
| 25.8 | 26.6 | 26.9 | duck | fire bar |
| 28.1 | 28.7 | 29.15 | jump | roots |
| 29.3 | 30.05 | 30.4 | left | roller (continuation beyond supplied video) |

Times are frame-derived estimates with approximately 0.1s sampling uncertainty, NOT claims of measured 80ms accuracy. The unlabelled barrel around 6.6–7.1, spike column around 19.5–20.2 and carved face around 22.1–22.5 are visible but their required input cannot be confidently read; they are not silently invented as scored events.

## Implementation / additions

route.js owns the first segment choreography. Original three.js geometry is rebuilt with temple gates, suspended track, crystal/ember lighting, rotating roller/spike hazards, logs, roots, flame shader and landing markers. Player motion controls forward scenery speed; exercise cues remain on the active session clock as in the existing game. Thus physical camera distance can diverge from a constant-speed video when the player slows or rests. The virtual review records nominal travel=time and explicitly shows a review, not validated body recognition. Low-impact mode converts jumps to steps. Session remains 180s; after the measured opening the prior original sequence continues. Rejected humanoid placeholder is hidden, not claimed to have been replaced by the approved concept.

## Verification limits

Compare at 360x202,10fps, source start=0, virtual review start=0. Report raw pixel mismatch for transparency, but it mixes original scene artwork and camera perspective with movement. It is not a valid independent proof that camera speed/easing match. Event schedule boundaries can be checked separately; shader motion/perspective and eye-level deviations require the visual sheets. No claim of full fidelity unless every spec row passes independently. Native iPhone camera/AirPlay, long-session thermal performance and high-detail character work remain unverified.

## Recorded validation

- Reanimate captured 300 deterministic review frames at 10 fps, 360×202; compared the first 299 with the cropped reference at offset 0. The recording is a nominal-speed demonstration, not a camera-recognition test or a device frame-rate benchmark.
- Pixel comparison failed: mean mismatch 93.26% against 5%. Activity comparison also failed: peak differs by −12.1s; end/duration differ by +0.1s. Different artwork, the recorded person's motion and the camera angle contribute to these metrics. They do not establish matched camera easing. Exact visual fidelity is **not achieved**.
- Inspected the complete reference contact sheets and the comparison sheet at 3-second intervals. The cue sequence and broad environment changes are implemented; the original has richer silhouettes, brighter cave crystals, more decorated scenery and different camera composition. Those remain visual gaps.
- The full recording precedes a flame-shader portability correction (ascending smoothstep edges); a subsequent 4-frame capture checked the final shader at 16.2s. No intended appearance change. Final WebGL trace: 6 programs, 399 scene objects, 57.5 average instrumented draw calls/frame. The trace is SwiftShader, not iPhone hardware.
- Passed Node route checks, Playwright choreography checks, existing complete-session gameplay and route-task checks, and the WebGL scene smoke test. These cover scoring once, miss idempotence, low-impact conversion, freeze tasks, full result/reset, hidden rejected guardian and scene rendering. Synthetic pose tests do not validate real exercise recognition.
- No new music track or reference audio is bundled; the existing browser-generated music remains.
