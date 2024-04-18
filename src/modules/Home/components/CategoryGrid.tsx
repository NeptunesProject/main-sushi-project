import { Flex, Heading } from '@chakra-ui/react'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import { selectProducts } from 'redux/products/selectors'

interface Props {
  title: string
}

const CategoryGrid = ({ title }: Props) => {
  const products = useSelector(selectProducts)

  return (
    <Flex flexDirection="column" gap={9}>
      <Heading
        id={title}
        textTransform="capitalize"
        fontSize={28}
        color="blue.200"
        scrollMargin={100}
      >
        {title}
      </Heading>

      <Flex flexWrap="wrap" gap={5} justify={{ base: 'center', md: 'start' }}>
        {products.map((product, idx) => (
          <ProductCard key={`product_${idx}`} product={product} />
        ))}
      </Flex>
    </Flex>
  )
}

export default CategoryGrid
