<template>
	<div class="playground">
		<header class="playground__header">
			<h2 class="playground__title">Playground</h2>
			<p class="playground__subtitle">
				Drop in a video, resize the frame, and toggle player parameters to see them live.
			</p>
		</header>

		<section class="stage">
			<div class="stage__frame" :class="{'stage__frame--empty': !videoId && !videoUrl}">
				<VueYtframe
					ref="yt"
					:video-id="videoId"
					:video-url="videoUrl"
					:height="height"
					:width="width"
					:player-vars="playerParameters"
				/>
				<div v-if="!videoId && !videoUrl" class="stage__empty">
					<span class="mdi mdi-youtube" aria-hidden="true" />
					<p>Enter a YouTube video ID or URL below to load the player.</p>
				</div>
			</div>
			<div v-if="yt && yt.player" class="stage__actions">
				<button type="button" class="btn btn--danger" @click="destroyPlayer()">
					<span class="mdi mdi-close-circle-outline" aria-hidden="true" />
					Destroy player
				</button>
			</div>
		</section>

		<section class="panel">
			<h3 class="panel__title">Video source</h3>
			<div class="grid">
				<div class="field">
					<label class="field__label" for="video-id">Video ID</label>
					<input id="video-id" class="field__input" type="text" placeholder="e.g. kGb9ftWR3l8" v-model="videoId">
				</div>
				<div class="field">
					<label class="field__label" for="video-url">Video URL</label>
					<input id="video-url" class="field__input" type="url" placeholder="https://youtu.be/…" v-model="videoUrl">
				</div>
				<div class="field">
					<label class="field__label" for="player-width">
						Width <span class="field__value">{{ width }} / 800</span>
					</label>
					<input id="player-width" class="slider" type="range" min="100" max="800" v-model="width">
				</div>
				<div class="field">
					<label class="field__label" for="player-height">
						Height <span class="field__value">{{ height }} / 600</span>
					</label>
					<input id="player-height" class="slider" type="range" min="100" max="600" v-model="height">
				</div>
			</div>
		</section>

		<section class="panel">
			<h3 class="panel__title">Player parameters</h3>
			<div class="params-grid">
				<div
					v-for="field in paramFields"
					:key="field.key"
					class="control"
					:class="{'control--toggle': field.type === 'checkbox'}"
				>
					<label class="control__label" :for="field.key">
						{{ field.label }}
						<a
							class="control__ref"
							:href="ppRef(field.refKey)"
							target="_blank"
							rel="noopener noreferrer"
							:title="`${field.label} reference`"
						>
							<span class="mdi mdi-open-in-new" aria-hidden="true" />
						</a>
					</label>

					<label v-if="field.type === 'checkbox'" class="toggle">
						<input :id="field.key" type="checkbox" v-model="playerVars[field.key]">
						<span class="toggle__slider" />
					</label>
					<input
						v-else
						:id="field.key"
						class="control__input"
						:type="field.type"
						v-model="playerVars[field.key]"
					>
				</div>
			</div>
		</section>
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

// Drives the parameter controls grid. `key` binds to playerVars; `refKey` is
// the anchor on the YouTube player-parameters reference page.
const paramFields = [
	{ key: "autoplay", refKey: "autoplay", label: "Autoplay", type: "checkbox" },
	{ key: "cc_lang_pref", refKey: "cc_lang_pref", label: "CC Lang Pref", type: "text" },
	{ key: "cc_load_policy", refKey: "cc_load_policy", label: "CC Load Policy", type: "checkbox" },
	{ key: "color", refKey: "color", label: "Color", type: "text" },
	{ key: "controls", refKey: "controls", label: "Controls", type: "checkbox" },
	{ key: "disablekb", refKey: "disablekb", label: "Disable KB", type: "checkbox" },
	{ key: "enablejsapi", refKey: "enablejsapi", label: "Enable JS API", type: "checkbox" },
	{ key: "start", refKey: "start", label: "Start (seconds)", type: "number" },
	{ key: "end", refKey: "end", label: "End (seconds)", type: "number" },
	{ key: "fs", refKey: "fs", label: "Fullscreen", type: "checkbox" },
	{ key: "hl", refKey: "hl", label: "Interface Language", type: "text" },
	{ key: "iv_load_policy", refKey: "iv_load_policy", label: "IV Load Policy", type: "checkbox" },
	{ key: "listType", refKey: "listType", label: "List Type", type: "text" },
	{ key: "loop", refKey: "loop", label: "Loop", type: "checkbox" },
	{ key: "modestbranding", refKey: "modestbranding", label: "Modest Branding", type: "checkbox" },
	{ key: "playsinline", refKey: "playsinline", label: "Plays Inline", type: "checkbox" },
	{ key: "rel", refKey: "rel", label: "Related Videos", type: "checkbox" },
]

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
	--pg-surface: #fff;
	--pg-surface-2: #f6f7f9;
	--pg-border: #e4e6ea;
	--pg-muted: #6b7280;
	--pg-stage: #f1f3f5;
	--pg-toggle-track: #cdd2d8;

	max-width: 1080px;
	margin: 0 auto;
	padding: 1.5rem 1rem 8rem;
	font-size: .9rem;

	&__header {
		margin-bottom: 1.5rem;
	}

	&__title {
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		font-weight: 800;
		letter-spacing: -.5px;
	}

	&__subtitle {
		margin-top: .35rem;
		color: var(--pg-muted);
		font-size: 1rem;
	}

	.panel {
		background: var(--pg-surface);
		border: 1px solid var(--pg-border);
		border-radius: 14px;
		padding: 1.25rem;
		margin-bottom: 1.25rem;
		box-shadow: 0 1px 2px rgb(0 0 0 / 4%);
	}

	.panel__title {
		font-size: 1rem;
		font-weight: 700;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: .5rem;

		&::before {
			content: "";
			width: 4px;
			height: 1.1em;
			border-radius: 2px;
			background: var(--vue-color);
		}
	}

	/* ---- Stage / preview ---- */
	.stage {
		margin-bottom: 1.25rem;

		&__frame {
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 240px;
			padding: 1.25rem;
			background: var(--pg-stage);
			border: 1px solid var(--pg-border);
			border-radius: 16px;
			overflow: hidden;

			iframe {
				border-radius: 10px;
				box-shadow: 0 10px 30px rgb(0 0 0 / 18%);
				max-width: 100%;
			}
		}

		&__frame--empty {
			border-style: dashed;
		}

		&__empty {
			text-align: center;
			color: var(--pg-muted);

			.mdi {
				font-size: 3.5rem;
				color: #c4302b;
				opacity: .8;
			}

			p {
				margin-top: .5rem;
			}
		}

		&__actions {
			display: flex;
			justify-content: center;
			margin-top: 1rem;
		}
	}

	/* ---- Buttons ---- */
	.btn {
		display: inline-flex;
		align-items: center;
		gap: .4rem;
		font: inherit;
		font-weight: 600;
		padding: .5rem .9rem;
		border-radius: 10px;
		border: 1px solid transparent;
		cursor: pointer;
		transition: background .15s, border-color .15s;
	}

	.btn--danger {
		color: #c4302b;
		background: rgb(196 48 43 / 8%);
		border-color: rgb(196 48 43 / 25%);

		&:hover {
			background: rgb(196 48 43 / 15%);
		}
	}

	/* ---- Generic fields ---- */
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem 1.25rem;

		@media (width <= 600px) {
			grid-template-columns: 1fr;
		}
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: .4rem;

		&__label {
			font-weight: 600;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: .5rem;
		}

		&__value {
			font-weight: 500;
			font-size: .8rem;
			color: var(--vue-color);
			background: rgb(66 184 131 / 12%);
			padding: .1rem .5rem;
			border-radius: 999px;
		}

		&__input {
			width: 100%;
		}
	}

	input[type="text"],
	input[type="url"],
	input[type="number"] {
		width: 100%;
		font: inherit;
		padding: .5rem .65rem;
		border-radius: 9px;
		border: 1px solid var(--pg-border);
		background: var(--pg-surface);
		color: inherit;
		transition: border-color .15s, box-shadow .15s;

		&::placeholder {
			color: var(--pg-muted);
			opacity: .7;
		}

		&:focus {
			outline: none;
			border-color: var(--vue-color);
			box-shadow: 0 0 0 3px rgb(66 184 131 / 18%);
		}
	}

	.slider {
		width: 100%;
		accent-color: var(--vue-color);
		cursor: pointer;
	}

	/* ---- Parameter controls ---- */
	.params-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: .75rem;
	}

	.control {
		display: flex;
		flex-direction: column;
		gap: .5rem;
		padding: .75rem .85rem;
		border: 1px solid var(--pg-border);
		border-radius: 11px;
		background: var(--pg-surface-2);
		transition: border-color .15s;

		&:hover {
			border-color: var(--vue-color);
		}

		&--toggle {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		&__label {
			font-weight: 600;
			display: inline-flex;
			align-items: center;
			gap: .35rem;
		}

		&__ref {
			color: var(--pg-muted);
			text-decoration: none;
			display: inline-flex;
			font-size: .85rem;

			&:hover {
				color: var(--vue-color);
			}
		}
	}

	/* ---- Toggle switch ---- */
	.toggle {
		position: relative;
		display: inline-block;
		width: 42px;
		height: 24px;
		flex-shrink: 0;

		input {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			margin: 0;
			opacity: 0;
			cursor: pointer;
		}

		&__slider {
			position: absolute;
			inset: 0;
			background: var(--pg-toggle-track);
			border-radius: 999px;
			transition: background .2s;

			&::before {
				content: "";
				position: absolute;
				width: 18px;
				height: 18px;
				top: 3px;
				left: 3px;
				background: #fff;
				border-radius: 50%;
				box-shadow: 0 1px 2px rgb(0 0 0 / 25%);
				transition: transform .2s;
			}
		}

		input:checked + .toggle__slider {
			background: var(--vue-color);

			&::before {
				transform: translateX(18px);
			}
		}

		input:focus-visible + .toggle__slider {
			outline: 2px solid var(--vue-color);
			outline-offset: 2px;
		}
	}

	a {
		color: darkgreen;
	}
}

body.theme--dark .playground {
	--pg-surface: #242424;
	--pg-surface-2: #1e1e1e;
	--pg-border: #383838;
	--pg-muted: #9ca3af;
	--pg-stage: #161616;
	--pg-toggle-track: #4a4a4a;

	a {
		color: var(--vue-color);
	}
}
</style>
