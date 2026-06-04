<template>
	<aside class="docs-nav absolute h-full w-[220px] overflow-y-auto border-r border-border bg-surface-2 p-6 max-[600px]:hidden">
		<h2 class="mb-6 text-2xl font-extrabold tracking-tight">Docs</h2>
		<ul class="list-none">
			<li v-for="(doc, n) in docItems" :key="n" class="mb-6">
				<header class="mb-2 px-2.5 text-xs font-bold uppercase tracking-wider text-muted">
					{{ doc.title }}
				</header>
				<ul class="flex list-none flex-col gap-0.5">
					<li v-for="(item, index) in doc.items" :key="index">
						<button
							type="button"
							class="block w-full cursor-pointer rounded-md border-0 border-l-2 px-2.5 py-1.5 text-left text-[0.9rem] transition-colors"
							:class="isActive(item.title)
								? 'border-accent bg-surface font-semibold text-accent'
								: 'border-transparent bg-transparent text-inherit hover:border-accent hover:bg-surface hover:text-accent'"
							:aria-current="isActive(item.title) ? 'location' : undefined"
							@click="scrollToItem(item.title)"
						>
							{{ item.title }}
						</button>
					</li>
				</ul>
			</li>
		</ul>
	</aside>
</template>
<script setup>
import {ref} from "vue"
import {useRouter} from "vue-router"
import useDocsActiveSection from "../composables/useDocsActiveSection.js"
import {getTitleID} from "../helper.js"

const router = useRouter()
const {activeId} = useDocsActiveSection()

const docItems = ref([
	{
		title: "Introduction",
		items: [
			{title: "Why VueYtframe?"},
			{title: "Installation"},
			{title: "Getting Started"},
		],
	},
	{
		title: "API",
		items: [
			{title: "Props"},
			{title: "Events"},
			{title: "Methods"},
		],
	},
	{
		title: "Illustrations",
		items: [
			{title: "Examples"},
		],
	},
])

const isActive = (title) => activeId.value === getTitleID(title)

const scrollToItem = (title) => {
	const id = getTitleID(title)
	activeId.value = id
	router.push({name: "Docs", params: {ref: id}})
}
</script>
