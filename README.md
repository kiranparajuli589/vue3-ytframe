<p align="center">
	<img src="./src/assets/youtube.svg" width="80">
</p>
<h1 align=center>Vue3 Ytframe</h1>
<p align=center>A fully-typed Vue 3 wrapper around the YouTube Iframe API.</p>
<p align="center">
<a href="https://www.npmjs.com/package/vue3-ytframe"><img src="https://img.shields.io/npm/v/vue3-ytframe.svg" alt="npm version"/> <img src="https://img.shields.io/npm/dm/vue3-ytframe.svg" alt="npm downloads"/></a>
<a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-3-brightgreen.svg" alt="Vue 3"/></a>
<img src="https://img.shields.io/badge/types-included-blue.svg" alt="TypeScript types included"/>
</p>

## Features

- 🧩 Single component that wraps the **entire** YouTube Iframe API (all methods & events)
- 🟦 **Ships TypeScript types** — typed props, events, and the player instance
- 🪶 Zero runtime dependencies beyond Vue 3 itself
- ⏳ Promise-based API loading, so the player is created only once YouTube is ready
- ♻️ Automatically destroys the player on unmount (no leaks)
- 📦 Ships ESM **and** CommonJS builds (Node SSR / `require()` friendly)

## Installation

```bash
npm install vue3-ytframe
# or: pnpm add vue3-ytframe / yarn add vue3-ytframe
```

Requires `vue` `^3.5` as a peer dependency.

## Usage

### Option A — register globally (plugin)

```ts
import { createApp } from "vue"
import VueYtframe from "vue3-ytframe"
import App from "./App.vue"

createApp(App).use(VueYtframe).mount("#app")
```

### Option B — register locally (named export)

```vue
<script setup lang="ts">
import { VueYtframe } from "vue3-ytframe"
</script>

<template>
	<VueYtframe video-id="kGb9ftWR3l8" :player-vars="{ autoplay: 0 }" />
</template>
```

### Controlling the player with a template ref

```vue
<script setup lang="ts">
import { ref } from "vue"
import { VueYtframe, type VueYtframeInstance } from "vue3-ytframe"

const yt = ref<VueYtframeInstance>()

function onReady() {
	yt.value?.playVideo()
}
</script>

<template>
	<VueYtframe ref="yt" video-id="kGb9ftWR3l8" @ready="onReady" />
</template>
```

## Props

| Prop         | Type              | Default   | Description                                              |
|--------------|-------------------|-----------|----------------------------------------------------------|
| `videoId`    | `string`          | `null`    | YouTube video ID. One of `videoId`/`videoUrl` required.  |
| `videoUrl`   | `string`          | `null`    | Full YouTube URL (parsed to an ID internally).           |
| `width`      | `number \| string`| `"100%"`  | Player width.                                            |
| `height`     | `number \| string`| `"100%"`  | Player height.                                           |
| `playerVars` | `object`          | `{}`      | [YouTube player parameters](https://developers.google.com/youtube/player_parameters). |

## Events

`ready`, `playing`, `paused`, `ended`, `stateChange`, `playbackQualityChange`,
`playbackRateChange`, `error`, `apiChange` — each emits the underlying
`YT.Player`. See the [Events docs](https://kiranparajuli589.github.io/vue3-ytframe/#/docs/ref=events).

## Methods

The full Iframe API surface is exposed on the component instance
(`playVideo`, `pauseVideo`, `seekTo`, `mute`, `setVolume`, `loadVideoById`, …).
The pure helper `getVideoIdFromYoutubeURL(url)` is also exported standalone.
See the [Methods docs](https://kiranparajuli589.github.io/vue3-ytframe/#/docs/ref=methods).

> Player methods throw a clear error if called before the `ready` event — wait
> for `ready` (or check the exposed `player` ref) before driving playback.

## SSR (Nuxt, Quasar, etc.)

`vue3-ytframe` ships a `.cjs` build, so Node SSR servers can `require()` it
without `ERR_REQUIRE_ESM`. The player itself uses the browser YouTube Iframe API
(`document`, `window`), so render it **client-only** (e.g. Quasar's `QNoSsr`,
Nuxt's `<ClientOnly>`).

## Links

- 📖 [Documentation](https://kiranparajuli589.github.io/vue3-ytframe/#/docs/ref=)
- 🎛️ [Playground](https://kiranparajuli589.github.io/vue3-ytframe/#/playground)
- 🧪 [Usage examples](https://kiranparajuli589.github.io/vue3-ytframe/#/docs/ref=examples)
- 📝 [Changelog](./CHANGELOG.md)

## Contributing

```bash
pnpm install      # install deps
pnpm dev          # run the docs/playground site
pnpm test         # run the unit tests
pnpm typecheck    # vue-tsc type checking
pnpm lint         # eslint
pnpm build        # build the library + docs
```

Issues and PRs are welcome at the
[GitHub repository](https://github.com/kiranparajuli589/vue3-ytframe).

## License

[GPL-3.0](./LICENSE) © Kiran Parajuli
