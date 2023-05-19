<template>
	<div class="playground">
		<h2>Playground</h2>
		<div class="player">
			<VueYtframe ref="yt" :video-id="videoId" :video-url="videoUrl" :height="height"
				:width="width" :player-vars="playerParameters" />
			<div v-if="!videoId && !videoUrl" class="no-value">
				Input YouTube video ID or URL to initiate the player.
			</div>
		</div>
		<div class="actions" v-if="yt && yt.player">
			<button @click="destroyPlayer()">Destroy Player</button>
		</div>
		<div class="props">
			<div class="video-id">
				<div class="title">Video ID</div>
				<div class="text-input">
					<input id="video-id" type="text" v-model="videoId">
				</div>
			</div>
			<div class="video-url">
				<div class="title">Video URL</div>
				<div class="text-input">
					<input id="video-url" type="url" v-model="videoUrl">
				</div>
			</div>
			<div>
				<div class="title">Width</div>
				<input type="range" min="100" max="1000" v-model="width" class="slider" id="player-width">
			</div>
			<div>
				<div class="title">Height</div>
				<input type="range" min="100" max="1000" v-model="height" class="slider" id="player-height">
			</div>
			<div class="player-parameters">
				<div class="title">Player Parameters</div>
				<div>
					<label for="autoplay">
						Autoplay
						(<a :href="ppRef('autoplay')" target="_blank">Ref</a>)
					</label>
					<input id="autoplay" type="checkbox" v-model="playerVars.autoplay">
				</div>

				<div>
					<label for="cc-lang-pref">
						CC Lang Pref
						(<a :href="ppRef('cc_lang_pref')" target="_blank">Ref</a>)
					</label>
					<input type="text" id="cc-lang-pref" v-model="playerVars.cc_lang_pref">
				</div>

				<div>
					<label for="cc-load-policy">
						CC Load Policy
						(<a :href="ppRef('cc_load_policy')" target="_blank">Ref</a>)
					</label>
					<input type="checkbox" id="cc-load-policy" v-model="playerVars.cc_load_policy">
				</div>

				<div>
					<label for="color">
						Color
						(<a :href="ppRef('color')" target="_blank">Ref</a>)
					</label>
					<input type="text" id="color" v-model="playerVars.color">
				</div>

				<div>
					<label for="controls">
						Controls
						(<a :href="ppRef('controls')" target="_blank">Ref</a>)
					</label>
					<input type="checkbox" id="controls" v-model="playerVars.controls">
				</div>

				<div>
					<label for="disable-kb">
						Disable KB
						(<a :href="ppRef('disablekb')" target="_blank">Ref</a>)
					</label>
					<input type="checkbox" id="disable-kb" v-model="playerVars.disablekb">
				</div>

				<div>
					<label for="enable-js-api">
						Enable JS API
						(<a :href="ppRef('enablejsapi')" target="_blank">Ref</a>)
					</label>
					<input type="checkbox" id="enable-js-api" v-model="playerVars.enablejsapi">
				</div>

				<div>
					<label for="start">
						Start (seconds)
						(<a :href="ppRef('start')" target="_blank">Ref</a>)
					</label>
					<input type="number" id="start" v-model="playerVars.start">
				</div>

				<div>
					<label for="end">
						End (seconds)
						(<a :href="ppRef('end')" target="_blank">Ref</a>)
					</label>
					<input type="number" id="end" v-model="playerVars.end">
				</div>

				<div>
					<label for="fs">
						FS
						(<a :href="ppRef('fs')" target="_blank">Ref</a>)
					</label>
					<input type="checkbox" id="fs" v-model="playerVars.fs">
				</div>

				<div>
					<label for="hl">
						HL
						(<a :href="ppRef('hl')" target="_blank">Ref</a>)
					</label>
					<input type="text" id="hl" v-model="playerVars.hl">
				</div>

				<div>
					<label for="iv-load-policy">
						IV Load Policy
						(<a :href="ppRef('iv_load_policy')" target="_blank">Ref</a>)
					</label>
					<input type="checkbox" id="iv-load-policy" v-model="playerVars.iv_load_policy">
				</div>

				<div>
					<label for="list-type">
						List Type
						(<a :href="ppRef('listType')" target="_blank">Ref</a>)
					</label>
					<input type="text" id="list-type" v-model="playerVars.listType">
				</div>

				<div>
					<label for="loop">
						Loop
						(<a :href="ppRef('loop')" target="_blank">Ref</a>)
					</label>
					<input type="checkbox" id="loop" v-model="playerVars.loop">
				</div>

				<div>
					<label for="modest-branding">
						Modest Branding
						(<a :href="ppRef('modestbranding')" target="_blank">Ref</a>)
					</label>
					<input type="checkbox" id="modest-branding" v-model="playerVars.modestbranding">
				</div>

				<div>
					<label for="playsinline">
						Plays Inline
						(<a :href="ppRef('playsinline')" target="_blank">Ref</a>)
					</label>
					<input type="checkbox" id="playsinline" v-model="playerVars.playsinline">
				</div>

				<div>
					<label for="rel">
						Rel
						(<a :href="ppRef('rel')" target="_blank">Ref</a>)
					</label>
					<input type="checkbox" id="rel" v-model="playerVars.rel">
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { computed, ref } from "vue"
import VueYtframe from "../../lib/VueYtframe.vue"

const videoId = ref("")
const videoUrl = ref("")

const height = ref(400)
const width = ref(600)

const playerParameterRef = "https://developers.google.com/youtube/player_parameters#%s"

const ppRef = (key) => {
	return playerParameterRef.replace("%s", key)
}

const playerVars = ref({
	autoplay: null,
	cc_lang_pref: null,
	cc_load_policy: null,
	color: null,
	controls: null,
	disablekb: null,
	enablejsapi: null,
	end: null,
	fs: null,
	hl: null,
	iv_load_policy: null,
	listType: null,
	loop: null,
	modestbranding: null,
	origin: window.location.origin,
	// playlist: playlist.value,
	playsinline: null,
	rel: null,
	start: null
})

const playerParameters = computed(() => {
	const obj = {}
	for (const [key, value] of Object.entries(playerVars.value)) {
		if (value !== null) {
			if (typeof value === "boolean") {
				obj[key] = value ? 1 : 0
			} else {
				obj[key] = value
			}
		}
	}
	return obj
})

const yt = ref(null)
const destroyPlayer = () => {
	if (yt.value) {
		yt.value.destroy()
		videoId.value = null
		videoUrl.value = null

	}
}
</script>
<style lang="scss">
.playground {
	font-size: .875rem;
	overflow: auto;
	padding: 1rem 1rem 20rem;

	.player {
		margin-block: 1rem;
		border-radius: 4px;
		border: 1px solid grey;
		width: fit-content;
	}

	.actions, .props {
		max-width: 600px;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin-bottom: 1rem;
	}

	.title {
		font-size: 1rem;
		font-weight: 500;
		margin-bottom: .5rem;
	}

	.text-input {
		position: relative;
		// width: fit-content;
	}

	input {
		font-size: .875rem;
		border-radius: 4px;
		padding: .3rem 1.5rem .3rem .3rem;
		margin-bottom: .5rem;
	}

	input[type="text"], input[type="url"] {
		width: 100%;
	}

	.mdi-close {
		position: absolute;
		color: green;
		font-size: 1rem;
		top: 20%;
		right: 3%;
		cursor: pointer;
	}

	.no-value {
		padding: 1rem;
	}

	ul {
		margin-bottom: 1rem;
		padding-left: 1rem;

		li {
			margin-bottom: .5rem;
		}
	}

	.player-parameters {
		&>div {
			display: flex;
			align-items: center;
		}

		label {
			width: 150px;
			min-width: 150px;
		}

		input[type="checkbox"] {
			width: 18px;
			height: 18px;
		}
	}

	a {
		color: darkgreen;
		text-decoration: underline;
	}
}

body.theme--dark {
	a {
		color: var(--vue-color)
	}
}
</style>
