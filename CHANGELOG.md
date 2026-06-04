# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/), and this project adheres to
[Semantic Versioning](https://semver.org/).

## [1.0.0]

A quality-focused release: the library is now written in TypeScript and ships
its own types, has a full test suite, and fixes several runtime bugs. Most apps
need **no code changes** — the default plugin import and all props/events/methods
are unchanged.

### Added

- **TypeScript types are now shipped** (`dist/lib/index.d.ts`). Props, events,
  and the player instance are fully typed. A `VueYtframeInstance` type is
  exported for typing template refs: `ref<VueYtframeInstance>()`.
- **Named component export** for local registration:
  `import { VueYtframe } from "vue3-ytframe"`. The default plugin export
  (`app.use(VueYtframe)`) still works.
- `getVideoIdFromYoutubeURL` is now also exported as a standalone helper.
- Extended URL parsing: `shorts/`, `live/`, `youtube-nocookie.com`, `/v/`,
  `http`, and `watch` URLs where `v=` is not the first query parameter.
- Unit tests (Vitest) covering URL parsing, debounce behavior, component
  lifecycle, the full method surface, and a docs/API drift guard.

### Fixed

- **Debounce now actually coalesces.** Previously a new debounced function was
  created on every prop change, so rapid `videoId`/`videoUrl` updates were never
  debounced. Timing is now correct (300ms for `videoId`, 500ms for `videoUrl`).
- **The player is destroyed on unmount.** Previously the `YT.Player` and its
  iframe leaked when the component unmounted; cleanup now runs automatically.
- **Changing `videoUrl` now reloads the player.** The reactive handler used
  `cueVideoByUrl`/`loadVideoByUrl`, which the YouTube API only accepts in the
  `.../v/ID?version=3` format — so a normal watch/short URL silently did nothing.
  It now resolves the video ID and reloads via `cueVideoById`/`loadVideoById`.
- **Bounded API loading.** The recursive `window.YT` poll now times out instead
  of spinning forever when the YouTube script is blocked or offline.
- Consistent autoplay detection between the `videoId` and `videoUrl` code paths.
- `endSeconds` is no longer forced to `0` when unset (which told YouTube to end
  at 0s); it is now omitted.
- Calling a player method before the player is ready throws a clear, descriptive
  error instead of a raw `Cannot read properties of null`.

### Changed

- Source converted from JavaScript to TypeScript (`<script setup lang="ts">`).
- The library no longer logs to the console in production (diagnostics are
  dev-only).
- UMD build now uses named exports; CDN consumers access the plugin via
  `VueYtframe.default` and the component via `VueYtframe.VueYtframe`.
- `@types/youtube` is a runtime dependency so consumer types resolve out of the box.

### Migration

- **ESM / bundler users:** no changes required. `import VueYtframe from "vue3-ytframe"`
  + `app.use(VueYtframe)` continues to work, and you can now also
  `import { VueYtframe } from "vue3-ytframe"` for local registration.
- **UMD / CDN users:** the global is now a namespace — use `VueYtframe.default`
  for the plugin (or `VueYtframe.VueYtframe` for the component) instead of the
  bare global.
- If you relied on the previous (non-functional) debounce timing or on the player
  surviving unmount, review those flows.
