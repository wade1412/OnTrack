import { APP_NAME, MILLISECONDS_IN_SECOND } from './constants'
import { today, isToday } from './time'
import { timelineItems } from './timelineitems'
import { activities } from './activities'

export function loadState() {
  const serializedState = localStorage.getItem(APP_NAME)

  const state = serializedState ? JSON.parse(serializedState) : {}

  activities.value = state.activities || activities.value

  const lastActiveAt = new Date(state.lastActiveAt)

  timelineItems.value = isToday(lastActiveAt) 
  ? syncIdleSeconds(state.timelineItems, lastActiveAt) 
  : timelineItems.value
  
}

export function saveState() {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      timelineItems: timelineItems.value,
      activities: activities.value,
      lastActiveAt: today()
    })
  )
}

function syncIdleSeconds(timelineItems, lastActiveAt){
  const activeTimelineItem = timelineItems.find(({isActive}) => isActive)
  if(activeTimelineItem) {
    activeTimelineItem.activitySecondsToComplete += (today() - lastActiveAt) / MILLISECONDS_IN_SECOND
  }
  return timelineItems
}
