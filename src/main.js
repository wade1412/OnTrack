import './assets/main.css'

import * as Storage from './storage'
import App from './App.vue'
import { createApp } from 'vue'
import { timelineItems } from './timelineitems'
import { activities } from './activities'

loadState()

document.addEventListener('visibilitychange', () => {
  document.visibilityState === 'visible' ? loadState() : saveState()
})

function saveState() {
  Storage.save({
    timelineItems: timelineItems.value,
    activities: activities.value
  })
}

function loadState() {
  const state = Storage.load()

  timelineItems.value = state.timelineItems
  activities.value = state.activities
}

createApp(App).mount('#app')
