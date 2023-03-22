<template>
	<div class="docs">
		<DocsNav />

		<div class="docs-content">
			<section v-for="(item, index) in docs" :key="index">
				<h2 :id="getTitleID(item.title)">{{item.title}}</h2>
				<div v-html="item.content" />
				<table v-if="item.table">
					<thead>
					<tr>
						<th v-for="(header, index) in item.table.headers" :key="index">{{header}}</th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="(row, index) in item.table.rows" :key="index">
						<td v-for="(cell, index) in row" :key="index" v-html="cell"/>
					</tr>
					</tbody>
				</table>
			</section>
			<section>
				<h2 id="examples">
					Examples
				</h2>
				<div>
					<pre><code></code></pre>
				</div>
			</section>
		</div>
	</div>
</template>
<script setup>
import DocsNav from "../components/DocsNav.vue"
import {onMounted, ref, watch} from "vue"
import hljs from "highlight.js"
import {useRouter} from "vue-router"
import {getTitleID} from "../helper.js"

const appBarHeight = ref(0)
const footerHeight = ref(0)

onMounted(() => {
	waitTillAppBarAndFooterLoads()
		.then(() => {
			handleResize()
			window.addEventListener("resize", handleResize)
			hljs.highlightAll()
			initializeCodeCopy()
			initializeHeaderRefs()
		})
})

function handleResize() {
	appBarHeight.value = `${document.querySelector(".app-bar").offsetHeight.toString()}px`
	footerHeight.value = `${document.querySelector(".footer").offsetHeight.toString()}px`
}

function waitTillAppBarAndFooterLoads() {
	return new Promise((resolve) => {
		let appBar = document.querySelector(".app-bar")
		let footer = document.querySelector(".footer")
		if (appBar && footer) {
			resolve()
		} else {
			setTimeout(() => {
				waitTillAppBarAndFooterLoads()
					.then(() => {
						resolve()
					})
			}, 100)
		}
	})
}

const initializeCodeCopy = () => {
	const codeBlocks = document.querySelectorAll("pre code")
	codeBlocks.forEach((codeBlock) => {
		const copyButton = document.createElement("button")
		copyButton.classList.add("copy-button")
		copyButton.innerHTML = "<span class=\"mdi mdi-content-copy\" />"
		codeBlock.parentNode.appendChild(copyButton)
		copyButton.addEventListener("click", () => {
			navigator.clipboard.writeText(codeBlock.innerText)
		})
	})
}

const initializeHeaderRefs = () => {
	const headers = document.querySelectorAll(".docs-content h2")
	headers.forEach((header) => {
		const link = document.createElement("a")
		link.classList.add("header-link")
		link.innerHTML = "<span class=\"mdi mdi-link-variant\" />"
		link.href = `/#/docs/ref=${getTitleID(header.innerText)}`
		header.appendChild(link)
	})
}

const {currentRoute} = useRouter()

// watch route param and scroll to the header
watch(() => currentRoute.value, (val) => {
	if (val.params.ref) {
		const header = document.getElementById(`${val.params.ref}`)
		if (header) {
			header.scrollIntoView({behavior: "smooth", block: "center"})
		}
	}
})

const docs = [
	{
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
	},
	{
		title: "Getting Started",
		content: `<p>VueYtframe is available on NPM. You can install it using the following command:</p>
		<pre><code>npm install vue-ytframe</code></pre>
		<p>After installing the package, the component should be registered on the app</p>
		<pre><code>import { createApp } from "vue"
import VueYtframe from "vue-ytframe"

const app = createApp()
app.use(VueYtframe).mount("#app")</code></pre>`
	},
	{
		title: "Props",
		content: "<p>VueYtframe has the following props:</p>",
		table: {
			headers: ["Prop", "Type", "Default", "Description"],
			rows: [[
				"videoId",
				"String",
				"<code>null</code>",
				"The ID of the YouTube video to be played."
			], [
				"videoUrl",
				"String",
				"<code>null</code>",
				"The URL of the YouTube video to be played."
			], [
				"playerVars",
				"Object",
				"<code>{}</code>",
				"The playerVars object to be passed to the YouTube Iframe API."
			], {
				prop: "height",
				type: "String, Number",
				default: "<code>100%</code>",
				description: "The height of the player."
			}, [
				"width",
				"String, Number",
				"<code>100%</code>",
				"The width of the player."
			]]
		}
	},
	{
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
		}
	}, {
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
				["setVolume(volume: Number)", "Sets the volume. Accepts an integer between 0 and 100"],
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
				["cuePlaylist(playlist:String|Array, index:Number, startSeconds:Number)", "Queues the specified playlist.`"],
				["loadPlaylist(playlist:String|Array, index:Number, startSeconds:Number)", "Loads the specified playlist and plays it."],
				["getVideoIdFromYoutubeURL(url: String)", "Returns the YouTube video ID from the provided URL if found, null if not."],
			]
		}
	}
]
</script>
<style lang="scss">
.docs {
	height: calc(100vh - v-bind(appBarHeight) - v-bind(footerHeight));
	position: relative;
}

.docs-content {
	padding-left: 220px;
	padding-top: 1rem;
	height: calc(100vh - v-bind(appBarHeight) - v-bind(footerHeight));
	overflow: auto;
	padding-bottom: v-bind(footerHeight);

	section {
		margin-bottom: 3rem;
	}

	h2 {
		margin-bottom: 2rem;
	}

	h3 {
		margin-bottom: 1rem;
	}

	p, li {
		margin-bottom: .8rem;
	}

	.content-list {
		padding-left: 1rem;
	}

	pre {
		margin-bottom: 1rem;
		margin-right: 1rem;
		position: relative;
	}

	pre > code {
		border-radius: 4px !important;
		background: #f0f0f0 !important;
		max-height: 50dvh;
	}

	pre > button {
		position: absolute;
		right: .5%;
		top: .5%;
		font-size: 12px;
		padding: .2rem;
		cursor: pointer;
	}

	.header-link {
		font-size: 1.2rem;
		padding-inline: .4rem;
		cursor: pointer;
	}

	table {
		border: 1px solid grey;

		th {
			text-align: left;
		}

		td, th {
			padding: .5rem;
			border: 1px solid grey;

			code {
				outline: 1px solid grey;
				border-radius: 6px;
				padding: .2rem .4rem;
			}
		}
	}
}

body.theme--dark {
	pre > code {
		background: #272727 !important;
	}

	pre > button {
		color: #fff;
		background: #1a1a1a;
	}
}
</style>
