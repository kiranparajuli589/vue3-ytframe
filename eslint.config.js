import js from "@eslint/js"
import pluginVue from "eslint-plugin-vue"
import globals from "globals"

export default [
	js.configs.recommended,
	...pluginVue.configs["flat/essential"],
	{
		files: ["**/*.{js,vue}"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.browser,
			},
		},
		rules: {
			indent: ["error", "tab"],
			"linebreak-style": "off",
			quotes: ["error", "double"],
			semi: ["error", "never"],
		},
	},
]
