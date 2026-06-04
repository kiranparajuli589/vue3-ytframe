import type {App, Plugin} from "vue"
import VueYtframe from "./VueYtframe.vue"

export {VueYtframe}
export type {
	VueYtframeProps,
	VueYtframeEmits,
	VueYtframeInstance,
	LoadVideoByIdOptions,
	LoadVideoByUrlOptions,
} from "./types"
export {getVideoIdFromYoutubeURL} from "./utils"

/**
 * Vue plugin that registers `<VueYtframe>` globally.
 *
 * @example
 * import VueYtframe from "vue3-ytframe"
 * app.use(VueYtframe)
 *
 * @example
 * // or register locally
 * import { VueYtframe } from "vue3-ytframe"
 */
const plugin: Plugin = {
	install(app: App) {
		app.component("VueYtframe", VueYtframe)
	},
}

export default plugin

declare module "vue" {
	export interface GlobalComponents {
		VueYtframe: typeof VueYtframe
	}
}
