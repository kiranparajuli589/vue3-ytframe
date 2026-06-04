import {describe, expect, it} from "vitest"
import {createApp} from "vue"
import plugin, {VueYtframe, getVideoIdFromYoutubeURL} from "../index"

describe("plugin entry", () => {
	it("registers VueYtframe globally when installed", () => {
		const app = createApp({template: "<div />"})
		app.use(plugin)
		expect(app.component("VueYtframe")).toBeTruthy()
	})

	it("re-exports the component and the url helper", () => {
		expect(VueYtframe).toBeTruthy()
		expect(getVideoIdFromYoutubeURL("https://youtu.be/kGb9ftWR3l8")).toBe("kGb9ftWR3l8")
	})
})
