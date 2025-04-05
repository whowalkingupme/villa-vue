
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入 Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// 引入 Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css'

// 引入 Swiper
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// 引入自定義 CSS
import './assets/css/templatemo-villa-agency.css'
import './assets/css/animate.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
