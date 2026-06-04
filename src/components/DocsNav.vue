<template>
	<aside class="docs-nav absolute h-full w-[220px] overflow-y-auto border-r border-border bg-surface-2 p-6 max-[600px]:hidden">
		<p id="docs-nav-heading" class="docs-nav__label mb-6">Docs</p>
		<nav aria-labelledby="docs-nav-heading">
			<ul class="list-none">
				<li v-for="(doc, n) in docItems" :key="n" class="mb-6">
					<p
						:id="`docs-nav-group-${n}`"
						class="docs-nav__group-label mb-2 px-2.5"
					>
						{{ doc.title }}
					</p>
					<ul
						class="flex list-none flex-col gap-0.5"
						:aria-labelledby="`docs-nav-group-${n}`"
					>
						<li v-for="(item, index) in doc.items" :key="index">
							<button
								type="button"
								class="docs-nav__link block w-full cursor-pointer rounded-md border-0 border-l-2 px-2.5 py-1.5 text-left text-[0.9375rem] leading-snug transition-colors"
								:class="isActive(item.title)
									? 'border-accent bg-surface font-semibold text-accent'
									: 'border-transparent bg-transparent font-normal text-[var(--text-secondary)] hover:border-accent hover:bg-surface hover:text-accent'"
								:aria-current="isActive(item.title) ? 'location' : undefined"
								@click="scrollToItem(item.title)"
							>
								{{ item.title }}
							</button>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
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
