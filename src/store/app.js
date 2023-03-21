import { defineStore } from "pinia"

export const appStore = defineStore("app", {
	state: () => ({
		dark: true
	}),
	getters: {
		isDark: (state) => state.dark
	},
	actions: {
		toggleDark() {
			this.dark = !this.dark
			localStorage.setItem("isDark", this.dark ? "true" : "false")
		},
		setDark(val) {
			this.dark = !!val
			localStorage.setItem("isDark", this.dark ? "true" : "false")
		}
	}
})
