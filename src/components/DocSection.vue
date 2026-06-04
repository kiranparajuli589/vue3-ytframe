<template>
	<section class="mx-auto max-w-[800px]">
		<h2 :id="getTitleID(docItem.title)">{{ docItem.title }}</h2>
		<div class="content">
			<div v-if="docItem.content" v-html="docItem.content" />
			<slot />
		</div>
		<table v-if="docItem.table">
			<thead>
				<tr>
					<th v-for="(header, index) in docItem.table.headers" :key="index">{{ header }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, index) in docItem.table.rows" :key="index">
					<td v-for="(cell, cellIndex) in row" :key="cellIndex" v-html="cell" />
				</tr>
			</tbody>
		</table>
	</section>
</template>
<script setup>
import {getTitleID} from "../helper.js"

defineProps({
	docItem: {
		type: Object,
		required: true,
	},
})
</script>
