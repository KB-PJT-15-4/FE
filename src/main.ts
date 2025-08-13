import { createPinia } from 'pinia'
import { createApp } from 'vue'

import 'bootstrap-icons/font/bootstrap-icons.css'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import App from './app/App.vue'
import router from './app/router'
import './assets/index.css'
import './style.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
const options: ToastContainerOptions = {
  position: 'top-center',
  autoClose: 3000,
  pauseOnHover: true,
  closeOnClick: true,
  hideProgressBar: true,
  newestOnTop: true,
}

app.use(Vue3Toastify, options)
app.mount('#app')
