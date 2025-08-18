import { createPinia } from 'pinia'
import { createApp } from 'vue'

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'vue3-toastify/dist/index.css'
import App from './app/App.vue'
import router from './app/router'
import './assets/index.css'
import './style.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
