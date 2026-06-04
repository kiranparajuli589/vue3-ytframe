import {afterEach, beforeEach, describe, expect, it, vi} from "vitest"
import {flushPromises, mount} from "@vue/test-utils"
import VueYtframe from "../VueYtframe.vue"

/** Records every constructed player and the event handlers it was given. */
const players: FakePlayer[] = []

const PLAYER_METHODS = [
	"playVideo", "pauseVideo", "stopVideo", "seekTo", "nextVideo", "previousVideo",
	"playVideoAt", "mute", "unMute", "isMuted", "setVolume", "getVolume", "setSize",
	"setShuffle", "setLoop", "getDuration", "getCurrentTime", "getVideoEmbedCode",
	"getVideoUrl", "getVideoLoadedFraction", "getPlayerState", "getPlaybackRate",
	"setPlaybackRate", "getAvailablePlaybackRates", "getOptions", "getOption",
	"setOption", "getSphericalProperties", "setSphericalProperties", "getPlaylist",
	"getPlaylistIndex", "getIframe", "destroy", "loadVideoById", "cueVideoById",
	"loadVideoByUrl", "cueVideoByUrl", "cuePlaylist", "loadPlaylist",
]

class FakePlayer {
	el: Element
	opts: YT.PlayerOptions;
	[method: string]: ReturnType<typeof vi.fn> | unknown

	constructor(el: Element, opts: YT.PlayerOptions) {
		this.el = el
		this.opts = opts
		for (const name of PLAYER_METHODS) this[name] = vi.fn()
		this.getVolume = vi.fn(() => 42)
		players.push(this)
	}

	fireState(state: number): void {
		this.opts.events?.onStateChange?.({target: this, data: state} as unknown as YT.OnStateChangeEvent)
	}

	fireReady(): void {
		this.opts.events?.onReady?.({target: this} as unknown as YT.PlayerEvent)
	}

	fireError(): void {
		this.opts.events?.onError?.({target: this, data: 2} as unknown as YT.OnErrorEvent)
	}
}

const PlayerState = {UNSTARTED: -1, ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5}

async function mountReady(props: Record<string, unknown>) {
	const wrapper = mount(VueYtframe, {props, attachTo: document.body})
	await flushPromises()
	return wrapper
}

beforeEach(() => {
	players.length = 0
	vi.stubGlobal("YT", {Player: FakePlayer, PlayerState})
	vi.spyOn(console, "warn").mockImplementation(() => {})
})

afterEach(() => {
	vi.unstubAllGlobals()
	vi.useRealTimers()
	vi.restoreAllMocks()
})

describe("VueYtframe — mounting", () => {
	it("creates a player with the given videoId, size and playerVars", async () => {
		await mountReady({videoId: "kGb9ftWR3l8", width: 640, height: 360, playerVars: {rel: 0}})

		expect(players).toHaveLength(1)
		expect(players[0].opts.videoId).toBe("kGb9ftWR3l8")
		expect(players[0].opts.width).toBe(640)
		expect(players[0].opts.height).toBe(360)
		expect(players[0].opts.playerVars).toEqual({rel: 0})
	})

	it("derives the videoId from a videoUrl", async () => {
		await mountReady({videoUrl: "https://youtu.be/kGb9ftWR3l8"})
		expect(players[0].opts.videoId).toBe("kGb9ftWR3l8")
	})

	it("does not create a player when neither videoId nor videoUrl is given", async () => {
		await mountReady({})
		expect(players).toHaveLength(0)
	})

	it("does not create a player for an invalid videoUrl", async () => {
		await mountReady({videoUrl: "https://vimeo.com/123"})
		expect(players).toHaveLength(0)
	})

	it("gives up loading after the timeout when the API never appears", async () => {
		vi.useFakeTimers()
		vi.stubGlobal("YT", undefined) // API never becomes available
		// happy-dom can't fetch the real script; no-op the injection.
		vi.spyOn(document.head, "appendChild").mockImplementation((node) => node)
		const wrapper = mount(VueYtframe, {props: {videoId: "kGb9ftWR3l8"}, attachTo: document.body})

		await vi.advanceTimersByTimeAsync(10_100)

		expect(players).toHaveLength(0)
		wrapper.unmount()
	})
})

describe("VueYtframe — events", () => {
	it("emits ready", async () => {
		const wrapper = await mountReady({videoId: "kGb9ftWR3l8"})
		players[0].fireReady()
		expect(wrapper.emitted("ready")).toHaveLength(1)
	})

	it("maps player states to playing/paused/ended plus stateChange", async () => {
		const wrapper = await mountReady({videoId: "kGb9ftWR3l8"})
		const p = players[0]

		p.fireState(PlayerState.PLAYING)
		p.fireState(PlayerState.PAUSED)
		p.fireState(PlayerState.ENDED)
		p.fireState(PlayerState.BUFFERING) // only stateChange, no named event

		expect(wrapper.emitted("playing")).toHaveLength(1)
		expect(wrapper.emitted("paused")).toHaveLength(1)
		expect(wrapper.emitted("ended")).toHaveLength(1)
		expect(wrapper.emitted("stateChange")).toHaveLength(4)
	})

	it("emits error", async () => {
		const wrapper = await mountReady({videoId: "kGb9ftWR3l8"})
		players[0].fireError()
		expect(wrapper.emitted("error")).toHaveLength(1)
	})
})

describe("VueYtframe — lifecycle & methods", () => {
	it("destroys the player on unmount", async () => {
		const wrapper = await mountReady({videoId: "kGb9ftWR3l8"})
		const p = players[0]
		wrapper.unmount()
		expect(p.destroy).toHaveBeenCalledTimes(1)
	})

	const DELEGATIONS: Array<[string, unknown[], string]> = [
		["playVideo", [], "playVideo"],
		["pauseVideo", [], "pauseVideo"],
		["stopVideo", [], "stopVideo"],
		["seekTo", [10, true], "seekTo"],
		["nextVideo", [], "nextVideo"],
		["previousVideo", [], "previousVideo"],
		["playVideoAt", [0], "playVideoAt"],
		["mute", [], "mute"],
		["unMute", [], "unMute"],
		["isMuted", [], "isMuted"],
		["setVolume", [50], "setVolume"],
		["getVolume", [], "getVolume"],
		["setSize", [100, 50], "setSize"],
		["setShuffle", [true], "setShuffle"],
		["setLoop", [true], "setLoop"],
		["getDuration", [], "getDuration"],
		["getCurrentTime", [], "getCurrentTime"],
		["getVideoEmbedCode", [], "getVideoEmbedCode"],
		["getVideoUrl", [], "getVideoUrl"],
		["getVideoLoadedFraction", [], "getVideoLoadedFraction"],
		["getPlayerState", [], "getPlayerState"],
		["getPlaybackRate", [], "getPlaybackRate"],
		["setPlaybackRate", [1.5], "setPlaybackRate"],
		["getAvailablePlaybackRates", [], "getAvailablePlaybackRates"],
		["getOptions", [], "getOptions"],
		["getAnOption", ["m", "o"], "getOption"],
		["setAnOption", ["m", "o", "v"], "setOption"],
		["getSphericalProperties", [], "getSphericalProperties"],
		["setSphericalProperties", [{}], "setSphericalProperties"],
		["getPlaylist", [], "getPlaylist"],
		["getPlaylistIndex", [], "getPlaylistIndex"],
		["getIframe", [], "getIframe"],
		["loadVideoById", [{videoId: "x"}], "loadVideoById"],
		["cueVideoById", [{videoId: "x"}], "cueVideoById"],
		["loadVideoByUrl", [{mediaContentUrl: "u"}], "loadVideoByUrl"],
		["cueVideoByUrl", [{mediaContentUrl: "u"}], "cueVideoByUrl"],
		["cuePlaylist", [["a"]], "cuePlaylist"],
		["loadPlaylist", [["a"]], "loadPlaylist"],
	]

	it.each(DELEGATIONS)("delegates %s() to the underlying player", async (vmMethod, args, playerMethod) => {
		const wrapper = await mountReady({videoId: "kGb9ftWR3l8"})
		const vm = wrapper.vm as unknown as Record<string, (...a: unknown[]) => unknown>
		vm[vmMethod](...args)
		expect(players[0][playerMethod]).toHaveBeenCalledTimes(1)
	})

	it("returns values from getter methods", async () => {
		const wrapper = await mountReady({videoId: "kGb9ftWR3l8"})
		const vm = wrapper.vm as unknown as {getVolume: () => number}
		expect(vm.getVolume()).toBe(42)
	})

	it("throws a clear error when a method is called before the player is ready", async () => {
		// Not attached to the document: createPlayer can't find its element,
		// so the player is never instantiated and methods must guard against null.
		const wrapper = mount(VueYtframe, {props: {videoId: "kGb9ftWR3l8"}})
		await flushPromises()
		const vm = wrapper.vm as unknown as {playVideo: () => void}
		expect(() => vm.playVideo()).toThrow(/not ready/)
		wrapper.unmount()
	})

	it("exposes getVideoIdFromYoutubeURL", async () => {
		const wrapper = await mountReady({videoId: "kGb9ftWR3l8"})
		const vm = wrapper.vm as unknown as {getVideoIdFromYoutubeURL: (u: string) => string | null}
		expect(vm.getVideoIdFromYoutubeURL("https://youtu.be/kGb9ftWR3l8")).toBe("kGb9ftWR3l8")
	})

	it("resizes the player when width/height props change", async () => {
		const wrapper = await mountReady({videoId: "kGb9ftWR3l8", width: 200, height: 100})
		await wrapper.setProps({width: 300, height: 150})
		expect(players[0].setSize).toHaveBeenCalledWith(300, 150)
	})
})

describe("VueYtframe — prop changes (debounced)", () => {
	it("cues a new video by id without autoplay", async () => {
		vi.useFakeTimers()
		const wrapper = mount(VueYtframe, {props: {videoId: "kGb9ftWR3l8"}, attachTo: document.body})
		await vi.runOnlyPendingTimersAsync()
		const p = players[0]

		wrapper.setProps({videoId: "U_0iZpQPPoA"})
		await vi.advanceTimersByTimeAsync(300)

		expect(p.cueVideoById).toHaveBeenCalledWith(expect.objectContaining({videoId: "U_0iZpQPPoA"}))
		expect(p.loadVideoById).not.toHaveBeenCalled()
	})

	it("loads (autoplays) a new video by id when autoplay is set", async () => {
		vi.useFakeTimers()
		const wrapper = mount(VueYtframe, {props: {videoId: "kGb9ftWR3l8", playerVars: {autoplay: 1}}, attachTo: document.body})
		await vi.runOnlyPendingTimersAsync()
		const p = players[0]

		wrapper.setProps({videoId: "U_0iZpQPPoA"})
		await vi.advanceTimersByTimeAsync(300)

		expect(p.loadVideoById).toHaveBeenCalledWith(expect.objectContaining({videoId: "U_0iZpQPPoA"}))
	})

	it("cues a new video by url", async () => {
		vi.useFakeTimers()
		const wrapper = mount(VueYtframe, {props: {videoUrl: "https://youtu.be/kGb9ftWR3l8"}, attachTo: document.body})
		await vi.runOnlyPendingTimersAsync()
		const p = players[0]

		wrapper.setProps({videoUrl: "https://youtu.be/U_0iZpQPPoA"})
		await vi.advanceTimersByTimeAsync(500)

		expect(p.cueVideoByUrl).toHaveBeenCalledWith(
			expect.objectContaining({mediaContentUrl: "https://youtu.be/U_0iZpQPPoA"}),
		)
	})
})
