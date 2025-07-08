// import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
// Importing lazy
import { lazyPlugin } from '@/directives/index.js'
import { componentPlugin } from '@/components'

// Importing main CSS file
import '@/styles/common.scss'

// Importing API test
// import { getCategory } from '@/apis/testAPI'
// getCategory().then(res => {
//   console.log(res)
// })

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')

//全局指令


