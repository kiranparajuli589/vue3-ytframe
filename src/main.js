import { createApp } from 'vue'
import App from './App.vue'
import VYoutube from "../lib/VueYtframe.vue";

createApp(App)
    .use(VYoutube)
    .mount('#app')
