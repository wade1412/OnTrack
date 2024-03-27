import './assets/main.css'

import { loadState, saveState } from './storage'
import App from './App.vue'
import { createApp } from 'vue'

loadState()

document.addEventListener('visibilitychange', () =>
  document.visibilityState === 'visible' ? loadState() : saveState()
)

createApp(App).mount('#app')