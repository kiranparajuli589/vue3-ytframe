<template>
	<div
		class="docs relative pb-12"
		:style="{ height: `calc(100vh - ${appBarHeight} - ${footerHeight})` }"
	>
		<DocsNav />
		<div
			class="docs-content overflow-auto px-6 pb-(--docs-footer-pad,0) pl-[244px] max-[600px]:pl-5"
			:style="{
				'--docs-footer-pad': footerHeight,
				height: `calc(100vh - ${appBarHeight} - ${footerHeight})`,
			}"
		>
			<DocSection :doc-item="WhyVueYtframe" />
			<DocSection :doc-item="Installation" />
			<DocSection :doc-item="GettingStarted">
				<CodeBlock :code="MinimalExample" />
				<div class="mb-4">
					<p>Output</p>
					<div class="max-w-[800px] h-[400px]">
						<VueYtframe video-id="PvIL-Ycz6HI" :player-vars="{ autoplay: 0, listType: 'user_uploads' }" />
					</div>
				</div>
				<p>Controlling playback with a typed template ref:</p>
				<CodeBlock :code="TypeScriptRefExample" />
			</DocSection>
			<DocSection :doc-item="ComponentProps" />
			<DocSection :doc-item="ComponentEvents" />
			<DocSection :doc-item="ComponentMethods" />
			<DocSection :doc-item="ExampleSection">
				<div>
					<h3>1. Basic Usage</h3>
					<p>
						Using the <code>state-change</code> event, the following example ensures only one
						player plays at a time.
					</p>
					<CodeBlock :code="Example1" />

					<h4>Output</h4>
					<VueYtframe v-for="id in videosSet" :key="id" :video-id="id"
						@state-change="onStateChange" ref="yt"
						:player-vars="{ autoplay: 0, listType: 'user_uploads' }"
						height="300"
					/>
				</div>
			</DocSection>
		</div>
	</div>
</template>
<script setup>
import DocsNav from "../components/DocsNav.vue"
import { nextTick, onMounted, ref, watch } from "vue"
import useAppChromeHeights from "../composables/useAppChromeHeights.js"
import hljs from "highlight.js"
import { useRouter } from "vue-router"
import {
	getTitleID,
	ComponentEvents, ComponentMethods, ComponentProps,
	Example1, ExampleSection, GettingStarted,
	Installation, MinimalExample, TypeScriptRefExample, WhyVueYtframe
} from "../helper.js"
import CodeBlock from "../components/CodeBlock.vue"
import DocSection from "../components/DocSection.vue"
import VueYtframe from "../../lib/VueYtframe.vue"

const {appBarHeight, footerHeight} = useAppChromeHeights()

onMounted(async () => {
	await nextTick()
	initializeCodeCopy()
	initializeHeaderRefs()
	hljs.highlightAll()
	scrollToHeadingIfRefExists()
})

const initializeCodeCopy = () => {
	document.querySelectorAll("pre code").forEach((codeBlock) => {
		const pre = codeBlock.parentNode
		if (!pre || pre.querySelector(".copy-button")) return
		const copyButton = document.createElement("button")
		copyButton.type = "button"
		copyButton.classList.add("copy-button")
		copyButton.setAttribute("aria-label", "Copy code to clipboard")
		copyButton.innerHTML = "<span class=\"mdi mdi-content-copy\" aria-hidden=\"true\" />"
		pre.appendChild(copyButton)
		copyButton.addEventListener("click", () => {
			navigator.clipboard.writeText(codeBlock.innerText)
		})
	})
}

const initializeHeaderRefs = () => {
	document.querySelectorAll(".docs-content h2").forEach((header) => {
		if (header.querySelector(".header-link")) return
		const link = document.createElement("a")
		link.classList.add("header-link")
		link.setAttribute("aria-label", `Link to ${header.textContent}`)
		link.innerHTML = "<span class=\"mdi mdi-link-variant\" aria-hidden=\"true\" />"
		link.href = `/vue3-ytframe/#/docs/ref=${getTitleID(header.innerText)}`
		header.appendChild(link)
	})
}

const { currentRoute } = useRouter()

const scrollToHeading = (headingId) => {
	const header = document.getElementById(headingId)
	if (header) {
		setTimeout(() => {
			header.scrollIntoView({ behavior: "smooth" })
		}, 100)
	}
}

watch(() => currentRoute.value, (val) => {
	if (val.params.ref) {
		scrollToHeading(val.params.ref)
	}
})

const scrollToHeadingIfRefExists = () => {
	if (currentRoute.value.params.ref) {
		scrollToHeading(currentRoute.value.params.ref)
	}
}

const yt = ref(null)
const videosSet = [
	"KZNDqHI8AW4",
	"_60Q8Xg4Mp0",
]

const onStateChange = (player) => {
	if (player.getPlayerState() === 1) {
		yt.value.forEach((instance) => {
			if (instance.getVideoUrl() !== player.getVideoUrl()) {
				instance.pauseVideo()
			}
		})
	}
}
</script>
<style lang="css">
@reference "tailwindcss";
table tbody tr td:first-child {
	color: var(--vue-color);
	background-color: var(--code-bg);
	font-weight: 500;
}
</style>
