import { createApp } from 'vue'
import { store } from './store'
import App from './App.vue'

require('@/assets/main.scss');
const app = createApp(App)

app.use(store)

app.mount('#app')
