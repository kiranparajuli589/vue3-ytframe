<template>
	<div class="docs">
		<DocsNav />
		<div class="docs-content">
			<DocSection :doc-item="WhyVueYtframe" />
			<DocSection :doc-item="Installation" />
			<DocSection :doc-item="GettingStarted">
				<CodeBlock :code="MinimalExample" />
				<div>
					<p>Output</p>
					<div class="player">
						<VueYtframe video-id="PvIL-Ycz6HI" :player-vars="{ autoplay: 0, listType: 'user_uploads' }" />
					</div>
				</div>
			</DocSection>
			<DocSection :doc-item="ComponentProps" />
			<DocSection :doc-item="ComponentEvents" />
			<DocSection :doc-item="ComponentMethods" />
			<DocSection :doc-item="ExampleSection">
				<div>
					<h3>1. Basic Usage</h3>
					<p>
						With the use of the event <code>onStateChange</code> the following piece of code
						will not allow two players to run concurrently in the same page.
					</p>
					<CodeBlock :code="Example1" />
				</div>
			</DocSection>
		</div>
	</div>
</template>
<script setup>
import DocsNav from "../components/DocsNav.vue"
import { onMounted, ref, watch } from "vue"
import hljs from "highlight.js"
import { useRouter } from "vue-router"
import {
	ComponentEvents, ComponentMethods,
	ComponentProps,
	Example1, ExampleSection, GettingStarted,
	getTitleID,
	Installation,
	MinimalExample,
	WhyVueYtframe
} from "../helper.js"
import CodeBlock from "../components/CodeBlock.vue"
import DocSection from "../components/DocSection.vue"
import VueYtframe from "../../lib/VueYtframe.vue"

const appBarHeight = ref(0)
const footerHeight = ref(0)

onMounted(() => {
	waitTillAppBarAndFooterLoads()
		.then(() => {
			handleResize()
			window.addEventListener("resize", handleResize)
			initializeCodeCopy()
			initializeHeaderRefs()
			hljs.highlightAll()
			scrollToHeadingIfRefExists()
		})
})

function handleResize() {
	appBarHeight.value = `${document.querySelector(".app-bar").offsetHeight.toString()}px`
	footerHeight.value = `${document.querySelector(".footer").offsetHeight.toString()}px`
}

function waitTillAppBarAndFooterLoads() {
	return new Promise((resolve) => {
		let appBar = document.querySelector(".app-bar")
		let footer = document.querySelector(".footer")
		if (appBar && footer) {
			resolve()
		} else {
			setTimeout(() => {
				waitTillAppBarAndFooterLoads()
					.then(() => {
						resolve()
					})
			}, 100)
		}
	})
}

const initializeCodeCopy = () => {
	const codeBlocks = document.querySelectorAll("pre code")
	codeBlocks.forEach((codeBlock) => {
		const copyButton = document.createElement("button")
		copyButton.classList.add("copy-button")
		copyButton.innerHTML = "<span class=\"mdi mdi-content-copy\" />"
		codeBlock.parentNode.appendChild(copyButton)
		copyButton.addEventListener("click", () => {
			navigator.clipboard.writeText(codeBlock.innerText)
		})
	})
}

const initializeHeaderRefs = () => {
	const headers = document.querySelectorAll(".docs-content h2")
	headers.forEach((header) => {
		const link = document.createElement("a")
		link.classList.add("header-link")
		link.innerHTML = "<span class=\"mdi mdi-link-variant\" />"
		link.href = `/vue3-ytframe/#/docs/ref=${getTitleID(header.innerText)}`
		header.appendChild(link)
	})
}

const { currentRoute } = useRouter()

const scrollToHeading = (headingId) => {
	const header = document.getElementById(headingId)
	console.log(header)
	if (header) {
		setTimeout(() => {
			header.scrollIntoView({ behavior: "smooth" })
		}, 100)
	}
}

// watch route param and scroll to the header
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

</script>
<style lang="scss">
.docs {
	height: calc(100vh - v-bind(appBarHeight) - v-bind(footerHeight));
	position: relative;
}

.docs-content {
	padding: 1rem 20px v-bind(footerHeight) 220px;
	height: calc(100vh - v-bind(appBarHeight) - v-bind(footerHeight));
	overflow: auto;

	@media only screen and (max-width: 600px) {
		padding-left: 1rem;
	}

	section {
		margin-bottom: 3rem;
	}

	h2 {
		margin-bottom: 2rem;
	}

	h3 {
		margin-bottom: 1rem;
	}

	p,
	li {
		margin-bottom: .8rem;
	}

	.content-list {
		padding-left: 1rem;
	}

	pre {
		margin-bottom: 1rem;
		position: relative;
	}

	pre>code {
		border-radius: 4px !important;
		background: #f0f0f0 !important;
		max-height: 50dvh;
	}

	pre>button {
		position: absolute;
		right: 1%;
		top: 8px;
		font-size: 12px;
		padding: .2rem;
		cursor: pointer;
	}

	.header-link {
		font-size: 1.2rem;
		padding-inline: .4rem;
		cursor: pointer;
	}

	table {
		border: 1px solid grey;

		th {
			text-align: left;
		}

		td,
		th {
			padding: .5rem;
			border: 1px solid grey;

			code {
				outline: 1px solid grey;
				border-radius: 6px;
				padding: .2rem .4rem;
			}
		}
	}
}

body.theme--dark {
	pre>code {
		background: #272727 !important;
	}

	pre>button {
		color: #fff;
		background: #1a1a1a;
	}
}

.player {
	max-width: 800px;
	height: 400px;
}
</style>
