import js from "@eslint/js"
import pluginVue from "eslint-plugin-vue"
import tseslint from "typescript-eslint"
import vueParser from "vue-eslint-parser"
import globals from "globals"

export default [
	{
		ignores: ["dist/**", "docs/**", "node_modules/**"],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs["flat/essential"],
	{
		files: ["**/*.{js,ts,vue}"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			parser: vueParser,
			parserOptions: {
				parser: tseslint.parser,
			},
			globals: {
				...globals.browser,
				...globals.node,
				YT: "readonly",
			},
		},
		rules: {
			indent: ["error", "tab"],
			"linebreak-style": "off",
			quotes: ["error", "double"],
			semi: ["error", "never"],
			"@typescript-eslint/no-unused-vars": ["error", {argsIgnorePattern: "^_"}],
		},
	},
]
