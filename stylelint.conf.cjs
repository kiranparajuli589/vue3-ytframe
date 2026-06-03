module.exports = {
	extends: [
		"stylelint-config-standard-scss",
		"stylelint-config-recommended-vue",
	],
	rules: {
		"value-no-vendor-prefix": null,
		"property-no-vendor-prefix": null,
		"selector-class-pattern": null,
		"value-keyword-case": null,
	},
	ignoreFiles: [
		"**/*.js",
		"**/*.md",
		"**/*.png",
		"**/*.jpg",
		"**/*.gif",
		"docs/**",
	],
}
