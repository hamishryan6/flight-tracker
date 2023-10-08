import { createApp } from 'vue'
import App from './App.vue'
import Vue3Lottie from 'vue3-lottie'
import router from './router'

const app = createApp(App)

app.use(Vue3Lottie).use(router)
app.mount('#app')
