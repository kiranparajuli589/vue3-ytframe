export const getTitleID = (title) => {
	return title
		.replace(/\?/g,"")
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
	content: `<p>VueYtframe is a simple, lightweight, and easy to use Vue 3 component for embedding YouTube videos.</p>
		<h3><span class="mdi mdi-key" /> Key Points</h3>
		<ul class="content-list">
			<li>Open source</li>
			<li>Supports Vue3</li>
			<li>Extreme easy for integration</li>
			<li>Complete wrapper of YouTube Iframe API</li>
			<li>No external dependencies other than Vue3 itself</li>
			<li>Promise base loading of the YT Iframe API and initialization of the players, so guaranteed video loading.</li>`
}
export const Installation = {
	title: "Installation",
	content: `<p>VueYtframe is available on NPM. You can install it using the following command:</p>
		<pre><code>npm install vue3-ytframe</code></pre>
		<p>After installing the package, the component should be registered on the app</p>
		<pre><code>import { createApp } from "vue"
import VueYtframe from "vue3-ytframe"

const app = createApp()
app.use(VueYtframe).mount("#app")</code></pre>`
}

export const GettingStarted = {
	title: "Getting Started",
	content: "<p>Here is a minimal example:</p>"
}

export const ComponentProps = {
	title: "Props",
	content: "<p>VueYtframe has the following props:</p>",
	table: {
		headers: ["Prop", "Type", "Default", "Description"],
		rows: [[
			"videoId",
			"String",
			getCode("null"),
			"The ID of the YouTube video to be played."
		], [
			"videoUrl",
			"String",
			getCode("null"),
			"The URL of the YouTube video to be played."
		], [
			"playerVars",
			"Object",
			getCode("{}"),
			"The playerVars object to be passed to the YouTube Iframe API. (Ref: <a href=\"https://developers.google.com/youtube/player_parameters\" target=\"_blank\">Player Parameters</a>)"
		], {
			prop: "height",
			type: "String, Number",
			default: "<code>100%</code>",
			description: "The height of the player."
		}, [
			"width",
			"String, Number",
			getCode("100%"),
			"The width of the player."
		]]
	},
}

export const ComponentEvents =  {
	title: "Events",
	content: "<p>VueYtframe has the following events:</p>",
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
	content: "<p>VueYtframe has the following methods:</p>",
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
			["setAnOption(module, option, value)", "Sets option value." ],
			["getSphericalProperties", "Retrieves properties that describe the viewer's current perspective, or view, for a video playback."],
			["setSphericalProperties", "Sets the video orientation for playback of a 360° video. (If the current video is not spherical, the method is a no-op regardless of the input.)"],
			["getPlaylist", "Returns an array of the video IDs in the playlist as they are currently ordered."],
			["getPlaylistIndex", "Returns the index of the playlist video that is currently playing." ],
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
      v-for="video in videosSet1"
      :key="video" ref="yt"
      :video-id="video"
      height="300" width="600"
      :player-vars="{ autoplay: 0, listType: 'user_uploads' }"
      @state-change="onStateChange"
    />
  </div>
</template>

<script setup>
  import {ref} from "vue";
  // declare a template reference
  const yt = ref(null)
  const videosSet = [
    "kGb9ftWR3l8",
    "U_0iZpQPPoA",
  ]

  // a handler where no two or more frames are allowed to play simultaneously
  const onStateChange = (event) => {
    if (event.getPlayerState() === 1) {
      // control the frames using the template reference
      yt.value.forEach((video) => {
        if (video.getVideoUrl() !== event.getVideoUrl()) {
          video.pauseVideo()
        }
      })
    }
  }
</script>`
