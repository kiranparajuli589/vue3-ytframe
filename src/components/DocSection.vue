<template>
	<section>
		<h2 :id="getTitleID(docItem.title)">{{docItem.title}}</h2>
		<div class="content">
			<div v-if="docItem.content" v-html="docItem.content" />
			<slot />
		</div>
		<table v-if="docItem.table">
			<thead>
			<tr>
				<th v-for="(header, index) in docItem.table.headers" :key="index">{{header}}</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="(row, index) in docItem.table.rows" :key="index">
				<td v-for="(cell, index) in row" :key="index" v-html="cell"/>
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
		required: true
	}
})
</script>
<style scoped lang="sass">
section
	max-width: 800px
	margin: 0 auto
</style>
