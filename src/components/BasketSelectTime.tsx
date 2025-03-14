import { Flex } from '@chakra-ui/react'
import { useMemo } from 'react'
import BasketSelect from './BasketSelect'
import {
  formatTime,
  getAvailableDays,
  getAvailableHours,
} from '../utils/functions'
import useWorkingHours from '../hooks/useWorkingHours'

interface Props {
  deliveryDate: { day: string; time: string }
  setDeliveryDate: React.Dispatch<
    React.SetStateAction<{ day: string; time: string }>
  >
}

const BasketSelectTime = ({ deliveryDate, setDeliveryDate }: Props) => {
  const { workingHours } = useWorkingHours()
  const availableDays = useMemo(() => getAvailableDays(), [])
  const availableHours: number[] = useMemo(() => {
    return workingHours? getAvailableHours(deliveryDate.day, workingHours) : []
  }, [deliveryDate , workingHours])
  return (
    <Flex w="full" gap={5}>
      <BasketSelect
        setter={(e) => {
          setDeliveryDate((prevState) => ({
            ...prevState,
            day: e.target.value,
          }))
          localStorage.setItem(
            'personInfo-delivery-date',
            JSON.stringify({
              day: e.target.value,
              time: deliveryDate.time,
            }),
          )
        }}
        value={deliveryDate.day}
      >
        <option value="Dzisiaj">Dzisiaj</option>
        <option value="Jutro">Jutro</option>
        {availableDays.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </BasketSelect>

      <BasketSelect
        setter={(e) => {
          setDeliveryDate((prevState) => ({
            ...prevState,
            time: e.target.value,
          }))
          localStorage.setItem(
            'personInfo-delivery-date',
            JSON.stringify({
              day: deliveryDate.day,
              time: e.target.value,
            }),
          )
        }}
        value={deliveryDate.time}
      >
        {deliveryDate.day === 'Dzisiaj' && (
          <option value="Jak najszybciej">Jak najszybciej</option>
        )}
        {availableHours.map((time) => (
          <option value={time} key={time}>
            {formatTime(time)}
          </option>
        ))}
      </BasketSelect>
    </Flex>
  )
}

export default BasketSelectTime
