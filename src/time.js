import { HUNDRED_PERCENT, SECONDS_IN_DAY, MILLISECONDS_IN_SECOND } from '@/constants'
import { computed, ref } from 'vue'

export function today() {
  const date = new Date()

  date.setHours(0, 0)

  return date
}

export function tomorrow() {
  const tomorrow = today()

  tomorrow.setDate(tomorrow.getDate() + 1)

  return tomorrow
}

export function isToday(date) {
  return date.toDateString() === today().toDateString()
}

export const now = ref(today())

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))

const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECOND)

let timer = null

export function startTimer() {
  now.value = today()

  timer = setInterval(() => {
    now.value = new Date(now.value.getTime() + MILLISECONDS_IN_SECOND)
  }, MILLISECONDS_IN_SECOND)
}

export function stopTimer() {
  clearInterval(timer)
}
