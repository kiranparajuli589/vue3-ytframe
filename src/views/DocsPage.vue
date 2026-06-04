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
						will not allow two players to run concurrently.
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
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue"
import hljs from "highlight.js"
import { useRouter } from "vue-router"
import {
	getTitleID,
	ComponentEvents, ComponentMethods, ComponentProps,
	Example1, ExampleSection, GettingStarted,
	Installation, MinimalExample, WhyVueYtframe
} from "../helper.js"
import CodeBlock from "../components/CodeBlock.vue"
import DocSection from "../components/DocSection.vue"
import VueYtframe from "../../lib/VueYtframe.vue"

const appBarHeight = ref(0)
const footerHeight = ref(0)

onMounted(async () => {
	// The app bar and footer live in App.vue and are already mounted by now;
	// nextTick guarantees this view's own DOM is painted before we measure it.
	await nextTick()
	handleResize()
	window.addEventListener("resize", handleResize)
	initializeCodeCopy()
	initializeHeaderRefs()
	hljs.highlightAll()
	scrollToHeadingIfRefExists()
})

onUnmounted(() => {
	window.removeEventListener("resize", handleResize)
})

function handleResize() {
	const appBar = document.querySelector(".app-bar")
	const footer = document.querySelector(".footer")
	if (appBar) appBarHeight.value = `${appBar.offsetHeight}px`
	if (footer) footerHeight.value = `${footer.offsetHeight}px`
}

const initializeCodeCopy = () => {
	document.querySelectorAll("pre code").forEach((codeBlock) => {
		const pre = codeBlock.parentNode
		if (!pre || pre.querySelector(".copy-button")) return // idempotent
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
		if (header.querySelector(".header-link")) return // idempotent
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

const yt = ref(null)
const videosSet = [
	"KZNDqHI8AW4",
	"_60Q8Xg4Mp0",
]

// a handler where no two or more frames are allowed to play simultaneously
const onStateChange = (event) => {
	if (event.getPlayerState() === 1) {
		// control the frames using the template reference
		yt.value.forEach((video) => {
			if (video.getVideoUrl() !== event.getVideoUrl()) {
				video.pauseVideo()
			}
		})
	}
}
</script>
<style lang="scss">
.docs {
	height: calc(100vh - v-bind(appBarHeight) - v-bind(footerHeight));
	position: relative;
	padding-bottom: 3rem;
}

.docs-content {
	overflow: auto;
	padding: 1.5rem 1.5rem v-bind(footerHeight) 244px;
	height: calc(100vh - v-bind(appBarHeight) - v-bind(footerHeight));
	scroll-behavior: smooth;

	@media only screen and (width <= 600px) {
		padding-left: 1.25rem;
	}

	section {
		margin-bottom: 3.5rem;
	}

	h2 {
		display: flex;
		align-items: center;
		gap: .4rem;
		font-size: 1.7rem;
		font-weight: 800;
		letter-spacing: -.5px;
		margin-block: 1.5rem 1.25rem;
		padding-bottom: .5rem;
		border-bottom: 1px solid var(--border);
	}

	h3 {
		font-size: 1.25rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	h4 {
		margin-bottom: .5rem;
	}

	p, li {
		margin-bottom: .8rem;
		line-height: 1.7;
	}

	.content-list {
		padding-left: 1.25rem;
	}

	/* ---- Code ---- */
	code {
		font-family: monospace;
		font-size: .85em;
		background: var(--code-bg);
		border: 1px solid var(--border);
		border-radius: 6px;
		padding: .12rem .4rem;
	}

	pre {
		position: relative;
		margin-bottom: 1.25rem;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: var(--code-bg);
		overflow: auto;
		max-height: 60vh;

		code {
			display: block;
			border: 0;
			background: transparent;
			padding: 1rem 1.1rem;
			font-size: .85rem;
			line-height: 1.6;
		}
	}

	.copy-button {
		position: absolute;
		top: .5rem;
		right: .5rem;
		display: inline-flex;
		align-items: center;
		font-size: .95rem;
		padding: .25rem .4rem;
		color: var(--muted);
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 7px;
		cursor: pointer;
		opacity: 0;
		transition: opacity .15s, color .15s, border-color .15s;

		&:hover {
			color: var(--vue-color);
			border-color: var(--vue-color);
		}
	}

	.copy-button:focus-visible,
	pre:hover .copy-button {
		opacity: 1;
	}

	/* ---- Heading anchors ---- */
	.header-link {
		display: inline-flex;
		font-size: 1.1rem;
		color: var(--muted);
		text-decoration: none;
		opacity: 0;
		transition: opacity .15s, color .15s;

		&:hover {
			color: var(--vue-color);
		}
	}

	h2:hover .header-link {
		opacity: 1;
	}

	/* ---- Tables ---- */
	table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 0;
		border: 1px solid var(--border);
		border-radius: 10px;
		overflow: hidden;
		margin-bottom: 1.25rem;

		th, td {
			padding: .65rem .8rem;
			border-bottom: 1px solid var(--border);
			text-align: left;
			vertical-align: top;
		}

		th {
			background: var(--surface-2);
			font-weight: 700;
		}

		tbody tr:last-child td {
			border-bottom: 0;
		}

		tbody tr:hover {
			background: var(--surface-2);
		}
	}

	iframe {
		margin-block: .5rem;
		border-radius: 10px;
	}

	/* ---- Note callout ---- */
	blockquote.doc-note {
		margin: 1.25rem 0 1.5rem;
		padding: 1rem 1.25rem;
		border: 1px solid rgb(196 48 43 / 30%);
		border-left: 4px solid #c4302b;
		border-radius: 10px;
		background: rgb(196 48 43 / 8%);

		p {
			line-height: 1.8;

			code {
				padding: .1rem .3rem;
			}

			&:last-child {
				margin-bottom: 0;
			}
		}

		.mdi {
			vertical-align: middle;
			margin-right: .25rem;
		}
	}
}

body.theme--dark .docs-content blockquote.doc-note {
	background: rgb(196 48 43 / 15%);
}

.player {
	max-width: 800px;
	height: 400px;
}
</style>
