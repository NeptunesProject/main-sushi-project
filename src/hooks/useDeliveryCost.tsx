import { useQuery } from '@tanstack/react-query'
import { getDeliveryCost } from '../api'

export const useDeliveryCost = () =>{
  const { data } = useQuery(
    {
      queryKey: ['delivery-cost'],
      queryFn: getDeliveryCost,
      staleTime: 1000 * 60 * 15,
      refetchOnWindowFocus: false,
    })
    return data?.deliveryPrice
}
