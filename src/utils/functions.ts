import { openingHours } from '../constants'

export const getObjectFromLocalStorage = <T>(
  key: string,
  defaultValue: T,
): T => {
  const storedValue = localStorage.getItem(key)
  return storedValue ? (JSON.parse(storedValue) as T) : defaultValue
}
export const getAvailableDays = (): string[] => {
  const today = new Date()
  today.setDate(today.getDate() + 2)
  const days = []
  for (let i = 0; i < 6; i++) {
    const day = today.getDate()
    const month: string =
      today.getMonth() < 9
        ? `0${today.getMonth() + 1}`
        : `${today.getMonth() + 1}`
    days.push(`${day}.${month}`) // omit today and tomorrow by adding 2
    today.setDate(today.getDate() + 1)
  }
  return days
}
export const formatTime = (time: number): string => {
  const hours = Math.floor(time)
  const minutes = time % 1 === 0 ? '00' : (time % 1) * 60
  return `${hours}:${minutes}`
}

export const getAvailableHours = (deliveryDay: string) => {
  let timeFrom
  if (deliveryDay !== 'Dzisiaj' || new Date().getHours() < openingHours.open ) {
    timeFrom = openingHours.open
  } else {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const decimalTime = hours + minutes / 60
    timeFrom = Math.ceil(decimalTime * 4) / 4 + 1
  }

  const hours: number[] = []
  for (let i = timeFrom; i < openingHours.closed; i += 0.25) {
    hours.push(i)
  }
  return hours
}
export const getISOSDate = (date: { day: string; time: string }): string => {
  const now = new Date()
  const isASAP = date.time === 'Jak najszybciej'
  if (date.day === 'Dzisiaj') {
    if (!isASAP) {
      if (+date.time > now.getHours() + 1) {
        now.setHours(Math.floor(+date.time))
        now.setMinutes((+date.time % 1) * 60)
      }
    }
    return now.toISOString()
  }
  if (date.day === 'Jutro') {
    if (isASAP) {
      now.setHours(openingHours.open)
    } else {
      now.setHours(Math.floor(+date.time))
    }
    now.setDate(now.getDate() + 1)
    now.setMinutes((+date.time % 1) * 60)
    return now.toISOString()
  }

  const [day, month] = date.day.split('.').map(Number)
  const year =
    month < now.getMonth() ? now.getFullYear() + 1 : now.getFullYear()

  return new Date(
    year,
    month - 1,
    day,
    isASAP ? openingHours.open : Math.floor(+date.time),
    isASAP ? 0 : (+date.time % 1) * 60,
  ).toISOString()
}
