<template>
	<aside class="docs-nav">
		<h2 class="docs-nav--title">Docs</h2>
		<ul class="docs-nav--list">
			<li v-for="(doc, n) in docItems" :key="n"
				class="docs-nav--item"
			>
				<header>{{doc.title}}</header>
				<ul class="docs-nav--inner-list">
					<li v-for="(item, index) in doc.items" :key="index"
						class="docs-nav--inner-item"
						@click="scrollToItem(item.title)"
					>
						<header>{{item.title}}</header>
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
			{title: "Playground"},
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
	width: 200px;
	padding: 1rem;
	height: 100%;
	border-right: 1px solid grey;

	&--title {
		margin-bottom: 2rem;
	}

	&--list {
		list-style: none;
	}

	&--item {
		margin-bottom: 1.5rem;
	}

	&--item > header {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 1em;
		border-bottom: 1px solid grey;
		width: fit-content;
		padding-inline: .2rem;
	}

	&--inner-list {
		list-style: none;
		padding-left: .2rem;
	}

	&--inner-item {
		margin-bottom: 0.7rem;
		cursor: pointer;
	}
}
</style>
