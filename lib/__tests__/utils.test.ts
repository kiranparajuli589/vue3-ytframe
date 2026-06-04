import {afterEach, beforeEach, describe, expect, it, vi} from "vitest"
import {debounce, getVideoIdFromYoutubeURL} from "../utils"

describe("getVideoIdFromYoutubeURL", () => {
	const ID = "kGb9ftWR3l8"

	it.each([
		["watch", `https://www.youtube.com/watch?v=${ID}`],
		["watch no www", `https://youtube.com/watch?v=${ID}`],
		["watch mobile", `https://m.youtube.com/watch?v=${ID}`],
		["watch http", `http://www.youtube.com/watch?v=${ID}`],
		["watch v not first", `https://www.youtube.com/watch?list=PL123&v=${ID}`],
		["watch with extra params", `https://www.youtube.com/watch?v=${ID}&t=30s`],
		["short link", `https://youtu.be/${ID}`],
		["short link with query", `https://youtu.be/${ID}?t=10`],
		["embed", `https://www.youtube.com/embed/${ID}`],
		["shorts", `https://www.youtube.com/shorts/${ID}`],
		["live", `https://www.youtube.com/live/${ID}`],
		["v path", `https://www.youtube.com/v/${ID}`],
		["nocookie embed", `https://www.youtube-nocookie.com/embed/${ID}`],
	])("extracts the id from a %s URL", (_label, url) => {
		expect(getVideoIdFromYoutubeURL(url)).toBe(ID)
	})

	it.each([
		["empty string", ""],
		["null", null],
		["undefined", undefined],
		["not a url", "kGb9ftWR3l8"],
		["non-youtube host", "https://vimeo.com/watch?v=kGb9ftWR3l8"],
		["watch without v", "https://www.youtube.com/watch?list=PL123"],
		["too-short id", "https://youtu.be/short"],
		["ftp protocol", "ftp://www.youtube.com/watch?v=kGb9ftWR3l8"],
	])("returns null for %s", (_label, url) => {
		expect(getVideoIdFromYoutubeURL(url as string)).toBeNull()
	})
})

describe("debounce", () => {
	beforeEach(() => vi.useFakeTimers())
	afterEach(() => vi.useRealTimers())

	it("invokes the function only once after rapid calls", () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 300)

		debounced("a")
		debounced("b")
		debounced("c")
		expect(fn).not.toHaveBeenCalled()

		vi.advanceTimersByTime(300)
		expect(fn).toHaveBeenCalledTimes(1)
		expect(fn).toHaveBeenCalledWith("c")
	})

	it("invokes again after the wait elapses between calls", () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 100)

		debounced("first")
		vi.advanceTimersByTime(100)
		debounced("second")
		vi.advanceTimersByTime(100)

		expect(fn).toHaveBeenCalledTimes(2)
	})

	it("cancel() prevents a pending invocation", () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 200)

		debounced("x")
		debounced.cancel()
		vi.advanceTimersByTime(500)

		expect(fn).not.toHaveBeenCalled()
	})
})
