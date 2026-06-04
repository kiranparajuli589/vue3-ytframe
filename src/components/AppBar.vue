<template>
	<header class="app-bar">
		<RouterLink class="app-bar--head" :to="{name: 'Home'}">
			<div class="mdi mdi-youtube" aria-hidden="true" />
			<div class="app-bar--title">Vue3 Ytframe</div>
		</RouterLink>
		<nav class="app-bar--actions" aria-label="Primary">
			<RouterLink class="link" :to="{name: 'Home'}">Home</RouterLink>
			<RouterLink class="link" :to="{name: 'Docs'}">Docs</RouterLink>
			<RouterLink class="link" :to="{name: 'Playground'}">Playground</RouterLink>
			<RouterLink class="link" :to="{name: 'About'}">About</RouterLink>
			<div class="separator" />
			<button
				type="button"
				class="theme-select"
				:aria-pressed="isDark"
				:title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
				aria-label="Toggle theme"
				@click="toggleDark()"
			>
				<div v-if="isDark" class="mdi mdi-weather-night" aria-hidden="true" />
				<div v-else class="mdi mdi-weather-sunny" aria-hidden="true" />
			</button>
			<a
				class="icon-link"
				href="https://github.com/kiranparajuli589/vue3-ytframe"
				title="GitHub"
				target="_blank"
				rel="noopener noreferrer"
			>
				<div class="mdi mdi-github" aria-hidden="true" />
			</a>
		</nav>
	</header>
</template>
<script setup>
import useAppStore from "../composables/useAppStore.js"
import {RouterLink} from "vue-router"

const {isDark, toggleDark} = useAppStore()
</script>
<style lang="scss">
.app-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	padding-inline: .5rem;
	border-bottom: 1px solid grey;

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
		text-decoration: none;
	}

	&--actions {
		& > div, a {
			margin: 0 .4rem;
		}

		& > .link {
			font-size: clamp(.875rem , 1.5vw, 1rem);
			font-weight: 500;
			cursor: pointer;
			color: inherit;
			text-decoration: none;

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
			border: 0;
			padding: 0;
			background: transparent;
			color: inherit;
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
