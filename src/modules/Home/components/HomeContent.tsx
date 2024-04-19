import { Center, Container, Flex, Spinner } from '@chakra-ui/react'
import CategoryGrid from './CategoryGrid'
import HomeSlider from './HomeSlider'
import GratitudeNote from './GratitudeNote'
import useProducts from 'hooks/useProducts'
import { useMemo } from 'react'
import useCategories from '../../../hooks/useCategories'
import BottomLogo from './BottomLogo'

const HomeContent = () => {
  const { products, isProductsLoading } = useProducts()
  const { categories, isCategoriesLoading } = useCategories()

  const isLoading = isProductsLoading || isCategoriesLoading
  const isDataEmpty = !products?.length || !categories?.length

  const productsByCategory = useMemo(() => {
    if (isLoading || isDataEmpty) return {}

    return categories.reduce((acc, category) => {
      const categoryProducts = products.filter(
        (product) => product.categoryId === category.id,
      )
      if (!categoryProducts.length) return acc
      return {
        ...acc,
        [category.name]: categoryProducts,
      }
    }, {})
  }, [categories, isDataEmpty, isLoading, products])

  return (
    <Container maxW="container.xl" pb={10} pt={20} w="100%">
      <Container maxW="container.lg" w="85%">
        <HomeSlider />
        {isLoading ? (
          <Center h={400}>
            <Spinner />
          </Center>
        ) : (
          <Flex
            maxW="container.lg"
            // w="85%"
            w="100%"
            flexDirection="column"
            gap={20}
            mb={185}
          >
            {Object.entries(productsByCategory).map(([category, products]) => (
              <CategoryGrid
                key={category}
                title={category}
                products={products as never}
              />
            ))}
          </Flex>
        )}
      </Container>
      <GratitudeNote />
      <BottomLogo />
    </Container>
  )
}

export default HomeContent
