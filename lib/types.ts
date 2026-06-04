import type {Ref} from "vue"

/** Props accepted by the `<VueYtframe>` component. */
export interface VueYtframeProps {
	/** YouTube video ID. One of `videoId` or `videoUrl` must be provided. */
	videoId?: string | null
	/** Full YouTube video URL (parsed to a video ID internally). */
	videoUrl?: string | null
	/** Player width in pixels or a CSS size. Defaults to `"100%"`. */
	width?: number | string
	/** Player height in pixels or a CSS size. Defaults to `"100%"`. */
	height?: number | string
	/** YouTube Iframe API player parameters. */
	playerVars?: YT.PlayerVars
}

/** Event map emitted by `<VueYtframe>`. Each payload is the underlying `YT.Player`. */
export type VueYtframeEmits = {
	ready: [player: YT.Player]
	playing: [player: YT.Player]
	paused: [player: YT.Player]
	ended: [player: YT.Player]
	stateChange: [player: YT.Player]
	playbackQualityChange: [player: YT.Player]
	playbackRateChange: [player: YT.Player]
	error: [player: YT.Player]
	apiChange: [player: YT.Player]
}

export interface LoadVideoByIdOptions {
	videoId: string
	startSeconds?: number
	endSeconds?: number
}

export interface LoadVideoByUrlOptions {
	mediaContentUrl: string
	startSeconds?: number
	endSeconds?: number
}

/**
 * The methods and refs exposed by a `<VueYtframe>` instance via a template ref.
 * Use it to type your ref: `const yt = ref<VueYtframeInstance>()`.
 */
export interface VueYtframeInstance {
	/** The underlying `YT.Player`, or `null` until the player is ready. */
	player: Ref<YT.Player | null>
	playVideo(): void
	pauseVideo(): void
	stopVideo(): void
	seekTo(seconds: number, allowSeekAhead: boolean): void
	nextVideo(): void
	previousVideo(): void
	playVideoAt(index: number): void
	mute(): void
	unMute(): void
	isMuted(): boolean
	setVolume(volume: number): void
	getVolume(): number
	setSize(width: number, height: number): void
	setShuffle(shufflePlaylist: boolean): void
	setLoop(loopPlaylists: boolean): void
	getDuration(): number
	getCurrentTime(): number
	getVideoEmbedCode(): string
	getVideoUrl(): string
	getVideoLoadedFraction(): number
	getPlayerState(): number
	getPlaybackRate(): number
	setPlaybackRate(suggestedRate: number): void
	getAvailablePlaybackRates(): number[]
	getOptions(): string[]
	getAnOption(module: string, option: string): unknown
	setAnOption(module: string, option: string, value: unknown): void
	getSphericalProperties(): object
	setSphericalProperties(props: object): void
	getPlaylist(): string[]
	getPlaylistIndex(): number
	getIframe(): HTMLIFrameElement
	destroy(): void
	loadVideoById(options: LoadVideoByIdOptions): void
	cueVideoById(options: LoadVideoByIdOptions): void
	loadVideoByUrl(options: LoadVideoByUrlOptions): void
	cueVideoByUrl(options: LoadVideoByUrlOptions): void
	cuePlaylist(playlist: string | string[], index?: number, startSeconds?: number): void
	loadPlaylist(playlist: string | string[], index?: number, startSeconds?: number): void
	getVideoIdFromYoutubeURL(url: string | null | undefined): string | null
}
