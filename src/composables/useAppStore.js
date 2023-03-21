import {appStore} from "../store/app.js"
import {storeToRefs} from "pinia"

export default function useAppStore() {
	const store = appStore()

	const {isDark} = storeToRefs(store)
	const {toggleDark, setDark} = store

	return {
		isDark, toggleDark, setDark
	}
}
