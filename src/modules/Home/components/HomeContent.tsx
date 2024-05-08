import { Center, Container, Flex, Spinner } from '@chakra-ui/react'
import CategoryGrid from './CategoryGrid'
import HomeSlider from './HomeSlider'
import GratitudeNote from './GratitudeNote'
import useProducts from 'hooks/useProducts'
import { useEffect, useMemo } from 'react'
import useCategories from '../../../hooks/useCategories'
import ScrollToTopButton from 'modules/ScrollToTop/ui/ScrollToTop'
import AppNavBar from 'App/AppNavBar'
import { useDispatch } from 'react-redux'
import { fetchProducts } from 'redux/products/operations'
import { AppDispatch } from 'types'

const HomeContent = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

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
    <Container maxW="container.xl" pt="96px" w="100%" pos="relative">
      <Container maxW="container.md" w="100%" pl={0} pr={0}>
        <HomeSlider />
        {isLoading ? (
          <Center h={400}>
            <Spinner />
          </Center>
        ) : (
          <Flex
            maxW="container.lg"
            w="100%"
            flexDirection="column"
            flexWrap={'wrap'}
            gap={20}
            mb={42}
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

      <AppNavBar />
      <ScrollToTopButton />
    </Container>
  )
}

export default HomeContent
