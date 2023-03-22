<p align="center">
	<img src="./src/assets/youtube.svg" width="80">
</p>
<h1 align=center>Vue3 Ytframe</h1>
<p align=center>A YouTube Iframe API Wrapper</p>
<p align="center">
<a href="https://www.npmjs.com/package/vue3-ytframe"><img src="https://img.shields.io/npm/v/vue3-ytframe.svg"/> <img src="https://img.shields.io/npm/dm/vue3-ytframe.svg"/></a> <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-3-brightgreen.svg"/></a>
</p>

## Why?

- Supports Vue 3
- Uses the composition API
- No dependencies other than Vue 3
- Supports all the methods and events provided by the YouTube iFrame API

## Installation

1. Package Installation
    ```bash
    npm i vue3-ytframe # using npm
    pnpm i vue3-ytframe # using pnpm
    yarn add vue3-ytframe # using yarn
    ````

2. Component registration
    ```js
    // src/main.js

    import VueYtframe from "vue3-ytframe"

    createApp(App)
        .use(VueYtframe)
        .mount('#app')
    ```
## Props

- `videoId` (optional) - The ID of the YouTube video to embed.
- `videoUrl` (optional) - The URL of the YouTube video to embed.

  > **Note:** Either `videoId` or `videoUrl` is required. If both are provided, `videoId` will be used.

- `width` (optional) - The width of the player. Default is "100%".
- `height` (optional) - The height of the player. Default is "100%".
- `playerVars` (optional) - An object containing additional options to pass to the YouTube iFrame player. Default is an
  empty object. Refer to the https://developers.google.com/youtube/player_parameters for a list of available options.

## Methods

The following methods are available to control the behavior of the YouTube player:

- `playVideo`: Plays the currently cued/loaded video.
- `pauseVideo`: Pauses the currently playing video.
- `stopVideo`: Stops and cancels loading of the current video.
- `seekTo`: Seeks to a specified time in the video.
- `nextVideo`: Plays the next video in the playlist.
- `previousVideo`: Plays the previous video in the playlist.
- `playVideoAt`: Plays the video at the given index in the playlist.
- `mute`: Mutes the player.
- `unMute`: Unmutes the player.
- `isMuted`: Returns whether the player is muted.
- `setVolume`: Sets the volume.
- `getVolume`: Returns the player's current volume, in the range 0 to 100.
- `setSize`: Sets the size of the <iframe> (in pixels).
- `setShuffle`: Sets whether the player should shuffle the playlist.
- `setLoop`: Sets whether the player should loop the playlist.
- `getDuration`: Returns the duration of the current video in seconds.
- `getCurrentTime`: Returns the elapsed time in seconds since the video started playing.
- `getVideoStartBytes`: Returns the number of bytes loaded for the current video.
- `getVideoBytesLoaded`: Returns the number of bytes loaded for the current video.
- `getVideoBytesTotal`: Returns the total number of bytes for the current video.
- `getVideoEmbedCode`: Returns the embed code for the current video.
- `getVideoUrl`: Returns the URL for the current video.
- `getVideoLoadedFraction`: Returns a number between 0 and 1 that specifies the percentage of the video that the player shows as buffered.
- `getPlayerState`: Returns the state of the player.
- `getPlaybackRate`: Returns the playback rate of the current video.
- `setPlaybackRate`: Sets the provided playback rate for the current video.
- `getAvailablePlaybackRates`: Returns a list of available playback rates.
- `getOptions`: Returns the options for the player.
- `getAnOption`: Returns the value of the specified option.
- `setAnOption`: Sets the value of the specified option.
- `getSphericalProperties`: Returns the spherical properties for the current video.
- `setSphericalProperties`: Sets the spherical properties for the current video.
- `getPlaylist`: Returns the playlist for the player.
- `getPlaylistIndex`: Returns the index of the playlist item that is currently playing.
- `getIframe`: Returns the <iframe> element that contains the player.
- `destroy`: Destroys the player and removes the <iframe> from the DOM.
- `loadVideoById`: Loads and plays the specified video.
- `cueVideoById`: Loads the specified video and prepares the player to play the video.
- `loadVideoByUrl`: Loads and plays the specified video.
- `cueVideoByUrl`: Loads the specified video and prepares the player to play the video.
- `cuePlaylist`: Loads the specified playlist and plays the first video.
- `loadPlaylist`: Loads the specified playlist and plays the first video.
- `getVideoIdFromYoutubeURL`: Returns the video ID from a YouTube URL.

## Events

The following events are available to listen to:

- `ready` - Emitted when the player is ready to play.
- `stateChange` - Emitted when the player's state changes.
- `playing` - Emitted when the player starts playing.
- `paused` - Emitted when the player is paused.
- `ended` - Emitted when the player has finished playing.
- `error` - Emitted when an error occurs.
- `apiChange` - Emitted when the player's API changes.
- `playbackQualityChange` - Emitted when the player's playback quality changes.
- `playbackRateChange` - Emitted when the player's playback rate changes.

## Usage

Here is simple example usage of the component:

```vue
<template>
  <div class="player-page">
    <VueYtframe
      v-for="video in videosSet1"
      :key="video"
      ref="yt"
      :video-id="video"
      height="300"
      width="100%"
      :player-vars="{ autoplay: 0, listType: 'user_uploads' }"
      @state-change="onStateChange"
    />
    <br>
    <VueYtframe
      v-for="video in videosSet2"
      :key="video"
      ref="yt"
      :video-id="video"
      height="300"
      width="100%"
      :player-vars="{ autoplay: 0, listType: 'user_uploads' }"
      @state-change="onStateChange"
    />
  </div>
</template>
<script setup>
import {ref} from "vue";

// declare a template reference
const yt = ref(null)

const videosSet1 = [
  "kGb9ftWR3l8",
  "U_0iZpQPPoA",
]

const videosSet2 = [
  "Ve_PI0i43QI",
  "km3ZBzuFntw"
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
</script>
```

> **Note:** With the `app.use(VueYtframe)` command in the `main.js` file _(which is a must)_, the component will be
> available globally inside the project. There is no need to import the component in every component.
