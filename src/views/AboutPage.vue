<template>
	<div class="about mx-auto max-w-[720px] px-4 pb-24 pt-12">
		<section class="rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-sm)]">
			<header class="mb-6 flex flex-wrap items-center gap-4 border-b border-border pb-6">
				<img class="h-14 w-14" :src="logo" alt="vue3-ytframe logo">
				<div class="min-w-[200px] flex-1">
					<h2 class="text-2xl font-extrabold tracking-tight sm:text-3xl">{{ pkg.name }}</h2>
					<p class="mt-1 text-muted">{{ pkg.description }}</p>
				</div>
				<span class="shrink-0 rounded-full border border-[var(--accent-border)] bg-[var(--accent-subtle)] px-3 py-1 text-sm font-bold text-accent">
					v{{ pkg.version }}
				</span>
			</header>

			<dl class="grid gap-1">
				<div
					v-for="row in metaRows"
					:key="row.label"
					class="grid grid-cols-1 gap-0.5 rounded-lg px-1 py-2.5 hover:bg-surface-2 max-[480px]:gap-0.5 min-[481px]:grid-cols-[130px_1fr] min-[481px]:gap-4 min-[481px]:items-baseline"
				>
					<dt class="font-semibold text-muted">{{ row.label }}</dt>
					<dd class="break-all font-medium min-[481px]:break-normal">
						<a
							v-if="row.href"
							:href="row.href"
							target="_blank"
							rel="noopener noreferrer"
						>{{ row.value }}</a>
						<template v-else>{{ row.value }}</template>
					</dd>
				</div>
			</dl>

			<div class="mt-7 flex flex-wrap gap-3">
				<a
					class="inline-flex items-center gap-2 rounded-[10px] border border-border bg-surface-2 px-4 py-2 font-semibold text-inherit no-underline transition-colors hover:border-accent hover:text-accent"
					:href="pkg.repository.url"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span class="mdi mdi-github text-xl" aria-hidden="true" /> GitHub
				</a>
				<a
					class="inline-flex items-center gap-2 rounded-[10px] border border-border bg-surface-2 px-4 py-2 font-semibold text-inherit no-underline transition-colors hover:border-accent hover:text-accent"
					href="https://www.npmjs.com/package/vue3-ytframe"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span class="mdi mdi-npm text-xl" aria-hidden="true" /> npm
				</a>
			</div>
		</section>
	</div>
</template>
<script setup>
import {computed} from "vue"
import pkg from "../../package.json"
import logo from "../assets/youtube.svg"

const metaRows = computed(() => [
	{label: "Author", value: pkg.author},
	{label: "License", value: pkg.license},
	{label: "Homepage", value: pkg.homepage, href: pkg.homepage},
	{label: "Repository", value: pkg.repository.url, href: pkg.repository.url},
	{label: "Issues", value: pkg.bugs.url, href: pkg.bugs.url},
])
</script>
