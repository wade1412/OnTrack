import { APP_NAME } from './constants'
import { today } from './time'
import { activeTimelineItem, timelineItems, intializeTimelineItems } from './timelineitems'
import { activities, intializeActivities } from './activities'
import { startTimelineItemTimer, stopTimelineItemTimer } from './timelineitem-timer'

export function syncState(shouldLoad = true) {
  shouldLoad ? loadState() : saveState()

  if (activeTimelineItem.value) {
    shouldLoad
      ? startTimelineItemTimer()
      : stopTimelineItemTimer()
  }
}

function loadState() {
  const state = loadFromLocalStorage()
  intializeActivities(state)
  intializeTimelineItems(state)
}

function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem(APP_NAME)) ?? '{}'
}

function saveState() {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      timelineItems: timelineItems.value,
      activities: activities.value,
      lastActiveAt: today()
    })
  )
}
