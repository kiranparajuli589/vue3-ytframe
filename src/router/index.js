import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("../views/HomePage.vue"),
	},
	{
		path: "/docs/ref=:ref?",
		name: "Docs",
		component: () => import("../views/DocsPage.vue"),
	},
	{
		path: "/playground",
		name: "Playground",
		component: () => import("../views/PlaygroundPage.vue"),
	},
	{
		path: "/about",
		name: "About",
		component: () => import("../views/AboutPage.vue"),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
