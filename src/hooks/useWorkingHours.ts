import { useQuery } from '@tanstack/react-query'
import { getWorkingHours } from '../api'
import { useEffect, useState } from 'react'
import { FetchedWorkingHours, WorkingHours } from '../types'
import { getPolandTime } from '../utils/functions'

const getTodaysWorkingHours = (schadule: WorkingHours) => {
  const today = new Date()
  const [open, closed] = schadule[today.getDay().toString() as keyof WorkingHours].split(' : ')
  return {open, closed}
}

const checkIfClosed = (closedTime: string) => {
  const now = getPolandTime()
  const nowTime = now.getHours() + now.getMinutes() / 60
  const [hour, min] = closedTime.split(':').map(n=> +n)
  console.log(now, nowTime, hour, min )
  return nowTime > hour + min / 60
}

const useWorkingHours = () => {
  const [workingHours, setWorkingHours] = useState<WorkingHours | undefined>()
  const [todayWorkingHours, setTodayWorkingHours] = useState<{open: string, closed:string}>({open: '', closed:''})
  const [isClosed, setIsClosed] = useState<boolean>(false)
  const { data, isLoading, isError } = useQuery(
    {
      queryKey: ['working-hours'],
      queryFn: getWorkingHours,
      staleTime: 1000 * 60 * 15,
      refetchOnWindowFocus: false,
    }

  )
  useEffect(() => {
    if (data && data['7' as keyof FetchedWorkingHours]) {
      const { '7': value, ...rest } = data
      setWorkingHours({ ...rest, '0': value })
      const todaysWorkingHours = getTodaysWorkingHours({ ...rest, '0': value })
      console.log(todaysWorkingHours)
      setIsClosed(checkIfClosed(todaysWorkingHours.closed))
      setTodayWorkingHours(todaysWorkingHours)
    }
  }, [data])
  return { workingHours, isLoading, isError, todayWorkingHours, isClosed }
}

export default useWorkingHours
