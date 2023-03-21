import {resolve} from "path"
import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
	if (command === "serve") {
		return {
			plugins: [vue()]
		}
	} else {
		if (mode === "lib") {
			return {
				plugins: [vue()],
				build: {
					lib: {
						// eslint-disable-next-line no-undef
						entry: resolve(__dirname, "lib/index.js"),
						name: "VueYtframe",
						fileName: (format) => `ytframe.${format}.js`
					},
					rollupOptions: {
						external: ["vue"],
						output: {
							globals: {
								vue: "Vue"
							}
						}
					}
				},
			}
		} else {
			return {
				base: "/vue3-ytframe/",
				plugins: [vue()],
				build: {
					outDir: "docs",
				}
			}
		}
	}
})
