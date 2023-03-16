# Vue 3 Youtube
The component uses the composition API to create a reactive player instance and define various methods to control the player's behavior.

## Why?
- Supports Vue 3
- Uses the composition API
- No dependencies other than Vue 3
- Supports all the methods and events of the YouTube iFrame API

## Props
- `videoId` (required) - The ID of the YouTube video to play.
- `width` (optional) - The width of the player. Default is "100%".
- `height` (optional) - The height of the player. Default is "100%".
- `playerVars` (optional) - An object containing additional options to pass to the YouTube iFrame player. Default is an empty object. Refer to the [https://developers.google.com/youtube/player_parameters) for a list of available options.

## Methods
The following methods are available to control the behavior of the YouTube player:

- `playVideo()` - Plays the currently loaded video.
- `pauseVideo()` - Pauses the currently loaded video.
- `stopVideo()` - Stops the currently loaded video.
- `seekTo(s`econds: number, allowSeekAhead: boolean) - Seeks to a specified time in the video. The seconds parameter is the time in seconds to seek to, and allowSeekAhead is a boolean indicating whether to allow the player to make a new request for unbuffered data if the time is outside of the currently buffered video data.
- `mute()` - Mutes the player.
- `unMute()` - Unmutes the player.
- `isMuted()` - Returns a boolean indicating whether the player is muted.
- `setVolume(volume: number)` - Sets the player's volume. The volume parameter should be a number between 0 and 100.
- `getVolume()` - Returns the player's current volume level as a number between 0 and 100.
- `setSize(w`idth: number, height: number) - Sets the player's width and height.
- `getDuration()` - Returns the duration of the currently playing video in seconds.
- `getCurrentTime()` - Returns the current playback time in seconds.
- `getVideoEmbedCode()` - Returns the embed code for the currently playing video.
- `getVideoUrl()` - Returns the YouTube.com URL for the currently playing video.
- `getVideoLoadedFraction()` - Returns a number between 0 and 1 indicating the percentage of the video that has been loaded.
- `getPlayerState()` - Returns the current state of the player.
- `getPlayerStateText()` - Returns a string describing the current state of the player.
- `getPlaybackRate()` - Returns the current playback rate of the player.
- `setPlaybackRate(suggestedRate: number)` - Sets the suggested playback rate for the player. The suggestedRate parameter should be a number representing the suggested playback rate.
- `getOptions(opt: string)` - Returns the player options for a specified key.

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
```vue
<template>
  <div class="player-page">
    <VYoutube
        v-for="video in videosSet1"
        :key="video"
        ref="yt"
        :video-id="video"
        height="300"
        width="100%"
        :player-vars="{ autoplay: 0, listType: 'user_uploads' }"
        @state-change="onStateChange"
    />
    <h3>Kiran Parajuli</h3>
    <VYoutube
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
import VYoutube from "@kiran/vue3-youtube"

const yt = ref(null)

const videosSet1 = [
  "kGb9ftWR3l8",
  "U_0iZpQPPoA",
]

const videosSet2 = [
  "Ve_PI0i43QI",
  "km3ZBzuFntw"
]

// pause other videos when one is playing
const onStateChange = (event) => {
  if (event.getPlayerState() === 1) {
    yt.value.forEach((video) => {
      if (video.getVideoUrl() !== event.getVideoUrl()) {
        video.pauseVideo()
      }
    })
  }
}
</script>
```
