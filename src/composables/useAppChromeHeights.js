import {nextTick, onMounted, onUnmounted, ref} from "vue"

export default function useAppChromeHeights() {
	const appBarHeight = ref("0px")
	const footerHeight = ref("0px")

	function handleResize() {
		const appBar = document.querySelector(".app-bar")
		const footer = document.querySelector(".footer")
		if (appBar) appBarHeight.value = `${appBar.offsetHeight}px`
		if (footer) footerHeight.value = `${footer.offsetHeight}px`
	}

	onMounted(async () => {
		await nextTick()
		handleResize()
		window.addEventListener("resize", handleResize)
	})

	onUnmounted(() => {
		window.removeEventListener("resize", handleResize)
	})

	return {appBarHeight, footerHeight}
}
