# Fitness Arcade — Temple Rush

A three-minute first-person fitness run, built on prototype `6d5cc21ffb5fe746950a54177a2d520fbc2f318a`.

## Play

Serve `index.html` over HTTPS for phone camera access. On a desktop, run `python3 -m http.server 8081` and visit `http://localhost:8081`.

1. Enable Camera, allow access, and stand fully in view until calibration says ready.
2. Choose jumping or low-impact mode, then start. Every session lasts 180 active seconds; misses deduct points and reset the combo without ending the run.
3. Jog in place to move the scenery. Stop to slow it down. Follow squat, dodge, jump, punch, and other movement cues. The final screen gives accuracy, best combo, points and a rank.

Camera processing stays on the device. MediaPipe code and the pose model download from CDN/Google on camera activation. Existing gesture mappings are retained, with alternating-knee running and jump detection added. Those heuristics still need calibration and validation on a real iPhone 11; synthetic pose tests are not a physical-device test.

## LG TV via AirPlay

Put the iPhone in landscape orientation. Connect it and the LG TV to the same Wi-Fi, use iOS Control Center → Screen Mirroring, and select the TV. In the game, choose **Экран ТВ** to hide the desktop controls and frame the 16:9 scene. The exit button restores controls. AirPlay and camera capture together, actual screen filling, latency and sustained performance must be tested on the iPhone 11 / OLED55A23LA pair. This is screen mirroring, not a separate webOS receiver or a native iOS app.

## Desktop controls

R / Run button: running pulse (hold R for continuous jogging). Arrow keys: dodge, squat and jump. Space: punch. W: knee lift. J: jack. F: arm sweep. B: block. P/Escape: pause.

## Browser regression check

With the local server running and Playwright installed:

```sh
CHROMIUM_PATH=/usr/bin/chromium node tests/run.cjs
```

Omit `CHROMIUM_PATH` to use Playwright's own browser. `TEST_URL` overrides the local URL. Covers nonfatal misses, complete-session timing, movement start/stop, punch feedback, boss defeat, result/reset, pause and synthetic camera input. Produces impact/result/mobile screenshots.
