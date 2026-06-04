<template>
	<header class="app-bar flex flex-wrap items-center justify-between border-b border-border px-2">
		<RouterLink class="app-bar--head flex flex-wrap items-center no-underline" :to="{name: 'Home'}">
			<span class="mdi mdi-youtube text-3xl text-accent" aria-hidden="true" />
			<span class="app-bar--title ml-2 text-base font-medium">Vue3 Ytframe</span>
		</RouterLink>
		<nav class="app-bar--actions flex flex-wrap items-center" aria-label="Primary">
			<RouterLink
				v-for="link in navLinks"
				:key="link.name"
				class="link mx-1.5 cursor-pointer text-sm no-underline text-(--text)! transition-colors duration-300 ease-out"
				:to="{ name: link.name }"
				active-class="text-accent! underline! underline-offset-4 font-bold! pointer-events-none!"
			>
				<span class="text-inherit"></span>{{ link.label }}
			</RouterLink>
			<div class="separator mx-1.5 h-6 w-px bg-border" />
			<button
				type="button"
				class="theme-select group relative mx-1.5 h-[22px] w-10 cursor-pointer overflow-hidden rounded-3xl border-0 bg-transparent p-0 text-inherit outline outline-1 outline-border transition-[outline-width,background-color] duration-300 ease-out hover:outline-2 theme-dark:bg-accent/10"
				:aria-pressed="isDark"
				:title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
				aria-label="Toggle theme"
				@click="toggleDark()"
			>
				<span
					class="theme-select__knob absolute top-0.5 z-0 size-[18px] rounded-full bg-accent/15 transition-[left,background-color] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:bg-accent/25"
					:class="isDark ? 'left-[calc(100%-1.125rem-2px)]' : 'left-0.5'"
					aria-hidden="true"
				/>
				<Transition
					mode="out-in"
					enter-active-class="theme-icon-enter-active"
					enter-from-class="theme-icon-enter-from"
					enter-to-class="theme-icon-enter-to"
					leave-active-class="theme-icon-leave-active"
					leave-from-class="theme-icon-leave-from"
					leave-to-class="theme-icon-leave-to"
				>
					<span
						v-if="isDark"
						key="moon"
						class="mdi mdi-weather-night theme-icon absolute inset-y-0 right-1 z-1 flex items-center text-[15px] text-accent"
						aria-hidden="true"
					/>
					<span
						v-else
						key="sun"
						class="mdi mdi-weather-sunny theme-icon absolute inset-y-0 left-1 z-1 flex items-center text-[15px] text-accent"
						aria-hidden="true"
					/>
				</Transition>
			</button>
			<a
				class="icon-link mx-1.5 no-underline"
				href="https://github.com/kiranparajuli589/vue3-ytframe"
				title="GitHub"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span class="mdi mdi-github cursor-pointer text-2xl" aria-hidden="true" />
			</a>
		</nav>
	</header>
</template>
<script setup>
import useAppStore from "../composables/useAppStore.js"
import {RouterLink} from "vue-router"

const {isDark, toggleDark} = useAppStore()

const navLinks = [
	{name: "Home", label: "Home"},
	{name: "Docs", label: "Docs"},
	{name: "Playground", label: "Playground"},
	{name: "About", label: "About"},
]
</script>
<style scoped>
.theme-icon-enter-active {
	transition:
		opacity 0.4s ease,
		transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.theme-icon-leave-active {
	transition:
		opacity 0.25s ease-in,
		transform 0.3s ease-in;
}

.theme-icon-enter-from,
.theme-icon-leave-to {
	opacity: 0;
	transform: scale(0.35) rotate(90deg);
}

.theme-icon-enter-to,
.theme-icon-leave-from {
	opacity: 1;
	transform: scale(1) rotate(0deg);
}

@media (prefers-reduced-motion: reduce) {
	.theme-icon-enter-active,
	.theme-icon-leave-active,
	.theme-select__knob {
		transition: none;
	}

	.theme-icon-enter-from,
	.theme-icon-leave-to {
		transform: none;
	}
}
</style>
