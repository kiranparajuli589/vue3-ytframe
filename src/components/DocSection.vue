<template>
	<section
		class="mx-auto max-w-[800px]"
		:aria-labelledby="sectionHeadingId"
	>
		<h2 :id="sectionHeadingId">{{ docItem.title }}</h2>
		<div class="content">
			<div v-if="docItem.content" v-html="docItem.content" />
			<slot />
		</div>
		<table v-if="docItem.table">
			<caption class="sr-only">
				{{ docItem.title }} — property reference
			</caption>
			<thead>
				<tr>
					<th v-for="(header, index) in docItem.table.headers" :key="index" scope="col">
						{{ header }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, index) in docItem.table.rows" :key="index">
					<td
						v-for="(cell, cellIndex) in row"
						:key="cellIndex"
						:scope="cellIndex === 0 ? 'row' : undefined"
						v-html="cell"
					/>
				</tr>
			</tbody>
		</table>
	</section>
</template>
<script setup>
import {computed} from "vue"
import {getTitleID} from "../helper.js"

const props = defineProps({
	docItem: {
		type: Object,
		required: true,
	},
})

const sectionHeadingId = computed(() => getTitleID(props.docItem.title))
</script>
