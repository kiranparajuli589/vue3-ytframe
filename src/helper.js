export const getTitleID = (title) => {
	return title
		.replace(/\?/g, "")
		.replace(/\s/g, "-").toLowerCase()
}

const getCode = (code) => {
	return `<code>${code.toString().trim()}</code>`
}

export const MinimalExample = `<template>
  <div class="player">
    <VueYtframe
      video-id="kGb9ftWR3l8"
      :player-vars="{ autoplay: 0, listType: 'user_uploads' }"
    />
  </div>
</template>

<style>
.player {
  height: 400px;
  max-width: 600px;
}
</style>`

export const WhyVueYtframe = {
	title: "Why VueYtframe?",
	content: `<p>VueYtframe is a <strong>fully typed</strong>, lightweight Vue 3 component that wraps the entire <a href="https://developers.google.com/youtube/iframe_api_reference" target="_blank" rel="noopener noreferrer">YouTube Iframe API</a> — every official method and event, without re‑inventing playback logic in your app.</p>
		<p>Version <strong>1.0.0</strong> is a quality-focused release: the library is written in TypeScript, ships its own types, includes a full test suite, and fixes several runtime edge cases. Existing integrations keep working — the default plugin import and all props, events, and methods are unchanged.</p>
		<h3><span class="mdi mdi-key" /> Why choose it</h3>
		<ul class="content-list [&>li>strong]:text-accent">
			<li><strong>Complete API surface</strong> — Exposes the full Iframe API on the component instance (<code>playVideo</code>, <code>seekTo</code>, playlists, volume, 360° spherical props, and more).</li>
			<li><strong>TypeScript built in</strong> — Typed props, events, and <code>VueYtframeInstance</code> for template refs; <code>@types/youtube</code> resolves for consumers automatically.</li>
			<li><strong>Zero runtime bloat</strong> — No dependencies beyond Vue 3 itself (<code>vue ^3.5</code> peer).</li>
			<li><strong>Reliable loading</strong> — Promise-based YouTube script loading with a bounded timeout when the API is blocked or offline.</li>
			<li><strong>Lifecycle-safe</strong> — Destroys the player on unmount (no iframe leaks) and debounces <code>videoId</code> / <code>videoUrl</code> changes correctly.</li>
			<li><strong>Flexible URLs</strong> — Accepts watch, embed, Shorts, live, and <code>youtube-nocookie.com</code> URLs; <code>getVideoIdFromYoutubeURL</code> is also exported as a standalone helper.</li>
			<li><strong>Dual package builds</strong> — ESM and CommonJS so bundlers and Node SSR (<code>require()</code>) both work; render the player client-only in SSR apps.</li>
			<li><strong>Two registration styles</strong> — Global plugin (<code>app.use</code>) or local <code>import { VueYtframe }</code>.</li>
			<li><strong>Developer-friendly errors</strong> — Clear messages when player methods are called before <code>ready</code>, instead of opaque null errors.</li>
			<li><strong>Tested</strong> — Vitest coverage for URL parsing, debounce, lifecycle, the full method surface, and docs/API drift guards.</li>
		</ul>`
}
export const Installation = {
	title: "Installation",
	content: `<p>VueYtframe is published on npm as <code>vue3-ytframe</code>. Requires <code>vue ^3.5</code> as a peer dependency.</p>
		<pre><code>npm install vue3-ytframe
# or: pnpm add vue3-ytframe
# or: yarn add vue3-ytframe</code></pre>
		<p>Types are included (<code>dist/lib/index.d.ts</code>) — no separate <code>@types</code> package needed.</p>
		<h3>Option A — register globally (plugin)</h3>
		<pre><code>import { createApp } from "vue"
import VueYtframe from "vue3-ytframe"
import App from "./App.vue"

createApp(App).use(VueYtframe).mount("#app")</code></pre>
		<h3>Option B — register locally (named export)</h3>
		<pre><code>import { VueYtframe } from "vue3-ytframe"</code></pre>
		<p>Use <code>&lt;VueYtframe&gt;</code> in the template of any component that imports it.</p>
		<blockquote class="doc-note">
			<p><span class="mdi mdi-information-outline" /> <strong>SSR (Nuxt, Quasar, etc.)</strong></p>
			<p>The package ships <strong>ESM and CommonJS</strong> builds, so Node SSR servers can <code>require()</code> it without <code>ERR_REQUIRE_ESM</code>.</p>
			<p>The player still depends on the browser YouTube Iframe API (<code>document</code>, <code>window</code>). Render it <strong>client-only</strong> — for example Nuxt <code>&lt;ClientOnly&gt;</code> or Quasar <code>QNoSsr</code>.</p>
		</blockquote>
		<blockquote class="doc-note">
			<p><span class="mdi mdi-information-outline" /> <strong>UMD / CDN</strong></p>
			<p>The global is a namespace in 1.0.0: use <code>VueYtframe.default</code> for the plugin or <code>VueYtframe.VueYtframe</code> for the component.</p>
		</blockquote>`
}

export const GettingStarted = {
	title: "Getting Started",
	content: `<p>After <a href="#installation">installation</a>, drop a player into your template. Provide either <code>video-id</code> or <code>video-url</code> (watch, Shorts, live, and embed URLs are parsed automatically).</p>
		<p>Call player methods only after the <code>ready</code> event (or once your template ref’s player is non-null). Methods throw a clear error if invoked too early.</p>
		<p>Minimal example:</p>`
}

export const TypeScriptRefExample = `<script setup lang="ts">
import { ref } from "vue"
import { VueYtframe, type VueYtframeInstance } from "vue3-ytframe"

const yt = ref<VueYtframeInstance>()

function onReady() {
  yt.value?.playVideo()
}
</script>

<template>
  <VueYtframe
    ref="yt"
    video-id="kGb9ftWR3l8"
    :player-vars="{ autoplay: 0 }"
    @ready="onReady"
  />
</template>`

export const ComponentProps = {
	title: "Props",
	content: "<p>VueYtframe has the following props:</p>",
	table: {
		headers: ["Prop", "Type", "Default", "Description"],
		rows: [[
			"videoId",
			"String",
			getCode("null"),
			"YouTube video ID. One of <code>videoId</code> or <code>videoUrl</code> is required."
		], [
			"videoUrl",
			"String",
			getCode("null"),
			"Full YouTube URL (watch, Shorts, live, embed, nocookie). Parsed to an ID internally."
		], [
			"playerVars",
			"Object",
			getCode("{}"),
			"The playerVars object to be passed to the YouTube Iframe API. (Ref: <a href=\"https://developers.google.com/youtube/player_parameters\" target=\"_blank\" rel=\"noopener noreferrer\">Player Parameters</a>)"
		], [
			"height",
			"String, Number",
			getCode("100%"),
			"The height of the player."
		], [
			"width",
			"String, Number",
			getCode("100%"),
			"The width of the player."
		]]
	},
}

export const ComponentEvents = {
	title: "Events",
	content: `<p>VueYtframe forwards YouTube Iframe API player events. Each handler receives the underlying <code>YT.Player</code> instance as its argument (same object you would get in a raw Iframe API callback).</p>
		<p>See the <a href="https://developers.google.com/youtube/iframe_api_reference#Events" target="_blank" rel="noopener noreferrer">official Events reference</a> for semantics and timing.</p>`,
	table: {
		headers: ["Event", "Description"],
		rows: [[
			"ready",
			"Emitted when the player is ready to be used."
		], [
			"stateChange",
			"Emitted when the player's state changes."
		], [
			"error",
			"Emitted when the player encounters an error."
		], [
			"apiChange",
			"Emitted to indicate that the player has loaded (or unloaded) a module with exposed API methods."
		], [
			"playbackQualityChange",
			"Emitted when the player's playback quality changes."
		], [
			"playbackRateChange",
			"Emitted when the player's playback rate changes."
		], [
			"playing",
			"Emitted when the player starts playing."
		], [
			"paused",
			"Emitted when the player pauses."
		], [
			"ended",
			"Emitted when the player ends playing."
		]]
	},
	ytDocsLink: "https://developers.google.com/youtube/iframe_api_reference#Events"
}
export const ComponentMethods = {
	title: "Methods",
	content: `<p>Every method below is available on a <code>&lt;VueYtframe&gt;</code> template ref after <code>ready</code>. The pure helper <code>getVideoIdFromYoutubeURL(url)</code> is also exported from the package entry for use outside the component.</p>
		<p>See the <a href="https://developers.google.com/youtube/iframe_api_reference#Functions" target="_blank" rel="noopener noreferrer">official Functions reference</a> for parameter details.</p>`,
	table: {
		headers: ["Method", "Description"],
		rows: [
			["playVideo", "Plays the currently loaded/cued video."],
			["pauseVideo", "Pauses the currently playing video."],
			["stopVideo", "Stops and cancels loading of the current video."],
			["seekTo(seconds: Number, allowSeekAhead: Boolean)", "Seeks to a specified time in the video."],
			["nextVideo", "Plays the next video in the playlist."],
			["previousVideo", "Plays the previous video in the playlist."],
			["playVideoAt(index: Number)", "Loads and plays the specified video in the playlist."],
			["mute", "Mutes the player."],
			["unMute", "Unmutes the player"],
			["isMuted", "Returns true if the player is muted, false if not"],
			["setVolume(volume: Number)", `Sets the volume. Accepts an integer between ${getCode(0)} and ${getCode(100)}`],
			["getVolume", "Returns the player's current volume, an integer between 0 and 100. Note that it will return the volume even if the player is muted."],
			["setSize(width: Number, height: Number)", "Sets the size in pixels of the iframe that contains the player."],
			["setShuffle(shufflePlaylists: Boolean)", "Indicates whether a playlist's videos should be shuffled so that they play back in an order different from the one that the playlist creator designated"],
			["setLoop(loopPlaylists: Boolean)", "Indicates whether the video player should continuously play a playlist or if it should stop playing after the last video in the playlist ends. The default behavior is that playlists do not loop."],
			["getDuration", "Returns the duration in seconds of the currently playing video. Note that it will return 0 until the video's metadata is loaded, which normally happens just after the video starts playing."],
			["getCurrentTime", "Returns the elapsed time in seconds since the video started playing."],
			["getVideoEmbedCode", "Returns the embed code for the currently loaded/playing video."],
			["getVideoUrl", "Returns the YouTube.com URL for the currently loaded/playing video."],
			["getVideoLoadedFraction", "Returns a number between 0 and 1 that specifies the percentage of the video that the player shows as buffered."],
			["getPlayerState", "Returns the state of the player. Possible values are: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)."],
			["getPlaybackRate", "Retrieves the playback rate of the current video."],
			["setPlaybackRate(suggestedRate: Number)", "Sets the suggested playback rate for the current video."],
			["getAvailablePlaybackRates", "Returns the set of playback rates in which the current video is available."],
			["getOptions", "Retrieves an array of module names for which you can set player options."],
			["getAnOption(module, option)", "Retrieves a specific option."],
			["setAnOption(module, option, value)", "Sets option value."],
			["getSphericalProperties", "Retrieves properties that describe the viewer's current perspective, or view, for a video playback."],
			["setSphericalProperties", "Sets the video orientation for playback of a 360° video. (If the current video is not spherical, the method is a no-op regardless of the input.)"],
			["getPlaylist", "Returns an array of the video IDs in the playlist as they are currently ordered."],
			["getPlaylistIndex", "Returns the index of the playlist video that is currently playing."],
			["getIframe", "Returns the DOM node for the embedded iframe."],
			["destroy", "Removes the iframe containing the player."],
			["loadVideoById({videoId: String, startSeconds: Number, endSeconds: Number})", "Loads and plays the specified video."],
			["cueVideoById({videoId: String, startSeconds: Number, endSeconds: Number})", "Loads the specified video's thumbnail and prepares the player to play the video."],
			["loadVideoByUrl({mediaContentUrl: String, startSeconds: Number, endSeconds: Number})", "Loads and plays the specified video."],
			["cueVideoByUrl({mediaContentUrl: String, startSeconds: Number, endSeconds: Number})", "Loads the specified video's thumbnail and prepares the player to play the video."],
			["cuePlaylist(playlist:String|Array, index:Number, startSeconds:Number)", "Queues the specified playlist."],
			["loadPlaylist(playlist:String|Array, index:Number, startSeconds:Number)", "Loads the specified playlist and plays it."],
			["getVideoIdFromYoutubeURL(url: String)", "Returns the YouTube video ID from the provided URL if found, null if not."],
		]
	},
	ytDocsLink: "https://developers.google.com/youtube/iframe_api_reference#Functions"
}

export const ExampleSection = {
	title: "Examples"
}

export const Example1 = `<template>
  <div class="player-page">
    <VueYtframe
      v-for="video in videos"
      :key="video"
      ref="yt"
      :video-id="video"
      height="300"
      width="600"
      :player-vars="{ autoplay: 0, listType: 'user_uploads' }"
      @state-change="onStateChange"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"

const yt = ref([])
const videos = ["kGb9ftWR3l8", "U_0iZpQPPoA"]

// Only one player may play at a time
const onStateChange = (player) => {
  if (player.getPlayerState() === 1) {
    yt.value.forEach((instance) => {
      if (instance.getVideoUrl() !== player.getVideoUrl()) {
        instance.pauseVideo()
      }
    })
  }
}
</script>`
