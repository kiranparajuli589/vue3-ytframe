/** Matches a canonical 11-character YouTube video ID. */
export const VIDEO_ID = /^[a-zA-Z0-9_-]{11}$/

/** Strips optional `www.` or `m.` from a YouTube hostname. */
export const YOUTUBE_HOST_PREFIX = /^(www\.|m\.)/

/** Path segments: `/embed|shorts|live|v/<id>`. Capture group 1 is the video ID. */
export const YOUTUBE_EMBED_PATH = /^\/(?:embed|shorts|live|v)\/([a-zA-Z0-9_-]{11})/

export const YOUTUBE_HOST_YOUTU_BE = "youtu.be"
export const YOUTUBE_HOST_YOUTUBE_COM = "youtube.com"
export const YOUTUBE_HOST_NOCOOKIE = "youtube-nocookie.com"

/** YouTube Iframe API script source URL. */
export const YT_API_SRC = "https://www.youtube.com/iframe_api"
/** YouTube Iframe API load timeout in milliseconds. */
export const YT_LOAD_TIMEOUT = 10_000
/** YouTube Iframe API poll interval in milliseconds. */
export const YT_POLL_INTERVAL = 100
