// Augments @types/youtube with the module-options API, which the YouTube
// Iframe API exposes but the published typings omit.
// @see https://developers.google.com/youtube/iframe_api_reference#onApiChange

export {}

declare global {
	namespace YT {
		interface Player {
			/** Returns the module names for which options can be set. */
			getOptions(): string[]
			/** Returns the value of a specific module option. */
			getOption(module: string, option: string): unknown
			/** Sets the value of a specific module option. */
			setOption(module: string, option: string, value: unknown): void
		}
	}
}
