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
