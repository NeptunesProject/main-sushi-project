import {
  Container,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  Box,
  Center,
  Spinner, useMediaQuery,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import stubImg from 'assets/img/stub.jpg'
import useProduct from '../../hooks/useProduct'
import { AppDispatch, Product } from '../../types'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { selectBasketProducts } from '../../redux/products/selectors'
import { addProduct, setProductCount } from '../../redux/products/ProductsSlice'
import basket from '../../assets/icons/basket.svg'
import { CountButton } from '../../ui/CountButton'


const ProductContent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()
  const selectedProducts = useSelector(selectBasketProducts)
  const [count, setCount] = useState(1)

  const { product, isLoading: isProductLoading } = useProduct(String(id), {
    enabled: Boolean(id),
  })
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  const [isLargerThan700] = useMediaQuery('(min-height: 700px)')
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language

  const selectedInfoProduct = useMemo(
    () => {
      return selectedProducts.find((item) => String(item.product.id) === String(id))
    },
    [selectedProducts, id],
  )

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
      console.log(selectedInfoProduct, "selected info product")
      dispatch(setProductCount({ id: product.id, count: -1 }));
    } else if (selectedInfoProduct && selectedInfoProduct.count === 1 && product?.id) {
      dispatch(setProductCount({ id: product.id, count: -1 }));
      setCount(1);
    } else if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const isDiscounted = Boolean(product?.discount)
  console.log(product, 'product')

  const calculateDiscountedPrice = (
    price: number,
    discountPerQuantity: any,
    count: number
  ): number | null => {
    if (!discountPerQuantity || !Object.keys(discountPerQuantity).length) return null;
    const numericDiscountPerQuantity = Object.fromEntries(
      Object.entries(discountPerQuantity).map(([key, value]) => [Number(key), value])
    ) as Record<number, number>;
    const applicableDiscount = numericDiscountPerQuantity[count] || 0; // Default to 0 if no specific discount for quantity
    const discountedPrice = price * (1 - applicableDiscount); // Apply discount
    return discountedPrice > 0 ? discountedPrice : 0; // Ensure non-negative price
  };

  const discountedPrice = isDiscounted
    ? calculateDiscountedPrice(
      Number(product?.price),
      product?.discount.discountPerQuantity,
      count
    )
    : null;

  const totalDiscountedPrice = discountedPrice
    ? Math.round(discountedPrice * (selectedInfoProduct?.count || count))
    : null;

  console.log(totalDiscountedPrice, 'Total Discounted Price');

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
  if (isProductLoading)
    return (
      <Center h={600}>
        <Spinner />
      </Center>
    )

  if (!product || !product.id) return <Heading>product was not found</Heading>
  console.log(selectedInfoProduct, 'selected info prod')
  console.log(selectedProducts, 'selected prod')
  return (
    <Container
      maxW="container.xl"
      pt={"14vh"}
      fontFamily="'Roboto', sans-serif"
      display="flex"
      justifyContent="center"
      pb={!isLargerThan768 ? "30px" : 0}
    >
      <Box maxW={{ base: 500, lg: 1150 }} minW={{ base: 'auto', lg: '80%' }}>
        <Heading mb={isLargerThan700 ? 10 : 0} color="blue.200" fontSize={isLargerThan700 ? "36px" : "20px"}>
          {getNameByTranslate(product)}
        </Heading>
        <Flex align="center" gap={12} flexWrap={!isLargerThan768 ? "wrap" : undefined} justify="start" mt={5}>
          <Image
            src={product.img}
            fallback={<Image src={stubImg}/>}
            boxSize={'40vh'}
            // boxSize={isLargerThan700 ? { base: 250, xs: 440, xxs: "100%" } : { base: 170, xs: 200, xxs: "80%" }}
          />

          <Flex flexDir="column" gap={15} minW={{ md: 450 }}>
            <Flex flexDir="column" gap={15}>
              <Text fontWeight={700} fontSize={18} color={'#002034'}>
                {product.weight && <Text>Weight: {product.weight}</Text>}
                <Text>{product.cartCount} szt</Text>
              </Text>
              <Flex w="100%" align="center">
                <Text fontSize={32} fontWeight={700} color="blue.200" decoration={isDiscounted ? 'line-through' : 'none'}>
                  {product.price} zł
                </Text>
                {isDiscounted && totalDiscountedPrice !== null && (
                  <Text
                    color={'#002034'}
                    fontWeight={500}
                    fontSize={32}
                    p="2px"
                    ml={3}
                    fontFamily={'Rubik'}
                  >
                    {totalDiscountedPrice} zł
                  </Text>
                )}
              </Flex>
            </Flex>

            <Text
              borderRadius={10}
              gap={5}
              flexDir="column"
              w="100%"
              border="1px solid"
              borderColor="turquoise.77"
              py={5}
              px={9}
            >
                {getDescriptionByTranslate(product)}
            </Text>

            {!selectedInfoProduct || selectedInfoProduct.count === 0? (
              <Button
                mt="1vh"
                w="100%"
                h={isLargerThan768 ? '40px' : '36px'}
                justifyContent="center"
                gap="8px"
                bg="#418a91"
                color="white"
                borderRadius={20}
                isDisabled={!!selectedInfoProduct}
                _hover={!selectedInfoProduct ? { bg: 'gray.200' } : undefined}
                onClick={() => {
                  handleAdd(product, count)
                  setCount(1)
                }}
                _disabled={{
                  cursor: 'not-allowed',
                }}
              >
                <Text fontSize={16} fontWeight={400} fontFamily={'Rubik'}>
                  Dodaj do koszyka
                </Text>
                <Image src={basket} h={22} />
              </Button>
            ) : (
              <Flex
                mt="1vh"
                w="100%"
                h="40px"
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
                <CountButton flex={1} onClick={handleIncrement} h="100%" borderRadius={0} w="100%" variant="card">
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
