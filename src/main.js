import {createApp} from "vue"
import App from "./App.vue"
import router from "./router"
import pinia from "./store"
import "./assets/theme.css"
import "./assets/docs.css"
import "./assets/base.css"
import "./assets/hljs.scss"
import "@mdi/font/css/materialdesignicons.css"

createApp(App)
	.use(router)
	.use(pinia)
	.mount("#app")
