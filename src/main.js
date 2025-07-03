// import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// Importing lazy
import { lazyPlugin } from '@/directives/index.js'


// Importing main CSS file
import '@/styles/common.scss'

// Importing API test
// import { getCategory } from '@/apis/testAPI'
// getCategory().then(res => {
//   console.log(res)
// })

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)

app.mount('#app')

//全局指令


