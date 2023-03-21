<template>
	<div class="main-content">
		<AppBar />
		<hr />
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	font-family: Inter, sans-serif;

	--vue-color: #42b883;
}

body.theme--dark {
	background-color: #1a1a1a;
	color: #fff;
}
</style>
