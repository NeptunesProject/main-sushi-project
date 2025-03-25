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

const checkIfClosed = (todaysWorkingHours: { open: string; closed: string}) => {
  const now = getPolandTime()
  const nowTime = now.getHours() + now.getMinutes() / 60
  const [closeHour, closeMin] = todaysWorkingHours.closed.split(':').map(n=> +n)
  const [openHour, openMin] = todaysWorkingHours.open.split(':').map(n=> +n)

  return nowTime > closeHour + closeMin / 60 || nowTime < openHour + openMin
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
      setIsClosed(checkIfClosed(todaysWorkingHours))
      setTodayWorkingHours(todaysWorkingHours)
    }
  }, [data])
  return { workingHours, isLoading, isError, todayWorkingHours, isClosed }
}

export default useWorkingHours
