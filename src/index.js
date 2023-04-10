import { createApp } from 'vue'
import MainPage from '@/page/MainPage.vue'
import { createPinia } from 'pinia'

import 'virtual:windi.css'
import 'virtual:windi-devtools'
import '@/styles/responsive.scss'

// header 入口點
const App = createApp(MainPage)
App.use(createPinia())
App.mount('#vue-container')
