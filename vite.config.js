import {dirname, resolve} from "node:path"
import {fileURLToPath} from "node:url"
import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({command, mode}) => {
	if (command === "serve") {
		return {
			plugins: [vue()],
		}
	}

	if (mode === "lib") {
		return {
			plugins: [vue()],
			build: {
				lib: {
					entry: resolve(__dirname, "lib/index.js"),
					name: "VueYtframe",
					fileName: (format) =>
						format === "umd" ? "ytframe.umd.cjs" : `ytframe.${format}.js`,
				},
				rollupOptions: {
					external: ["vue"],
					output: {
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
