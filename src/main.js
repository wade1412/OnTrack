import './assets/main.css'

import App from './App.vue'
import { loadState, saveState } from './storage'
import { createApp } from 'vue'
import { startTimelineItemTimer, findActiveTimelineItem } from './timelineitems'

loadState()

const activeTimelineItem = findActiveTimelineItem()

if (activeTimelineItem) {
  startTimelineItemTimer(activeTimelineItem)
}

document.addEventListener('visibilitychange', () =>
  document.visibilityState === 'visible' ? loadState() : saveState()
)

createApp(App).mount('#app')
