<template>
	<pre><code>{{code}}</code></pre>
</template>
<script setup>
defineProps({
	code: {
		type: String,
		required: true
	}
})
</script>
