<template>
	<div class="about">
		<h2>About Vue3-Ytframe</h2>
		<hr>
		<div>Name: <span>{{pkg.name}}</span></div>
		<div>Version: <span>{{pkg.version}}</span></div>
		<div>Description: <span>{{pkg.description}}</span></div>
		<div>Homepage: <span><a :href="pkg.homepage" target="_blank">{{pkg.homepage}}</a></span></div>
		<div>Repository: <span><a :href="pkg.repository.url" target="_blank">{{pkg.repository.url}}</a></span></div>
		<div>Issues: <span><a :href="pkg.bugs.url" target="_blank">{{pkg.bugs.url}}</a></span></div>
		<div>Author: <span>{{pkg.author}}</span></div>
		<div>License: <span>{{pkg.license}}</span></div>
	</div>
</template>
<script setup>
import pkg from "../../package.json"
</script>
<style lang="scss">
.about {
	max-width: 600px;
	margin: 0 auto;

	h2 {
		margin-top: 4rem;
		margin-bottom: 1rem;
	}

	hr {
		margin-bottom: 2rem;
	}

	div {
		margin-bottom: .5rem;

		span {
			font-weight: 500;
		}
	}
}
</style>
