import { APP_NAME } from './constants'

export function save(data) {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      ...data,
      date: new Date().toDateString()
    })
  )
}

export function load() {
  const state = localStorage.getItem(APP_NAME)

  return state ? JSON.parse(state) : {}
}
