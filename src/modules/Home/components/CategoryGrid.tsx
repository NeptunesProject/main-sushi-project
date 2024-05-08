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
    <Flex
      flexDirection="column"
      justify="center"
      justifyContent={'center'}
      gap={isLargerThan768 ? 9 : 4}
    >
      <Heading
        id={title}
        fontWeight={isLargerThan768 ? 500 : 600}
        letterSpacing=".35px"
        color="#002034"
        fontFamily={'Rubik'}
        scrollMargin={100}
        fontSize={isLargerThan768 ? 28 : 16}
        lineHeight="24px"
        fontStyle={'normal'}
        textAlign={'left'}
      >
        {title}
      </Heading>

      <Flex
        flexDirection="row"
        flexWrap="wrap"
        rowGap={isLargerThan768 ? '30px' : '19px'}
        columnGap={isLargerThan768 ? '30px' : '20px'}
      >
        {products.map((product, idx) => (
          <ProductCard key={`product_${idx}`} product={product} />
        ))}
      </Flex>
    </Flex>
  )
}

export default CategoryGrid
