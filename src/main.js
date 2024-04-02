import './assets/main.css'

import App from './App.vue'
import { loadState, saveState } from './storage'
import { createApp } from 'vue'
import { activeTimelineItem, startTimelineItemTimer} from './timelineitems'

loadState()

if (activeTimelineItem.value) {
  startTimelineItemTimer(activeTimelineItem.value)
}

document.addEventListener('visibilitychange', () =>
  document.visibilityState === 'visible' ? loadState() : saveState()
)

createApp(App).mount('#app')
