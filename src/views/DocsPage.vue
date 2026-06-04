<template>
	<div
		class="docs relative pb-12"
		:style="{ height: `calc(100vh - ${appBarHeight} - ${footerHeight})` }"
	>
		<a href="#docs-main" class="skip-link">Skip to documentation content</a>
		<DocsNav />
		<main
			id="docs-main"
			class="docs-content overflow-auto px-6 pb-[var(--docs-footer-pad,0)] pl-[244px] max-[600px]:pl-5"
			:style="{
				'--docs-footer-pad': footerHeight,
				height: `calc(100vh - ${appBarHeight} - ${footerHeight})`,
			}"
			tabindex="-1"
			aria-label="Documentation"
		>
			<DocSection :doc-item="WhyVueYtframe" />
			<DocSection :doc-item="Installation" />
			<DocSection :doc-item="GettingStarted">
				<CodeBlock :code="MinimalExample" />
				<div class="mb-4">
					<p class="font-medium text-[var(--text-secondary)]">Output</p>
					<div class="max-w-[800px] h-[400px]">
						<VueYtframe
							video-id="PvIL-Ycz6HI"
							:player-vars="{ autoplay: 0, listType: 'user_uploads' }"
						/>
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
					<VueYtframe
						v-for="id in videosSet"
						:key="id"
						:video-id="id"
						@state-change="onStateChange"
						ref="yt"
						:player-vars="{ autoplay: 0, listType: 'user_uploads' }"
						height="300"
					/>
				</div>
			</DocSection>
		</main>
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

const prefersReducedMotion = () =>
	window.matchMedia("(prefers-reduced-motion: reduce)").matches

onMounted(async () => {
	await nextTick()
	initializeCodeCopy()
	initializeHeaderRefs()
	enhanceExternalLinks()
	hljs.highlightAll()
	scrollToHeadingIfRefExists()
})

const initializeCodeCopy = () => {
	document.querySelectorAll(".docs-content pre code").forEach((codeBlock) => {
		const pre = codeBlock.parentNode
		if (!pre || pre.querySelector(".copy-button")) return
		const copyButton = document.createElement("button")
		copyButton.type = "button"
		copyButton.classList.add("copy-button")
		copyButton.setAttribute("aria-label", "Copy code to clipboard")
		copyButton.innerHTML = "<span class=\"mdi mdi-content-copy\" aria-hidden=\"true\" />"
		pre.appendChild(copyButton)
		copyButton.addEventListener("click", async () => {
			await navigator.clipboard.writeText(codeBlock.innerText)
			copyButton.setAttribute("aria-label", "Copied to clipboard")
			setTimeout(() => {
				copyButton.setAttribute("aria-label", "Copy code to clipboard")
			}, 2000)
		})
	})
}

const initializeHeaderRefs = () => {
	document.querySelectorAll(".docs-content h2").forEach((header) => {
		if (header.querySelector(".header-link")) return
		const title = header.textContent?.trim() ?? ""
		const link = document.createElement("a")
		link.classList.add("header-link")
		link.setAttribute("aria-label", `Copy link to section: ${title}`)
		link.innerHTML = "<span class=\"mdi mdi-link-variant\" aria-hidden=\"true\" />"
		link.href = `/vue3-ytframe/#/docs/ref=${getTitleID(title)}`
		header.appendChild(link)
	})
}

const enhanceExternalLinks = () => {
	document.querySelectorAll(".docs-content a[target=\"_blank\"]").forEach((anchor) => {
		if (anchor.getAttribute("rel")?.includes("noopener")) return
		const rel = anchor.getAttribute("rel") ?? ""
		anchor.setAttribute("rel", `${rel} noopener noreferrer`.trim())
	})
}

const { currentRoute } = useRouter()

const scrollToHeading = (headingId) => {
	const header = document.getElementById(headingId)
	if (header) {
		setTimeout(() => {
			header.scrollIntoView({
				behavior: prefersReducedMotion() ? "auto" : "smooth",
				block: "start",
			})
			document.getElementById("docs-main")?.focus({preventScroll: true})
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

.docs-content table tbody tr td:first-child {
	color: var(--vue-color);
	background-color: var(--code-bg);
	font-weight: 600;
	font-family: var(--font-mono);
	font-size: 0.875em;
}
</style>
