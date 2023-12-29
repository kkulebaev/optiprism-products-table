import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style/style.css'
import App from './App.vue'
import { initMirageServer } from './server/server'
import { ElLoading } from 'element-plus'

initMirageServer()

const pinia = createPinia()
const app = createApp(App)

app.directive('loading', ElLoading.directive)

app.use(pinia)
app.mount('#app')
