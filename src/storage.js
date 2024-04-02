import { APP_NAME } from './constants'
import { today, isToday, endOfHour, toSeconds } from './time'
import { activeTimelineItem, timelineItems, resetTimelineItems } from './timelineitems'
import { activities } from './activities'
import { startTimelineItemTimer, stopTimelineItemTimer } from './timelineitem-timer'

export function syncState(shouldLoad = true) {
  shouldLoad ? loadState() : saveState()

  if (activeTimelineItem.value) {
    shouldLoad
      ? startTimelineItemTimer(activeTimelineItem.value)
      : stopTimelineItemTimer(activeTimelineItem.value)
  }
}

export function loadState() {
  const serializedState = localStorage.getItem(APP_NAME)

  const state = serializedState ? JSON.parse(serializedState) : {}

  activities.value = state.activities || activities.value

  const lastActiveAt = new Date(state.lastActiveAt)

  timelineItems.value = state.timelineItems ?? timelineItems.value

  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    timelineItems.value = syncIdleSeconds(state.timelineItems, lastActiveAt)
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    timelineItems.value = resetTimelineItems(state.timelineItems)
  }
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

function syncIdleSeconds(timelineItems, lastActiveAt) {
  const activeTimelineItem = timelineItems.find(({ isActive }) => isActive)
  if (activeTimelineItem) {
    activeTimelineItem.activitySecondsToComplete += calcualteIdleSeconds(lastActiveAt)
  }
  return timelineItems
}

function calcualteIdleSeconds(lastActiveAt) {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(today() - lastActiveAt)
    : toSeconds(endOfHour(lastActiveAt) - lastActiveAt)
}
