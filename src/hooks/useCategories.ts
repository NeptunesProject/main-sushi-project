import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api'

const useCategories = () => {
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
  })

  return {
    categories,
    isCategoriesLoading,
  }
}

export default useCategories
