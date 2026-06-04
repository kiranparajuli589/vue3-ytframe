import {readFileSync} from "node:fs"
import {resolve} from "node:path"
import {describe, expect, it} from "vitest"
import {ComponentMethods} from "../../src/helper.js"

/**
 * Guards against the docs site drifting from the component's real public API.
 * If a method is added to / removed from `defineExpose` but the docs Methods
 * table isn't updated to match (or vice versa), this test fails.
 */
describe("docs Methods table vs component defineExpose", () => {
	const documented = (ComponentMethods.table.rows as Array<[string, string]>)
		.map((row) => row[0].split("(")[0].trim())

	const source = readFileSync(resolve(process.cwd(), "lib/VueYtframe.vue"), "utf8")
	const exposeBlock = source.match(/defineExpose\(\{([\s\S]*?)\}\)/)?.[1] ?? ""
	const exposed = exposeBlock
		.split(",")
		.map((name) => name.trim())
		.filter(Boolean)
		.filter((name) => name !== "player") // a ref, not a documented method

	it("documents every exposed method", () => {
		const undocumented = exposed.filter((name) => !documented.includes(name))
		expect(undocumented, "methods exposed but missing from the docs table").toEqual([])
	})

	it("does not document methods that are not exposed", () => {
		const phantom = documented.filter((name) => !exposed.includes(name))
		expect(phantom, "methods in the docs table that are not exposed").toEqual([])
	})
})
