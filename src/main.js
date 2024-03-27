import './assets/main.css'

import * as Storage from './storage'
import App from './App.vue'
import { createApp } from 'vue'
import { timelineItems } from './timelineitems'
import { activities } from './activities'

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    saveState()
  }
})

function saveState() {
  Storage.save({
    timelineItems: timelineItems.value,
    activities: activities.value
  })
}

createApp(App).mount('#app')
