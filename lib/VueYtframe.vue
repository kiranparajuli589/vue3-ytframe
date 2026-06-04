<template>
	<div :id="playerId" ref="youtube"></div>
</template>
<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch} from "vue"
import {debounce, getVideoIdFromYoutubeURL, warn} from "./utils"
import type {VueYtframeProps, LoadVideoByIdOptions, LoadVideoByUrlOptions} from "./types"
import {YT_API_SRC, YT_LOAD_TIMEOUT, YT_POLL_INTERVAL} from "./constants"

const props = withDefaults(defineProps<VueYtframeProps>(), {
	videoId: null,
	videoUrl: null,
	width: "100%",
	height: "100%",
	playerVars: () => ({}),
})

const emit = defineEmits<{
	ready: [player: YT.Player]
	playing: [player: YT.Player]
	paused: [player: YT.Player]
	ended: [player: YT.Player]
	stateChange: [player: YT.Player]
	playbackQualityChange: [player: YT.Player]
	playbackRateChange: [player: YT.Player]
	error: [player: YT.Player]
	apiChange: [player: YT.Player]
}>()

const player = ref<YT.Player | null>(null)
const playerId = ref("")
const urlValidity = ref(false)

let pollTimer: ReturnType<typeof setTimeout> | undefined

const debouncedIdChange = debounce(onVideoIdChange, 300)
const debouncedUrlChange = debounce(onVideoUrlChange, 500)

watch(
	[() => props.width, () => props.height],
	([width, height]) => {
		if (player.value) {
			player.value.setSize(Number(width), Number(height))
		}
	},
)

watch(() => props.videoId, (videoId) => debouncedIdChange(videoId))
watch(() => props.videoUrl, (videoUrl) => debouncedUrlChange(videoUrl))

function onVideoIdChange(videoId: string | null): void {
	validate()
	if (!urlValidity.value || !videoId) return
	loadOrCueById(videoId)
}

function onVideoUrlChange(videoUrl: string | null): void {
	validate()
	if (!urlValidity.value || !videoUrl) return
	// The YT API's load/cueVideoByUrl only accept the ".../v/ID?version=3"
	// format, so resolve the ID and reload via the reliable *ById methods.
	const videoId = getVideoIdFromYoutubeURL(videoUrl)
	if (videoId) loadOrCueById(videoId)
}

/** Reloads (autoplay) or cues a video by ID, creating the player if needed. */
function loadOrCueById(videoId: string): void {
	if (!player.value) {
		createPlayer()
		return
	}
	const args = {
		videoId,
		startSeconds: props.playerVars?.start || 0,
		endSeconds: props.playerVars?.end || undefined,
	}
	if (props.playerVars?.autoplay === 1) {
		player.value.loadVideoById(args)
	} else {
		player.value.cueVideoById(args)
	}
}

function validate(): void {
	const {videoId, videoUrl} = props
	if (!videoId && !videoUrl) {
		urlValidity.value = false
		warn("At least one of the props 'videoId' or 'videoUrl' must be provided.")
		return
	}
	if (!videoId && videoUrl && !getVideoIdFromYoutubeURL(videoUrl)) {
		urlValidity.value = false
		warn(`The provided video URL (${videoUrl}) is not a valid YouTube URL.`)
		return
	}
	urlValidity.value = true
}

let idCounter = 0

function generatePlayerId(): string {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
		return `ytframe-${crypto.randomUUID()}`
	}
	return `ytframe-${(++idCounter).toString(36)}`
}

onMounted(() => {
	playerId.value = generatePlayerId()
	validate()
	loadAPI()
	whenYTReady()
		.then(() => {
			if (urlValidity.value) createPlayer()
		})
		.catch((err: Error) => warn(err.message))
})

onBeforeUnmount(() => {
	debouncedIdChange.cancel()
	debouncedUrlChange.cancel()
	if (pollTimer) clearTimeout(pollTimer)
	if (player.value) {
		player.value.destroy()
		player.value = null
	}
})

/** Injects the YouTube Iframe API script once per document. */
function loadAPI(): void {
	if (window.YT && window.YT.Player) return
	if (document.querySelector(`script[src="${YT_API_SRC}"]`)) return
	const tag = document.createElement("script")
	tag.src = YT_API_SRC
	document.head.appendChild(tag)
}

/** Resolves when `window.YT.Player` is available, rejecting after a timeout. */
function whenYTReady(): Promise<void> {
	return new Promise((resolve, reject) => {
		const start = Date.now()
		const check = (): void => {
			if (window.YT && window.YT.Player) {
				resolve()
				return
			}
			if (Date.now() - start > YT_LOAD_TIMEOUT) {
				reject(new Error("YouTube Iframe API failed to load within timeout."))
				return
			}
			pollTimer = setTimeout(check, YT_POLL_INTERVAL)
		}
		check()
	})
}

function createPlayer(): void {
	const el = document.getElementById(playerId.value)
	if (!el) return
	const videoId = props.videoId || getVideoIdFromYoutubeURL(props.videoUrl) || undefined
	player.value = new window.YT.Player(el, {
		height: props.height,
		width: props.width,
		videoId,
		playerVars: props.playerVars,
		events: {
			onReady: (event) => emit("ready", event.target),
			onStateChange: onPlayerStateChange,
			onPlaybackQualityChange: (event) => emit("playbackQualityChange", event.target),
			onPlaybackRateChange: (event) => emit("playbackRateChange", event.target),
			onError: (event) => emit("error", event.target),
			onApiChange: (event) => emit("apiChange", event.target),
		},
	})
}

function onPlayerStateChange(event: YT.OnStateChangeEvent): void {
	switch (event.data) {
	case window.YT.PlayerState.PLAYING:
		emit("playing", event.target)
		break
	case window.YT.PlayerState.PAUSED:
		emit("paused", event.target)
		break
	case window.YT.PlayerState.ENDED:
		emit("ended", event.target)
		break
	}
	emit("stateChange", event.target)
}

/** Throws a clear error when a player method is called before the player is ready. */
function ensurePlayer(): YT.Player {
	if (!player.value) {
		throw new Error(
			"[vue3-ytframe] Player is not ready. Wait for the 'ready' event before calling player methods.",
		)
	}
	return player.value
}

/** @see https://developers.google.com/youtube/iframe_api_reference#playVideo */
function playVideo(): void {
	ensurePlayer().playVideo()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#pauseVideo */
function pauseVideo(): void {
	ensurePlayer().pauseVideo()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#stopVideo */
function stopVideo(): void {
	ensurePlayer().stopVideo()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#seekTo */
function seekTo(seconds: number, allowSeekAhead: boolean): void {
	ensurePlayer().seekTo(seconds, allowSeekAhead)
}

/** @see https://developers.google.com/youtube/iframe_api_reference#nextVideo */
function nextVideo(): void {
	ensurePlayer().nextVideo()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#previousVideo */
function previousVideo(): void {
	ensurePlayer().previousVideo()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#playVideoAt */
function playVideoAt(index: number): void {
	ensurePlayer().playVideoAt(index)
}

/** @see https://developers.google.com/youtube/iframe_api_reference#mute */
function mute(): void {
	ensurePlayer().mute()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#unMute */
function unMute(): void {
	ensurePlayer().unMute()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#isMuted */
function isMuted(): boolean {
	return ensurePlayer().isMuted()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#setVolume */
function setVolume(volume: number): void {
	ensurePlayer().setVolume(volume)
}

/** @see https://developers.google.com/youtube/iframe_api_reference#getVolume */
function getVolume(): number {
	return ensurePlayer().getVolume()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#setSize */
function setSize(width: number, height: number): void {
	ensurePlayer().setSize(width, height)
}

/** @see https://developers.google.com/youtube/iframe_api_reference#setLoop */
function setLoop(loopPlaylists: boolean): void {
	ensurePlayer().setLoop(loopPlaylists)
}

/** @see https://developers.google.com/youtube/iframe_api_reference#setShuffle */
function setShuffle(shufflePlaylist: boolean): void {
	ensurePlayer().setShuffle(shufflePlaylist)
}

/** @see https://developers.google.com/youtube/iframe_api_reference#getDuration */
function getDuration(): number {
	return ensurePlayer().getDuration()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#getCurrentTime */
function getCurrentTime(): number {
	return ensurePlayer().getCurrentTime()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#getVideoEmbedCode */
function getVideoEmbedCode(): string {
	return ensurePlayer().getVideoEmbedCode()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#getVideoUrl */
function getVideoUrl(): string {
	return ensurePlayer().getVideoUrl()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#getVideoLoadedFraction */
function getVideoLoadedFraction(): number {
	return ensurePlayer().getVideoLoadedFraction()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#getPlayerState */
function getPlayerState(): number {
	return ensurePlayer().getPlayerState()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#getPlaybackRate */
function getPlaybackRate(): number {
	return ensurePlayer().getPlaybackRate()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#setPlaybackRate */
function setPlaybackRate(suggestedRate: number): void {
	ensurePlayer().setPlaybackRate(suggestedRate)
}

/** @see https://developers.google.com/youtube/iframe_api_reference#getAvailablePlaybackRates */
function getAvailablePlaybackRates(): number[] {
	return ensurePlayer().getAvailablePlaybackRates()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#onApiChange */
function getOptions(): string[] {
	return ensurePlayer().getOptions()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#onApiChange */
function getAnOption(module: string, option: string): unknown {
	return ensurePlayer().getOption(module, option)
}

/** @see https://developers.google.com/youtube/iframe_api_reference#onApiChange */
function setAnOption(module: string, option: string, value: unknown): void {
	ensurePlayer().setOption(module, option, value)
}

/** @see https://developers.google.com/youtube/iframe_api_reference#getSphericalProperties */
function getSphericalProperties(): object {
	return ensurePlayer().getSphericalProperties()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#setSphericalProperties */
function setSphericalProperties(properties: object): void {
	ensurePlayer().setSphericalProperties(properties)
}

/** @see https://developers.google.com/youtube/iframe_api_reference#getPlaylist */
function getPlaylist(): string[] {
	return ensurePlayer().getPlaylist()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#getPlaylistIndex */
function getPlaylistIndex(): number {
	return ensurePlayer().getPlaylistIndex()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#getIframe */
function getIframe(): HTMLIFrameElement {
	return ensurePlayer().getIframe()
}

/** @see https://developers.google.com/youtube/iframe_api_reference#destroy */
function destroy(): void {
	if (player.value) {
		player.value.destroy()
		player.value = null
	}
}

/** @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById */
function loadVideoById({videoId, startSeconds, endSeconds}: LoadVideoByIdOptions): void {
	ensurePlayer().loadVideoById({videoId, startSeconds, endSeconds})
}

/** @see https://developers.google.com/youtube/iframe_api_reference#cueVideoById */
function cueVideoById({videoId, startSeconds, endSeconds}: LoadVideoByIdOptions): void {
	ensurePlayer().cueVideoById({videoId, startSeconds, endSeconds})
}

/** @see https://developers.google.com/youtube/iframe_api_reference#loadVideoByUrl */
function loadVideoByUrl({mediaContentUrl, startSeconds, endSeconds}: LoadVideoByUrlOptions): void {
	ensurePlayer().loadVideoByUrl({mediaContentUrl, startSeconds, endSeconds})
}

/** @see https://developers.google.com/youtube/iframe_api_reference#cueVideoByUrl */
function cueVideoByUrl({mediaContentUrl, startSeconds, endSeconds}: LoadVideoByUrlOptions): void {
	ensurePlayer().cueVideoByUrl({mediaContentUrl, startSeconds, endSeconds})
}

/** @see https://developers.google.com/youtube/iframe_api_reference#cuePlaylist */
function cuePlaylist(playlist: string | string[], index?: number, startSeconds?: number): void {
	ensurePlayer().cuePlaylist(playlist as string, index, startSeconds)
}

/** @see https://developers.google.com/youtube/iframe_api_reference#loadPlaylist */
function loadPlaylist(playlist: string | string[], index?: number, startSeconds?: number): void {
	ensurePlayer().loadPlaylist(playlist as string, index, startSeconds)
}

defineExpose({
	player,
	playVideo,
	pauseVideo,
	stopVideo,
	seekTo,
	nextVideo,
	previousVideo,
	playVideoAt,
	mute,
	unMute,
	isMuted,
	setVolume,
	getVolume,
	setSize,
	setShuffle,
	setLoop,
	getDuration,
	getCurrentTime,
	getVideoEmbedCode,
	getVideoUrl,
	getVideoLoadedFraction,
	getPlayerState,
	getPlaybackRate,
	setPlaybackRate,
	getAvailablePlaybackRates,
	getOptions,
	getAnOption,
	setAnOption,
	getSphericalProperties,
	setSphericalProperties,
	getPlaylist,
	getPlaylistIndex,
	getIframe,
	destroy,
	loadVideoById,
	cueVideoById,
	loadVideoByUrl,
	cueVideoByUrl,
	cuePlaylist,
	loadPlaylist,
	getVideoIdFromYoutubeURL,
})
</script>
