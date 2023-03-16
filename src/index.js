export default {
    install: (app, options) => {
        app.component('VYoutube', () => import('./VYoutube.vue'))
    }
}
