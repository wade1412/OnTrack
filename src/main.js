import './assets/main.css'

import App from './App.vue'
import { syncState } from './storage'
import { createApp } from 'vue'

syncState()

document.addEventListener('visibilitychange', () =>
  syncState(document.visibilityState === 'visible')
)

createApp(App).mount('#app')
