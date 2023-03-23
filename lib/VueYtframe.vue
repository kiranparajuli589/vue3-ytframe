<template>
	<div ref="youtube" :id="playerId"></div>
</template>
<script setup>
import {onMounted, ref, watch} from "vue"

const player = ref(null)

const props = defineProps({
	videoId: {
		type: String,
		required: false,
		default: null
	},
	videoUrl: {
		type: String,
		required: false,
		default: null
	},
	width: {
		type: [Number, String],
		required: false,
		default: "100%",
	},
	height: {
		type: [Number, String],
		required: false,
		default: "100%",
	},
	playerVars: {
		type: Object,
		required: false,
		default: () => ({}),
	},
})

watch(
	[() => props.videoId, () => props.videoUrl],
	([videoId, videoUrl]) => {
		validate(videoId, videoUrl)
	}
)

watch(
	[() => props.width, () => props.height],
	([width, height]) => {
		if (player.value) {
			setSize(width, height)
		}
	}
)

watch(() => props.videoId, (videoId) => {
	if (player.value && videoId) {
		console.log("watch", videoId)
		if (props.playerVars?.autoplay === 1) {
			loadVideoById({
				videoId,
				startSeconds: props.playerVars.start || 0,
				endSeconds: props.playerVars.end || 0,
			})
		} else {
			cueVideoById({
				videoId,
				startSeconds: props.playerVars.start || 0,
				endSeconds: props.playerVars.end || 0,
			})
		}
	}
})

watch(() => props.videoUrl, (videoUrl) => {
	if (player.value && videoUrl) {
		console.log("watch", videoUrl)
		if (props.playerVars?.autoplay) {
			loadVideoByUrl({
				videoUrl,
				startSeconds: props.playerVars.start || 0,
				endSeconds: props.playerVars.end || 0,
			})
		} else {
			cueVideoByUrl({
				videoUrl,
				startSeconds: props.playerVars.start || 0,
				endSeconds: props.playerVars.end || 0,
			})
		}
	}
})

function validate(videoId, videoUrl) {
	if (!videoId && !videoUrl) {
		console.error("At least one of the props \"videoId\" or \"videoUrl\" must be provided.")
	}
	if (!videoId && videoUrl) {
		if (!getVideoIdFromYoutubeURL(videoUrl)) {
			console.error(`The provided video URL (${videoUrl}) is not a valid Youtube URL.`,
				"If you are sure it is a valid YouTube URL and you are still getting this error,",
				"please open an issue on GitHub at https://github.com/kiranparajuli589/vue3-ytframe/issues/new"
			)
		}
	}
}

const playerId = ref(null)

onMounted(async () => {
	// assign a random id to the player
	playerId.value = Math.random().toString(36).substring(2, 12)
	console.log("mounted", props.videoUrl, props.videoId)

	validate(props.videoId, props.videoUrl)

	loadAPI().then(() => {
		checkIfYTLoaded().then(() => {
			createPlayer()
		})
	})
})

function loadAPI() {
	if (document.querySelector("script[src='https://www.youtube.com/iframe_api']")) {
		console.info("Youtube API script already added")
		return Promise.resolve()
	}
	const tag = document.createElement("script")
	tag.src = "https://www.youtube.com/iframe_api"
	document.head.appendChild(tag)
	console.info("Youtube API script added")
	return Promise.resolve()
}

function checkIfYTLoaded() {
	if (window.YT && window.YT.Player) {
		console.info("Youtube API loaded", window.YT)
		return Promise.resolve()
	}
	// recursively check if the YT object is loaded
	// eslint-disable-next-line no-unused-vars
	return new Promise((resolve) => {
		setTimeout(() => {
			checkIfYTLoaded().then(() => {
				resolve()
			})
		}, 100)
	})
}

const emit = defineEmits([
	"ready", "playing", "paused", "ended", "stateChange",
	"playbackQualityChange", "playbackRateChange", "error", "apiChange"
])

function createPlayer() {
	const playerElement = document.getElementById(playerId.value)
	const videoID = props.videoId || getVideoIdFromYoutubeURL(props.videoUrl)
	console.log("createPlayer", videoID)
	// eslint-disable-next-line no-undef
	player.value = new YT.Player(playerElement, {
		height: props.height,
		width: props.width,
		videoId: videoID,
		playerVars: props.playerVars,
		events: {
			"onReady": onPlayerReady,
			"onStateChange": onPlayerStateChange,
			"onPlaybackQualityChange": onPlaybackQualityChange,
			"onPlaybackRateChange": onPlaybackRateChange,
			"onError": onError,
			"onApiChange": onApiChange,
		}
	})
}

function onPlayerReady(event) {
	emit("ready", event.target)
}

function onPlayerStateChange(event) {
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

function onPlaybackQualityChange(event) {
	emit("playbackQualityChange", event.target)
}

function onPlaybackRateChange(event) {
	emit("playbackRateChange", event.target)
}

function onError(event) {
	emit("error", event.target)
}

function onApiChange(event) {
	emit("apiChange", event.target)
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#playVideo
 */
function playVideo() {
	player.value.playVideo()
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#pauseVideo
 */
function pauseVideo() {
	player.value.pauseVideo()
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#stopVideo
 */
function stopVideo() {
	player.value.stopVideo()
}

/**
 * @param {Number} seconds
 * @param {Boolean} allowSeekAhead
 *
 * @see https://developers.google.com/youtube/iframe_api_reference#seekTo
 */
function seekTo(seconds, allowSeekAhead) {
	player.value.seekTo(seconds, allowSeekAhead)
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#nextVideo
 */
function nextVideo() {
	player.value.nextVideo()
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#previousVideo
 */
function previousVideo() {
	player.value.previousVideo()
}

/**
 * @param {Number} index
 * @see https://developers.google.com/youtube/iframe_api_reference#playVideoAt
 */
function playVideoAt(index) {
	player.value.playVideoAt(index)
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#mute
 */
function mute() {
	player.value.mute()
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#unMute
 */
function unMute() {
	player.value.unMute()
}

/**
 * @returns {Boolean}
 * @see https://developers.google.com/youtube/iframe_api_reference#isMuted
 */
function isMuted() {
	return player.value.isMuted()
}

/**
 * @param {Number} volume
 *
 * @see https://developers.google.com/youtube/iframe_api_reference#setVolume
 */
function setVolume(volume) {
	player.value.setVolume(volume)
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#getVolume
 * @returns {Number}
 */
function getVolume() {
	return player.value.getVolume()
}

/**
 * @param {Number} width
 * @param {Number} height
 *
 * @see https://developers.google.com/youtube/iframe_api_reference#setSize
 */
function setSize(width, height) {
	player.value.setSize(width, height)
}

/**
 * @param {Boolean} loopPlayLists
 * @see https://developers.google.com/youtube/iframe_api_reference#setLoop
 */
function setLoop(loopPlayLists) {
	player.value.setLoop(loopPlayLists)
}

/**
 * @param {Boolean} shufflePlaylist
 * @see https://developers.google.com/youtube/iframe_api_reference#setShuffle
 */
function setShuffle(shufflePlaylist) {
	player.value.setShuffle(shufflePlaylist)
}

/**
 * @returns {Number}
 * @see https://developers.google.com/youtube/iframe_api_reference#getDuration
 */
function getDuration() {
	return player.value.getDuration()
}

/**
 * @returns {Number}
 * @see https://developers.google.com/youtube/iframe_api_reference#getCurrentTime
 */
function getCurrentTime() {
	return player.value.getCurrentTime()
}

/**
 * @returns {String}
 * @see https://developers.google.com/youtube/iframe_api_reference#getVideoEmbedCode
 */
function getVideoEmbedCode() {
	return player.value.getVideoEmbedCode()
}

/**
 * @returns {String}
 * @see https://developers.google.com/youtube/iframe_api_reference#getVideoUrl
 */
function getVideoUrl() {
	return player.value.getVideoUrl()
}

/**
 * @returns {Number} Floating point number between 0 and 1
 * @see https://developers.google.com/youtube/iframe_api_reference#getVideoLoadedFraction
 */
function getVideoLoadedFraction() {
	return player.value.getVideoLoadedFraction()
}

/**
 * @returns {Number}
 * @see https://developers.google.com/youtube/iframe_api_reference#getPlayerState
 */
function getPlayerState() {
	return player.value.getPlayerState()
}

/**
 * @returns {Number}
 * @see https://developers.google.com/youtube/iframe_api_reference#getPlaybackRate
 */
function getPlaybackRate() {
	return player.value.getPlaybackRate()
}

/**
 * @param {Number} suggestedRate
 * @see https://developers.google.com/youtube/iframe_api_reference#setPlaybackRate
 */
function setPlaybackRate(suggestedRate) {
	player.value.setPlaybackRate(suggestedRate)
}

/**
 * @returns {Array}
 * @see https://developers.google.com/youtube/iframe_api_reference#getAvailablePlaybackRates
 */
function getAvailablePlaybackRates() {
	return player.value.getAvailablePlaybackRates()
}

/**
 * retrieves an array of module names for which you can set player options
 *
 * @returns {Object}
 * @see https://developers.google.com/youtube/iframe_api_reference#onApiChange
 */
function getOptions() {
	return player.value.getOptions()
}

/**
 * retrieves the value of a specific player option
 *
 * @param module
 * @param option
 *
 * @return {*}
 * @see https://developers.google.com/youtube/iframe_api_reference#onApiChange
 */
function getAnOption(module, option) {
	return player.value.getOption(module, option)
}

/**
 * sets the value of a specific player option
 *
 * @param module
 * @param option
 * @param value
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#onApiChange
 */
function setAnOption(module, option, value) {
	player.value.setOption(module, option, value)
}

/**
 * Retrieves properties that describe the viewer's current perspective, or view, for a video playback
 *
 * @returns {Object} {yaw, pitch, roll, fov}
 * @see https://developers.google.com/youtube/iframe_api_reference#getSphericalProperties
 */
function getSphericalProperties() {
	return player.value.getSphericalProperties()
}

/**
 * Sets the video orientation for playback of a 360° video
 *
 * @param {Object} props {yaw, pitch, roll, fov, enableOrientationSensor}
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#setSphericalProperties
 */
function setSphericalProperties(props) {
	player.value.setSphericalProperties(props)
}

/**
 * @returns {Array}
 * @see https://developers.google.com/youtube/iframe_api_reference#getPlaylist
 */
function getPlaylist() {
	return player.value.getPlaylist()
}

/**
 * @return {Number}
 * @see https://developers.google.com/youtube/iframe_api_reference#getPlaylistIndex
 */
function getPlaylistIndex() {
	return player.value.getPlaylistIndex()
}

/**
 * @return {Object}
 * @see https://developers.google.com/youtube/iframe_api_reference#getIframe
 */
function getIframe() {
	return player.value.getIframe()
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#destroy
 */
function destroy() {
	player.value.destroy()
}

/**
 * @param {String} videoId
 * @param {Number} startSeconds
 * @param {Number} endSeconds
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById
 */
function loadVideoById({videoId, startSeconds, endSeconds} = {}) {
	player.value.loadVideoById({videoId, startSeconds, endSeconds})
}

/**
 * @param {String} videoId
 * @param {Number} startSeconds
 * @param {Number} endSeconds
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#cueVideoById
 */
function cueVideoById({videoId, startSeconds, endSeconds} = {}) {
	player.value.cueVideoById({videoId, startSeconds, endSeconds})
}

/**
 * @param {String} mediaContentUrl
 * @param {Number} startSeconds
 * @param {Number} endSeconds
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoByUrl
 */
function loadVideoByUrl({mediaContentUrl, startSeconds, endSeconds} = {}) {
	player.value.loadVideoByUrl({mediaContentUrl, startSeconds, endSeconds})
}

/**
 * @param {String} mediaContentUrl
 * @param {Number} startSeconds
 * @param {Number} endSeconds
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#cueVideoByUrl
 */
function cueVideoByUrl({mediaContentUrl, startSeconds, endSeconds} = {}) {
	player.value.cueVideoByUrl({mediaContentUrl, startSeconds, endSeconds})
}

/**
 *
 * @param {String|Array} playlist
 * @param {Number} index
 * @param {Number} startSeconds
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#cuePlaylist
 */
function cuePlaylist(playlist, index, startSeconds) {
	player.value.cuePlaylist(playlist, index, startSeconds)
}

/**
 * Load a new playlist
 *
 * @param {String|Array} playlist
 * @param {Number} index
 * @param {Number} startSeconds
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#loadPlaylist
 */
function loadPlaylist(playlist, index, startSeconds) {
	player.value.loadPlaylist(playlist, index, startSeconds)
}

/**
 * Get the video id from a YouTube url
 *
 * Following types of urls are supported:
 * https://www.youtube.com/watch?v=SomE-ID
 * https://youtu.be/SomE-ID
 * https://m.youtube.com/watch?v=SomE-ID
 * https://www.youtube.com/embed/SomE-ID
 *
 * @param url
 *
 * @returns {string|null}
 */
function getVideoIdFromYoutubeURL(url) {
	const regex = /^https:\/\/(?:(?:www|m)\.)?(?:youtube\.com\/watch\?v=|youtu.be\/|youtube\.com\/embed\/)(?<id>[a-zA-Z0-9_-]+)$/gm
	regex.lastIndex = 0
	const match = regex.exec(url)
	if (match) {
		return match.groups.id
	} else {
		return null
	}
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
	getVideoIdFromYoutubeURL
})
</script>
