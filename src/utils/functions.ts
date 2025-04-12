import { WorkingHours } from '../types'
export const getPolandTime = () => {
  const now = new Date()
  const polandTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Warsaw',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now)

  const hour = Number(
    polandTime.find((part) => part.type === 'hour')?.value || 0,
  )
  const minute = Number(
    polandTime.find((part) => part.type === 'minute')?.value || 0,
  )
  now.setHours(hour)
  now.setMinutes(minute)
  return now
}
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
  const hours = Math.floor(time) < 10? '0' + Math.floor(time) : Math.floor(time)
  const minutes = time % 1 === 0 ? '00' : (time % 1) * 60
  return `${hours}:${minutes}`
}
const parseWorkingTime = (time: string) => {
  const [open, close] = time.split(' : ')
  const [openHour, openMin] = open.split(':')
  const [closeHour, closeMin] = close.split(':')

  return {
    open: Number(openHour) + Number(openMin) / 60,
    close: Number(closeHour) + Number(closeMin) / 60,
  }
}
export const parseDeliveryDay = (day: string): Date => {
  const today = new Date()
  if (day === 'Dzisiaj') {
    return today
  } else if (day === 'Jutro') {
    today.setDate(today.getDate() + 1)
    return today
  } else {
    const deliveryDay = day.split('.')[0]
    today.setDate(+deliveryDay)
    return today
  }
}
export const getAvailableHours = (
  deliveryDay: string,
  workingHours: WorkingHours,
) => {
  let timeFrom
  const deliveryWeekDay = parseDeliveryDay(deliveryDay).getDay()

  const todayWorkingTime =
    workingHours[deliveryWeekDay.toString() as keyof WorkingHours]

  const { open, close } = parseWorkingTime(todayWorkingTime)
  if (deliveryDay !== 'Dzisiaj' || new Date().getHours() < open) {
    timeFrom = open
  } else {
    const now = getPolandTime()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const decimalTime = hours + minutes / 60
    timeFrom = Math.ceil(decimalTime * 4) / 4 + 1
  }

  const hours: number[] = []
  if (timeFrom < close)
    for (let i = timeFrom; i < close; i += 0.25) {
      hours.push(i)
    }
  if (timeFrom > close) {
    let stop = 24;
    for (let i = timeFrom; i <= stop; i += 0.25) {
      if(i === 23.75){
        i = 0
        stop = close;
      }

      hours.push(i)
    }
  }
  return hours
}
export const getISOSDate = (
  date: { day: string; time: string },
  workingHours: WorkingHours,
): string => {
  const now = getPolandTime()

  const deliveryDay = parseDeliveryDay(date.day)

  const todayWorkingTime =
    workingHours[deliveryDay.getDay().toString() as keyof WorkingHours]

  const { open } = parseWorkingTime(todayWorkingTime)

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
      now.setHours(open)
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
    isASAP ? open : Math.floor(+date.time),
    isASAP ? 0 : (+date.time % 1) * 60,
  ).toISOString()
}
