<template>
	<div class="home-page">
		<div class="home-page--tagline">
			A YouTube Iframe API Wrapper
		</div>
		<div class="home-page--subtitle">
			An easy to use extension to embed YouTube videos into web using the full power provided by the Iframe API.
		</div>
		<div class="home-page--actions">
			<div class="button">
				<div class="mdi mdi-motion-play-outline" />
				<span>Why VueYtframe</span>
			</div>

			<div class="button">
				Get Started
				<div class="mdi mdi-arrow-right-bold-box-outline" />
			</div>

			<div class="button">Install</div>
		</div>
	</div>
</template>
<style lang="scss">
.home-page {
	&--tagline {
		padding-block: 20vh 5vh;
		text-align: center;
		font-size: clamp(20px, 5vw, 76px);
		line-height: 1.25;
		font-weight: 900;
		letter-spacing: -1.5px;
		max-width: 960px;
		margin: 0 auto;
		background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	&--subtitle {
		text-align: center;
		font-size: clamp(.875rem, 1.5vw, 1.2rem);
		margin-bottom: 4vh;
	}

	&--actions {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-block: 1rem;
		flex-wrap: wrap;

		& > .button {
			margin: 1rem;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			padding-inline: 1rem;
			border-radius: 6px;
			font-size: clamp(.8rem, 1.5vw, 1rem);
			min-height: 40px;
			cursor: pointer;
			background: #f1f1f1;

			&:hover {
				background: #e1e1e1;
			}

			.mdi {
				font-size: 1.6rem;
				margin: 0 .5rem;
			}

			.mdi-arrow-right-bold-box-outline {
				margin-right: 0
			}

			.mdi-motion-play-outline {
				margin-left: 0
			}
		}

		.button:nth-child(1) {
			background: var(--vue-color);
			color: white;

			&:hover {
				background: #339066;
			}
		}
	}
}

body.theme--dark {
	.home-page {
		&--tagline {
			background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		&--actions {
			.button:nth-child(2), .button:nth-child(3) {
				background: #3a3939;
				color: white;

				&:hover {
					background: #2f2f2f;
				}
			}
		}
	}
}
</style>
