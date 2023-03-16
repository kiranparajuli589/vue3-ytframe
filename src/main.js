import { createApp } from 'vue'
import App from './App.vue'
import VYoutube from "./VYoutube.vue";

createApp(App)
    .use(VYoutube)
    .mount('#app')
