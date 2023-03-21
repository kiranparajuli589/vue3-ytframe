<template>
  <div ref="youtube" :id="playerID"></div>
</template>
<script setup>
import {onMounted, ref, watch} from "vue";

const player = ref(null)

const props = defineProps( {
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
);

function validate(videoId, videoUrl) {
  if (!videoId && !videoUrl) {
    console.error('At least one of the props "videoId" or "videoUrl" must be provided.');
  }
  if (!videoId && videoUrl) {
    if (!getVideoIdFromYoutubeURL(videoUrl)) {
      console.error(`The provided video URL (${videoUrl}) is not a valid Youtube URL.`,
          'If you are sure it is a valid YouTube URL and you are still getting this error,',
          'please open an issue on GitHub at https://github.com/kiranparajuli589/vue3-ytframe/issues/new'
      );
    }
  }
}

const playerID = ref(null)

onMounted(async () => {
  // assign a random id to the player
  playerID.value = Math.random().toString(36).substring(2, 12)

  validate(props.videoId, props.videoUrl)

  loadAPI().then(() => {
    checkIfYTLoaded().then(() => {
      createPlayer()
    })
  })
})

function loadAPI() {
  if(document.querySelector("script[src='https://www.youtube.com/iframe_api']")) {
    console.info("Youtube API script already added");
    return Promise.resolve();
  }
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
  console.info("Youtube API script added");
  return Promise.resolve();
}

function checkIfYTLoaded() {
  if (window.YT && window.YT.Player) {
    console.info("Youtube API loaded", window.YT);
    return Promise.resolve();
  }
  // recursively check if the YT object is loaded
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
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
  const playerElement = document.getElementById(playerID.value)
  const videoID = props.videoId || getVideoIdFromYoutubeURL(props.videoUrl)
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
      "onPlaybackRateChange":onPlaybackRateChange,
      "onError": onError,
      "onApiChange": onApiChange,
    }
  });
}

function onPlayerReady(event) {
  emit("ready", event.target)
}

function onPlayerStateChange(event) {
  switch (event.data) {
    case YT.PlayerState.PLAYING:
      emit("playing", event.target)
      break;
    case YT.PlayerState.PAUSED:
      emit("paused", event.target)
      break;
    case YT.PlayerState.ENDED:
      emit("ended", event.target)
      break;
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

function playVideo() {
  player.value.playVideo();
}

function pauseVideo() {
  player.value.pauseVideo();
}

function stopVideo() {
  player.value.stopVideo();
}

function seekTo(seconds, allowSeekAhead) {
  player.value.seekTo(seconds, allowSeekAhead);
}

function mute() {
  player.value.mute();
}

function unMute() {
  player.value.unMute();
}

function isMuted() {
  return player.value.isMuted();
}

function setVolume(volume) {
  player.value.setVolume(volume);
}

function getVolume() {
  return player.value.getVolume();
}

function setSize(width, height) {
  player.value.setSize(width, height);
}

function getDuration() {
  return player.value.getDuration();
}

function getCurrentTime() {
  return player.value.getCurrentTime();
}

function getVideoEmbedCode() {
  return player.value.getVideoEmbedCode();
}

function getVideoUrl() {
  return player.value.getVideoUrl();
}

function getVideoLoadedFraction() {
  return player.value.getVideoLoadedFraction();
}

function getPlayerState() {
  return player.value.getPlayerState();
}

function getPlayerStateText() {
  return player.value.getPlayerStateText();
}

function getPlaybackRate() {
  return player.value.getPlaybackRate();
}

function setPlaybackRate(suggestedRate) {
  player.value.setPlaybackRate(suggestedRate);
}

function getOptions(opt) {
  return player.value.getOptions(opt);
}

/**
 * Get the video id from a youtube url
 *
 * Following types of urls are supported:
 *
 * https://www.youtube.com/watch?v=SomE-ID
 * https://youtu.be/SomE-ID
 * https://m.youtube.com/watch?v=SomE-ID
 * https://www.youtube.com/embed/SomE-ID
 *
 * @param url
 * @returns {string|string|*}
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
  mute,
  unMute,
  isMuted,
  setVolume,
  getVolume,
  setSize,
  getDuration,
  getCurrentTime,
  getVideoEmbedCode,
  getVideoUrl,
  getVideoLoadedFraction,
  getPlayerState,
  getPlayerStateText,
  getPlaybackRate,
  setPlaybackRate,
  getOptions,
  getVideoIdFromYoutubeURL
})
</script>
