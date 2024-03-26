import {
  HUNDRED_PERCENT,
  SECONDS_IN_DAY,
  MINUTES_IN_HOUR,
  SECONDS_IN_MINUTE,
  MILLISECONDS_IN_SECOND
} from '@/constants'
import { computed, ref, watchEffect } from 'vue'

function calculateSecondsSinceMidnight() {
  const now = new Date()
  return (
    SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours() +
    SECONDS_IN_MINUTE * now.getMinutes() +
    now.getSeconds()
  )
}

const secondsSinceMidnight = ref(calculateSecondsSinceMidnight())

let timer = null

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

watchEffect(() => {
  if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
    secondsSinceMidnight.value = 0
  }
})

export function startTimer() {
    secondsSinceMidnight.value = calculateSecondsSinceMidnight()

    timer = setInterval(() => secondsSinceMidnight.value++, MILLISECONDS_IN_SECOND)
    
}



export function stopTimer() {
    clearInterval(timer)
}
