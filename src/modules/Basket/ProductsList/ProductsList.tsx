import { Flex } from '@chakra-ui/react'
import ProductListItem from './ProductListItem'
import { useSelector } from 'react-redux'
import { selectBasketProducts } from 'redux/products/selectors'

const ProductsList = () => {
  const selectedProducts = useSelector(selectBasketProducts)
  return (
    <Flex flexDir="column" gap={4}>
      {selectedProducts.map((item) => (
        <ProductListItem key={item.product.id} item={item} />
      ))}
    </Flex>
  )
}

export default ProductsList
