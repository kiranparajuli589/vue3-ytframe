<template>
	<aside class="docs-nav">
		<h2 class="docs-nav--title">Docs</h2>
		<ul class="docs-nav--list">
			<li v-for="(doc, n) in docItems" :key="n" class="docs-nav--group">
				<header class="docs-nav--group-title">{{ doc.title }}</header>
				<ul class="docs-nav--inner-list">
					<li v-for="(item, index) in doc.items" :key="index">
						<button type="button" class="docs-nav--link" @click="scrollToItem(item.title)">
							{{ item.title }}
						</button>
					</li>
				</ul>
			</li>
		</ul>
	</aside>
</template>
<script setup>
import { ref } from "vue"
import {getTitleID} from "../helper.js"
const docItems = ref([
	{
		title: "Introduction",
		items: [
			{
				title: "Why VueYtframe?",
			},
			{
				title: "Installation",
			},
			{
				title: "Getting Started",
			}
		]
	},
	{
		title: "API",
		items: [
			{title: "Props"},
			{title: "Events"},
			{title: "Methods"},
		]
	},
	{
		title: "Illustrations",
		items: [
			{title: "Examples"},
		]
	}
])

const scrollToItem = (title) => {
	const el = document.getElementById(getTitleID(title))
	el.scrollIntoView({behavior: "smooth", block: "center"})
}
</script>
<style lang="scss">
.docs-nav {
	position: absolute;
	width: 220px;
	padding: 1.5rem 1rem;
	height: 100%;
	overflow-y: auto;
	border-right: 1px solid var(--border);
	background: var(--surface-2);

	@media only screen and (width <= 600px) {
		display: none;
	}

	&--title {
		font-size: 1.4rem;
		font-weight: 800;
		letter-spacing: -.5px;
		margin-bottom: 1.5rem;
	}

	&--list {
		list-style: none;
	}

	&--group {
		margin-bottom: 1.5rem;
	}

	&--group-title {
		font-size: .75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: .06em;
		color: var(--muted);
		margin-bottom: .5rem;
		padding-inline: .6rem;
	}

	&--inner-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: .15rem;
	}

	&--link {
		display: block;
		width: 100%;
		text-align: left;
		font: inherit;
		font-size: .9rem;
		color: inherit;
		padding: .4rem .6rem;
		border: 0;
		border-left: 2px solid transparent;
		border-radius: 6px;
		background: transparent;
		cursor: pointer;
		transition: background .15s, color .15s, border-color .15s;

		&:hover {
			background: var(--surface);
			color: var(--vue-color);
			border-left-color: var(--vue-color);
		}
	}
}
</style>
