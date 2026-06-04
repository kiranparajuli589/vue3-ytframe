import {dirname, resolve} from "node:path"
import {fileURLToPath} from "node:url"
import {defineConfig} from "vitest/config"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"

const __dirname = dirname(fileURLToPath(import.meta.url))

const test = {
	environment: "happy-dom",
	include: ["lib/**/*.{test,spec}.{js,ts}"],
	coverage: {
		provider: "v8",
		include: ["lib/**/*.{js,ts,vue}"],
		exclude: ["lib/**/*.{test,spec}.*", "lib/**/*.d.ts"],
		thresholds: {
			statements: 80,
			branches: 80,
			functions: 80,
			lines: 80,
		},
	},
}

// https://vite.dev/config/
export default defineConfig(({command, mode}) => {
	if (command === "serve") {
		return {
			plugins: [vue()],
			test,
		}
	}

	if (mode === "lib") {
		return {
			plugins: [
				vue(),
				dts({
					tsconfigPath: resolve(__dirname, "tsconfig.json"),
					include: ["lib/**/*.ts", "lib/**/*.vue"],
					exclude: ["lib/**/*.{test,spec}.*"],
					entryRoot: "lib",
				}),
			],
			build: {
				lib: {
					entry: resolve(__dirname, "lib/index.ts"),
					name: "VueYtframe",
					fileName: (format) =>
						format === "umd" ? "ytframe.umd.cjs" : `ytframe.${format}.js`,
				},
				rollupOptions: {
					external: ["vue"],
					output: {
						exports: "named",
						globals: {
							vue: "Vue",
						},
					},
				},
			},
		}
	}

	return {
		base: "/vue3-ytframe/",
		plugins: [vue()],
		build: {
			outDir: "docs",
		},
	}
})
