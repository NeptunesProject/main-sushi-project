import { Flex, useMediaQuery } from '@chakra-ui/react'
import ProductListItem from './ProductListItem'
import { useSelector } from 'react-redux'
import { selectBasketProducts } from 'redux/products/selectors'

const ProductsList = () => {
  const selectedProducts = useSelector(selectBasketProducts)
  const [isLessThan700] = useMediaQuery('(max-height: 700px)')

  return (
    <Flex
      flexDir="column"
      gap={'10px'}
      style={{overflowY: 'auto' }}
      maxHeight={isLessThan700 ? "34vh" : "42vh"}
    >
      {selectedProducts.map((item) => (
        <ProductListItem key={item.product.id} item={item} />
      ))}
    </Flex>
  )
}

export default ProductsList
