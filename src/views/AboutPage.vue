<template>
	<div class="about">
		<section class="about__card">
			<header class="about__head">
				<img class="about__logo" :src="logo" alt="vue3-ytframe logo">
				<div class="about__heading">
					<h2 class="about__name">{{ pkg.name }}</h2>
					<p class="about__desc">{{ pkg.description }}</p>
				</div>
				<span class="about__version">v{{ pkg.version }}</span>
			</header>

			<dl class="about__grid">
				<div class="about__row">
					<dt>Author</dt>
					<dd>{{ pkg.author }}</dd>
				</div>
				<div class="about__row">
					<dt>License</dt>
					<dd>{{ pkg.license }}</dd>
				</div>
				<div class="about__row">
					<dt>Homepage</dt>
					<dd><a :href="pkg.homepage" target="_blank" rel="noopener noreferrer">{{ pkg.homepage }}</a></dd>
				</div>
				<div class="about__row">
					<dt>Repository</dt>
					<dd><a :href="pkg.repository.url" target="_blank" rel="noopener noreferrer">{{ pkg.repository.url }}</a></dd>
				</div>
				<div class="about__row">
					<dt>Issues</dt>
					<dd><a :href="pkg.bugs.url" target="_blank" rel="noopener noreferrer">{{ pkg.bugs.url }}</a></dd>
				</div>
			</dl>

			<div class="about__links">
				<a class="about__btn" :href="pkg.repository.url" target="_blank" rel="noopener noreferrer">
					<span class="mdi mdi-github" aria-hidden="true" /> GitHub
				</a>
				<a class="about__btn" href="https://www.npmjs.com/package/vue3-ytframe" target="_blank" rel="noopener noreferrer">
					<span class="mdi mdi-npm" aria-hidden="true" /> npm
				</a>
			</div>
		</section>
	</div>
</template>
<script setup>
import pkg from "../../package.json"
import logo from "../assets/youtube.svg"
</script>
<style lang="scss">
.about {
	max-width: 720px;
	margin: 0 auto;
	padding: 3rem 1rem 6rem;

	&__card {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 1.75rem;
		box-shadow: 0 1px 2px rgb(0 0 0 / 4%);
	}

	&__head {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
		padding-bottom: 1.5rem;
		margin-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	&__logo {
		width: 56px;
		height: 56px;
	}

	&__heading {
		flex: 1;
		min-width: 200px;
	}

	&__name {
		font-size: clamp(1.4rem, 3vw, 2rem);
		font-weight: 800;
		letter-spacing: -.5px;
	}

	&__desc {
		margin-top: .25rem;
		color: var(--muted);
	}

	&__version {
		font-weight: 700;
		font-size: .85rem;
		color: var(--vue-color);
		background: rgb(66 184 131 / 12%);
		border: 1px solid rgb(66 184 131 / 30%);
		padding: .25rem .7rem;
		border-radius: 999px;
		white-space: nowrap;
	}

	&__grid {
		display: grid;
		gap: .25rem;
	}

	&__row {
		display: grid;
		grid-template-columns: 130px 1fr;
		gap: 1rem;
		align-items: baseline;
		padding: .6rem .25rem;
		border-radius: 8px;

		&:hover {
			background: var(--surface-2);
		}

		dt {
			font-weight: 600;
			color: var(--muted);
		}

		dd {
			font-weight: 500;
			overflow-wrap: anywhere;
		}

		@media only screen and (width <= 480px) {
			grid-template-columns: 1fr;
			gap: .15rem;
		}
	}

	&__links {
		display: flex;
		flex-wrap: wrap;
		gap: .75rem;
		margin-top: 1.75rem;
	}

	&__btn {
		display: inline-flex;
		align-items: center;
		gap: .45rem;
		font-weight: 600;
		text-decoration: none;
		color: inherit;
		padding: .5rem 1rem;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: var(--surface-2);
		transition: border-color .15s, color .15s;

		&:hover {
			border-color: var(--vue-color);
			color: var(--vue-color);
		}

		.mdi {
			font-size: 1.2rem;
		}
	}

	a {
		color: var(--vue-color);
	}
}
</style>
