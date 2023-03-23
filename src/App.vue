<template>
	<div class="main-content">
		<AppBar />
		<router-view />
		<TheFooter />
	</div>
</template>
<script setup>
import useAppStore from "./composables/useAppStore.js"
import {onMounted, watch} from "vue"
import AppBar from "./components/AppBar.vue"
import TheFooter from "./components/TheFooter.vue"

const {isDark, setDark} = useAppStore()

onMounted(() => {
	let val = localStorage.getItem("isDark") === "true"
	setDark(val)
	handleDark(val)
})

function handleDark(val) {
	if (val) {
		document.body.classList.add("theme--dark")
	} else {
		document.body.classList.remove("theme--dark")
	}
}

watch(isDark, (val) => {
	handleDark(val)
})
</script>
<style lang="scss">
/* stylelint-disable-next-line */
@use "sass:meta";
/* stylelint-disable-next-line */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	font-family: Inter, sans-serif;

	--vue-color: #42b883;
}

body:not([theme-dark]) {
	/* stylelint-disable-next-line */
	@include meta.load-css("highlight.js/styles/github.css");
}


body.theme--dark {
	/* stylelint-disable-next-line */
	@include meta.load-css("highlight.js/styles/github-dark.css");

	background-color: #1a1a1a;
	color: #fff;
}

a {
	color: var(--vue-color);
}


/* width */
::-webkit-scrollbar {
	width: 10px; // for vertical scrollbars
	height: 10px; // for horizontal scrollbars
}

/* Track */
::-webkit-scrollbar-track {
	background: #d7d7d7;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #868686;
	border-radius: 24px;
	margin: 1px;
	border: 2px solid #d2d2d2;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #727272;
}
</style>
