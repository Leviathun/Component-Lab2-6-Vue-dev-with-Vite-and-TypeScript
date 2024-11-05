import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
import '@/services/AxiosInterceptorSetup.ts'
import { inject } from '@vercel/analytics'
inject()
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
