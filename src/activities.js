import {
    generateActivitySelectOptions,
    generateActivities
  } from './functions'
import {computed, ref} from 'vue'

export const activities = ref(generateActivities())

export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

export function createActivity(activity) {
    activities.value.push(activity)
  }
  
export function deleteActivity(activity) {
    activities.value.splice(activities.value.indexOf(activity), 1)
  }


  export function setActivitySecondsToComplete(activity, secondsToComplete) {
    activity.secondsToComplete = secondsToComplete || 0
  }
  
