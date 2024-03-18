import {ref} from 'vue'
import { generateTimelineItems } from './functions'
import { activities } from './activities'


export const timelineItems = ref(generateTimelineItems(activities.value))

export function setTimelineItemActivity(timelineItem, activityId) {
    timelineItem.activityId = activityId
  }
  
export function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
    timelineItem.activitySeconds += activitySeconds
  }
  
export function resetTimelineItemActivities(activity) { 
    timelineItems.value.forEach((timelineItem) => {
        if (timelineItem.acvitityId === activity.id) {
          timelineItem.acvitityId = null
          timelineItem.activitySeconds = 0
        }
      })
}