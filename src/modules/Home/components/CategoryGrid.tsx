import { Product } from 'types'
import { Flex, Heading } from '@chakra-ui/react'
import ProductCard from './ProductCard'

interface Props<T> {
  title: string
  products: T[]
}

const CategoryGrid = <T extends Product>({ title, products }: Props<T>) => {
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

      <Flex flexWrap="wrap" gap={5} 
      justify={{ base: 'center', md: 'start' }} 
      // justify={'center'} 
      alignItems="center">
        {products.map((product, idx) => (
          <ProductCard key={`product_${idx}`} product={product} />
        ))}
      </Flex>
    </Flex>
  )
}

export default CategoryGrid
