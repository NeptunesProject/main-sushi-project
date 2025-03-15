import {
  Container,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  Box,
  Center,
  Spinner,
  useMediaQuery,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import stubImg from 'assets/img/stub.jpg'
import useProduct from '../../hooks/useProduct'
import { AppDispatch, Product } from '../../types'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { selectBasketProducts } from '../../redux/products/selectors'
import { addProduct, setProductCount } from '../../redux/products/ProductsSlice'
import basket from '../../assets/icons/basket.svg'
import { CountButton } from '../../ui/CountButton'
import useCategories from '../../hooks/useCategories'

const ProductContent = () => {
  const { categories } = useCategories()
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()
  const selectedProducts = useSelector(selectBasketProducts)
  const [count, setCount] = useState(1)

  const { product, isLoading: isProductLoading } = useProduct(String(id), {
    enabled: Boolean(id),
  })
  const [isLargerThan1800] = useMediaQuery('(min-width: 1800px)')
  const [isLargerThan425] = useMediaQuery('(min-width: 425px)')
  const [isLargerThan768] = useMediaQuery('(min-width: 769px)')
  const [isLargerThan900] = useMediaQuery('(min-height: 900px)')
  const [isLargerThan1025] = useMediaQuery('(min-width: 1025px)')
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  const { i18n } = useTranslation()

  const currentLanguage = i18n.language

  const selectedInfoProduct = useMemo(() => {
    return selectedProducts.find(
      (item) => String(item.product.id) === String(id),
    )
  }, [selectedProducts, id])

  const handleAdd = (product: Product, count: number) => {
    dispatch(addProduct({ product, count }))
  }

  const handleIncrement = () => {
    if (selectedInfoProduct && selectedInfoProduct.count && product?.id) {
      dispatch(setProductCount({ id: product.id, count: 1 }))
    } else {
      setCount((prevCount) => prevCount + 1)
    }
  }

  const handleDecrement = () => {
    if (selectedInfoProduct && selectedInfoProduct.count > 1 && product?.id) {
      console.log(selectedInfoProduct, 'selected info product')
      dispatch(setProductCount({ id: product.id, count: -1 }))
    } else if (
      selectedInfoProduct &&
      selectedInfoProduct.count === 1 &&
      product?.id
    ) {
      dispatch(setProductCount({ id: product.id, count: -1 }))
      setCount(1)
    } else if (count > 1) {
      setCount((prevCount) => prevCount - 1)
    }
  }

  const isDiscounted = Boolean(product?.discount)
  console.log(product, 'product')

  const calculateDiscountedPrice = (
    price: number,
    discountPerQuantity: any,
    count: number,
  ): number | null => {
    if (!discountPerQuantity || !Object.keys(discountPerQuantity).length)
      return null
    const numericDiscountPerQuantity = Object.fromEntries(
      Object.entries(discountPerQuantity).map(([key, value]) => [
        Number(key),
        value,
      ]),
    ) as Record<number, number>
    const applicableDiscount = numericDiscountPerQuantity[count] || 0 // Default to 0 if no specific discount for quantity
    const discountedPrice = price * (1 - applicableDiscount) // Apply discount
    return discountedPrice > 0 ? discountedPrice : 0 // Ensure non-negative price
  }

  const discountedPrice = isDiscounted
    ? calculateDiscountedPrice(
        Number(product?.price),
        product?.discount.discountPerQuantity,
        count,
      )
    : null

  const totalDiscountedPrice = discountedPrice
    ? Math.round(discountedPrice * (selectedInfoProduct?.count || count))
    : null

  console.log(totalDiscountedPrice, 'Total Discounted Price')

  const getNameByTranslate = (product: Product) => {
    switch (currentLanguage) {
      case 'en':
        return product.nameEn
      case 'ua':
        return product.nameUa
      case 'pl':
        return product.name
      case 'ru':
        return product.nameRu
    }
  }

  const category = useMemo(() => {
    const categoryObj = categories?.find(
      (category) => category.id === product?.categoryId,
    )
    if (categoryObj) return getNameByTranslate(categoryObj as Product)
    else return 'Other'
  }, [categories, product])

  const getDescriptionByTranslate = (product: Product) => {
    switch (currentLanguage) {
      case 'en':
        return product.descriptionEn
      case 'ua':
        return product.descriptionUa
      case 'pl':
        return product.description
      case 'ru':
        return product.descriptionRu
      default:
        return product.description
    }
  }
  const [ingredients, setIngredients] = useState<string[]>(
    product ? getDescriptionByTranslate(product).split(',') : [],
  )
  useEffect(() => {
    if (product) setIngredients(getDescriptionByTranslate(product).split(','))
  }, [product])

  if (isProductLoading)
    return (
      <Center h={600}>
        <Spinner />
      </Center>
    )

  if (!product || !product.id) return <Heading>product was not found</Heading>
  // console.log(selectedInfoProduct, 'selected info prod')
  // console.log(selectedProducts, 'selected prod')

  return (
    <Container
      maxW={isLargerThan1025 ? 'container' : undefined}
      pt={'14vh'}
      fontFamily="'Roboto', sans-serif"
      display="flex"
      justifyContent="center"
      pb={!isLargerThan768 ? '30px' : 0}
      ml={0}
      mr={0}
    >
      <Box maxW={{ base: 500, lg: 1150 }} minW={{ base: 'auto', lg: '80%' }}>
        <Heading
          mb={isLargerThan900 ? 10 : 0}
          color="blue.200"
          fontSize={isLargerThan900 ? '36px' : '20px'}
        >
          {getNameByTranslate(product)}
        </Heading>
        <Flex>
          <Link
            to="/"
            as={RouterLink}
            sx={{
              _hover: {
                color: 'blue.700',
              },
            }}
            color="gray"
          >
            Strona główna
          </Link>
          <span style={{ margin: '0 10px' }}>|</span>
          <Link
            sx={{
              _hover: {
                color: 'blue.700',
              },
            }}
            to="/"
            as={RouterLink}
            _hover="none"
            color="gray"
            onClick={() =>
              localStorage.setItem('setCategory', category ?? 'Other')
            }
          >
            {category}
          </Link>
          <span style={{ margin: '0 10px' }}>|</span>
          <Text _hover="none">{product.name}</Text>
        </Flex>
        <Flex
          align={'start'}
          gap={12}
          flexWrap={!isLargerThan1024 ? 'wrap' : undefined}
          justify="start"
          mt={5}
        >
          <Image
            fallback={
              <Image
                maxW={400}
                borderRadius={3}
                filter="blur(20px)"
                src={'/images/fallback.jpg'}
              />
            }
            src={product.img}
            w={isLargerThan768 ? '50vh' : '95vw'}
            objectFit="contain"
            mb={isLargerThan768 ? '50px' : 0}
            //boxSize={isLargerThan700 ? { base: 250, xs: 440, xxs: "100%" } : { base: 170, xs: 200, xxs: "80%" }}
          />
          <Flex w={'100%'} flexDir="column" gap={15} minW={{ md: 450 }}>
            <UnorderedList
              minH="95px"
              display="flex"
              flexDir="column"
              flexWrap="wrap"
              maxH={isLargerThan768 ? '200px' : 'auto'}
              ml="0"
              listStyleType="none"
            >
              {ingredients.map((ingredient) => (
                <ListItem mr="25px" key={ingredient}>
                  {ingredient}
                </ListItem>
              ))}
            </UnorderedList>
            <Flex flexDir="column" gap={15}>
              <Text fontWeight={700} fontSize={18} color={'#002034'}>
                {product.weight && <Text>Weight: {product.weight}</Text>}
                <Text>Waga: {product.weight} gram</Text>
              </Text>
              <Text fontWeight={700} fontSize={18} color={'#002034'}>
                {product.weight && <Text>Weight: {product.weight}</Text>}
                <Text>Sztuk: {product.cartCount} szt</Text>
              </Text>
              <Flex
                 flexDir={isLargerThan1800 ? 'column' : 'row'}
                justifyContent={'space-between'}
                mb={10}
                w={isLargerThan768 ? 'auto' : '90vw'}
                align={isLargerThan1800 ?'start':'center'}
              >
                <Flex align="center">
                  <Text
                    fontSize={isLargerThan768 ? 30 : 18}
                    fontWeight={700}
                    color="blue.200"
                    decoration={isDiscounted ? 'line-through' : 'none'}
                    isTruncated
                  >
                    {product.price} zł
                  </Text>
                  {isDiscounted && totalDiscountedPrice !== null && (
                    <Text
                      color={'#002034'}
                      fontWeight={500}
                      fontSize={isLargerThan768 ? 30 : 18}
                      p="2px"
                      ml={3}
                      fontFamily={'Rubik'}
                      isTruncated
                    >
                      {totalDiscountedPrice} zł
                    </Text>
                  )}
                </Flex>
                {!selectedInfoProduct || selectedInfoProduct.count === 0 ? (
                  <Button
                    // ml={10}
                    w={
                      isLargerThan425
                        ? '230px'
                        : '160px'
                    }
                    h={'50px' }
                    justifyContent="center"
                    gap="8px"
                    bg="#418a91"
                    color="white"
                    borderRadius={20}
                    isDisabled={!!selectedInfoProduct}
                    _hover={
                      !selectedInfoProduct ? { bg: 'gray.200' } : undefined
                    }
                    onClick={() => {
                      handleAdd(product, count)
                      setCount(1)
                    }}
                    _disabled={{
                      cursor: 'not-allowed',
                    }}
                  >
                    <Text
                      fontSize={isLargerThan768 ? 14 : 12}
                      fontWeight={400}
                      fontFamily={'Rubik'}
                    >
                      Dodaj do koszyka
                    </Text>
                    <Image src={basket} h={22} />
                  </Button>
                ) : (
                  <Flex
                    // ml={10}
                    w={
                      isLargerThan425
                        ? '230px'
                        : '160px'
                    }
                    h={'50px'}
                    bg="#418a91"
                    color="white"
                    borderRadius={20}
                    alignItems="center"
                    gap={{ base: 0.5, md: 1 }}
                  >
                    <CountButton
                      onClick={handleDecrement}
                      borderLeftRadius={20}
                      borderRightRadius={5}
                      bg="none"
                      h="100%"
                      variant="card"
                    >
                      -
                    </CountButton>
                    <CountButton
                      flex={1}
                      onClick={handleIncrement}
                      h="100%"
                      borderRadius={0}
                      w="100%"
                      variant="card"
                    >
                      {selectedInfoProduct ? selectedInfoProduct.count : count}
                    </CountButton>

                    <CountButton
                      variant="card"
                      onClick={handleIncrement}
                      borderRightRadius={20}
                      borderLeftRadius={5}
                      h="100%"
                    >
                      +
                    </CountButton>
                  </Flex>
                )}
              </Flex>
            </Flex>

            {/*<Flex*/}
            {/*  borderRadius={10}*/}
            {/*  gap={5}*/}
            {/*  flexDir="column"*/}
            {/*  w="100%"*/}
            {/*  border="1px solid"*/}
            {/*  borderColor="turquoise.77"*/}
            {/*  py={5}*/}
            {/*  px={9}*/}
            {/*>*/}
            {/*  /!*<Text fontWeight={700} color="turquoise.77">*!/*/}
            {/*  /!*  Delivery*!/*/}
            {/*  /!*</Text>*!/*/}

            {/*  /!*<Text>We offer a 10% discount for self pick-up</Text>*!/*/}
            {/*  <Text>{product.description}</Text>*/}

            {/*</Flex>*/}
          </Flex>
        </Flex>
      </Box>
    </Container>
  )
}

export default ProductContent
