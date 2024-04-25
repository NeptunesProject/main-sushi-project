import { Product } from 'types'
import { Flex, Heading, useMediaQuery } from '@chakra-ui/react'
import ProductCard from './ProductCard'

interface Props<T> {
  title: string
  products: T[]
}

const CategoryGrid = <T extends Product>({ title, products }: Props<T>) => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  return (
    <Flex flexDirection="column" gap={isLargerThan768 ? 9 : 4}>
      <Heading
        id={title}
        textTransform="capitalize"
        color="blue.200"
        scrollMargin={100}
        fontSize={isLargerThan768 ? '28' : '16'}
        lineHeight="24px"
        fontStyle={'normal'}
      >
        {title}
      </Heading>

      <Flex
        flexWrap="wrap"
        rowGap={isLargerThan768 ? '30px' : '20px'}
        columnGap={isLargerThan768 ? '30px' : '20px'}
        justify={{ base: 'center', md: 'start' }}
        justifyContent={'start'}
        // alignItems="center"
      >
        {products.map((product, idx) => (
          <ProductCard key={`product_${idx}`} product={product} />
        ))}
      </Flex>
    </Flex>
  )
}

export default CategoryGrid
