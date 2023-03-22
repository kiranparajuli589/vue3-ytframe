module.exports = {
	extends: [
		"stylelint-config-standard",
		"stylelint-scss",
		"stylelint-config-recommended-scss",
		"stylelint-config-recommended-vue"
	],
	overrides: [{
		files: ["**/*.scss"],
		customSyntax: "postcss-scss"
	}],
	rules: {
		"selector-list-comma-space-after": "always",
		"selector-list-comma-newline-after": null,
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
		"**/*.gif"
	]
}
