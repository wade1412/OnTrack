import './assets/main.css'

import * as Storage from './storage'
import App from './App.vue'
import { createApp } from 'vue'
import { timelineItems } from './timelineitems'
import { activities } from './activities'
import { isToday } from './time'

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

  timelineItems.value = isToday(new Date(state.date)) ? state.timelineItems : timelineItems.value
  activities.value = state.activities || activities.value
}

createApp(App).mount('#app')
