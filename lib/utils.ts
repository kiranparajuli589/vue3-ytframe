import {
	VIDEO_ID,
	YOUTUBE_EMBED_PATH,
	YOUTUBE_HOST_PREFIX,
	YOUTUBE_HOST_NOCOOKIE,
	YOUTUBE_HOST_YOUTU_BE,
	YOUTUBE_HOST_YOUTUBE_COM,
} from "./constants"

/** Dev-only diagnostic; the published library stays silent in production. */
export function warn(...args: unknown[]): void {
	if (import.meta.env.DEV) console.warn("[vue3-ytframe]", ...args)
}

/**
 * A debounced version of `fn` that delays invocation until `wait` ms have
 * elapsed since the last call. The returned function keeps a single shared
 * timer across calls (so rapid calls genuinely coalesce) and exposes
 * `cancel()` to clear a pending invocation — used on component teardown.
 */
export function debounce<A extends unknown[]>(
	fn: (...args: A) => void,
	wait: number,
): ((...args: A) => void) & {cancel: () => void} {
	let timeout: ReturnType<typeof setTimeout> | undefined

	const debounced = (...args: A): void => {
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(() => {
			timeout = undefined
			fn(...args)
		}, wait)
	}

	debounced.cancel = (): void => {
		if (timeout) clearTimeout(timeout)
		timeout = undefined
	}

	return debounced
}

/**
 * Extracts the 11-character video ID from a YouTube URL, or returns `null`
 * when the input is not a recognizable YouTube URL.
 *
 * Supported forms (http or https, optional `www.`/`m.`):
 * - `youtube.com/watch?v=<id>` (the `v` param may appear in any position)
 * - `youtu.be/<id>`
 * - `youtube.com/embed/<id>`
 * - `youtube.com/shorts/<id>`
 * - `youtube.com/live/<id>`
 * - `youtube.com/v/<id>`
 * - `youtube-nocookie.com/embed/<id>`
 */
export function getVideoIdFromYoutubeURL(url: string | null | undefined): string | null {
	if (!url || typeof url !== "string") return null

	let parsed: URL
	try {
		parsed = new URL(url.trim())
	} catch {
		return null
	}

	if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null

	const host = parsed.hostname.replace(YOUTUBE_HOST_PREFIX, "")
	const path = parsed.pathname

	if (host === YOUTUBE_HOST_YOUTU_BE) {
		const id = path.slice(1).split("/")[0]
		return VIDEO_ID.test(id) ? id : null
	}

	if (host === YOUTUBE_HOST_YOUTUBE_COM || host === YOUTUBE_HOST_NOCOOKIE) {
		if (path === "/watch") {
			const v = parsed.searchParams.get("v")
			return v && VIDEO_ID.test(v) ? v : null
		}
		const match = YOUTUBE_EMBED_PATH.exec(path)
		if (match) return match[1]
	}

	return null
}
