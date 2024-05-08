import { useSelector } from 'react-redux'
import { selectLoading, selectProducts } from 'redux/products/selectors'

const useProducts = () => {
  const products = useSelector(selectProducts)
  const isProductsLoading = useSelector(selectLoading)

  return {
    products,
    isProductsLoading,
  }
}

export default useProducts
