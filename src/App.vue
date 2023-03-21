<template>
  <div class="yt-frame-demo">
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
  </div>
</template>
<script setup>

const videosSet1 = [
  "kGb9ftWR3l8",
  "U_0iZpQPPoA",
]

const onStateChange = (event) => {
  console.log(event);
}
</script>
