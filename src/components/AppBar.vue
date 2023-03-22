<template>
	<header class="app-bar">
		<div class="app-bar--head">
			<div class="mdi mdi-youtube" />
			<div class="app-bar--title">Vue3 Ytframe</div>
		</div>
		<div class="app-bar--actions">
			<div class="link" @click="push({name: 'Home'})">Home</div>
			<div class="link" @click="push({name: 'Docs'})">Docs</div>
			<div class="link" @click="push({name: 'Playground'})">Playground</div>
			<div class="link" @click="push({name: 'About'})">About</div>
			<div class="separator" />
			<div class="theme-select" @click="toggleDark()" title="Toggle Theme">
				<div v-if="isDark" class="mdi mdi-weather-night"/>
				<div v-else class="mdi mdi-weather-sunny"/>
			</div>
			<a class="icon-link" href="https://github.com/kiranparajuli589/vue3-ytframe" title="GitHub" target="_blank">
				<div class="mdi mdi-github" />
			</a>
		</div>
	</header>
</template>
<script setup>
import useAppStore from "../composables/useAppStore.js"
import {useRouter} from "vue-router"

const {isDark, toggleDark} = useAppStore()
const {push} = useRouter()
</script>
<style lang="scss">
.app-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	padding-inline: .5rem;

	&--logo {
		height: 100%;
	}

	.mdi-youtube {
		color: var(--vue-color);
		font-size: 3rem;
	}

	&--title {
		font-size: clamp(1rem , 1.5vw, 1.5rem);
		font-weight: 500;
		margin-left: .5rem;
	}

	&--actions, &--head {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	&--actions {
		& > div, a {
			margin: 0 .4rem;
		}

		& > .link {
			font-size: clamp(.875rem , 1.5vw, 1rem);
			font-weight: 500;
			cursor: pointer;

			&:hover {
				color: #34ab38;
			}
		}

		.icon-link {
			text-decoration: none;
		}

		.mdi-github {
			font-size: 1.6rem;
			cursor: pointer;
		}

		.separator {
			width: 1px;
			height: 1.5rem;
			background-color: grey;
		}

		.theme-select {
			position: relative;
			outline: 1px solid grey;
			border-radius: 24px;
			width: 40px;
			height: 22px;
			cursor: pointer;

			&:hover {
				outline-width: 2px;
			}

			.mdi-weather-sunny {
				position: absolute;
				left: 4px;
				top: 2px;
			}

			.mdi-weather-night {
				position: absolute;
				right: 4px;
				bottom: 2px;
			}
		}
	}
}
</style>
