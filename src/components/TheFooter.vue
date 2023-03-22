<template>
	<div class="footer">
		<div>Released under the <span class="bold">GPL-3 License</span></div>
		<div>Copyright <span class="mdi mdi-copyright"/> 2022-2023 Kiran Parajuli</div>
	</div>
</template>
<style lang="scss">
.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	text-align: center;
	font-size: 12px;
	padding: 1rem .5rem;
	background-color: #f5f5f5;
	font-weight: 200;
	.bold {
		font-weight: 500;
	}
}

body.theme--dark {
	.footer {
		background-color: #333;
		color: #fff;
	}
}
</style>
