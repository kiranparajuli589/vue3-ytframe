import {nextTick, onMounted, onUnmounted, ref, watch} from "vue"
import {useRoute} from "vue-router"

export default function useDocsActiveSection() {
	const route = useRoute()
	const activeId = ref(route.params.ref ?? "")

	watch(
		() => route.params.ref,
		(ref) => {
			if (ref) activeId.value = ref
		},
	)

	let observer

	onMounted(async () => {
		await nextTick()
		const root = document.querySelector(".docs-content")
		const headings = [...document.querySelectorAll(".docs-content h2[id]")]
		if (!root || headings.length === 0) return

		if (!activeId.value) {
			activeId.value = headings[0].id
		}

		observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
				if (visible[0]?.target?.id) {
					activeId.value = visible[0].target.id
				}
			},
			{
				root,
				rootMargin: "-15% 0px -65% 0px",
				threshold: [0, 0.1, 0.5, 1],
			},
		)

		headings.forEach((heading) => observer.observe(heading))
	})

	onUnmounted(() => {
		observer?.disconnect()
	})

	return {activeId}
}
