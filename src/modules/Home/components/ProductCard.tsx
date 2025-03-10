import { AppDispatch, Product } from 'types'
import { Button, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import basket from 'assets/icons/basket.svg'
import { CountButton } from 'ui/CountButton'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, setProductCount } from 'redux/products/ProductsSlice'
import { selectBasketProducts } from 'redux/products/selectors'
import { calculateDiscountedPrice } from 'modules/Basket/OrderFuncs'
import { useTranslation } from 'react-i18next'
import { Tooltip } from '@chakra-ui/react';

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  const [isLargerThan650] = useMediaQuery('(min-width: 650px)')
  const [isLessThan325] = useMediaQuery('(max-width: 325px)')
  const [count, setCount] = useState(1)
  const [currentDiscount, setCurrentDiscount] = useState(1)
  const selectedProducts = useSelector(selectBasketProducts)

  const { i18n } = useTranslation()

  const currentLanguage = i18n.language

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

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

  const index = selectedProducts.findIndex(
    (item) => item.product.id === product.id,
  )

  const navigate = useNavigate()

  const handleAdd = (product: Product, count: number) => {
    dispatch(addProduct({ product, count }))
  }

  const isThisProductAdded = useMemo(() => {
    return selectedProducts.some((item) => item.product.id === product.id)
  }, [selectedProducts, product.id])

  const quantity = selectedProducts[index]?.count
    ? selectedProducts[index].count
    : 0

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discount?.discountPerQuantity ?? {},
    isThisProductAdded ? selectedProducts[index].count : count,
  )

  const handleIncrement = () => {
    if (isThisProductAdded) {
      dispatch(setProductCount({ id: product.id, count: 1 }))
    } else {
      setCount((prevCount) => prevCount + 1)
    }
  }

  const handleDecrement = () => {
    if (isThisProductAdded && selectedProducts[index].count > 1) {
      dispatch(setProductCount({ id: product.id, count: -1 }));
    } else if (isThisProductAdded && selectedProducts[index].count === 1) {
      dispatch(setProductCount({ id: product.id, count: -1 }));
      setCount(1);
    } else if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };


  const isDiscounted =
    product.discount &&
    Object.keys(product.discount.discountPerQuantity).length > 0 &&
    currentDiscount !== 1

  const setDiscount = useCallback(() => {
    if (product.discount) {
      const keys = Object.keys(product.discount.discountPerQuantity)
        .map(Number)
        .sort((a, b) => b - a)

      if (quantity) {
        for (const key of keys) {
          if (quantity >= key) {
            setCurrentDiscount(
              parseFloat(product.discount.discountPerQuantity[key]),
            )
            break
          }
        }
      } else {
        for (const key of keys) {
          if (count >= key) {
            setCurrentDiscount(
              parseFloat(product.discount.discountPerQuantity[key]),
            )
            break
          }
        }
      }
    }
  }, [count, quantity, product.discount])

  useEffect(() => {
    setDiscount()
  }, [product, count, setDiscount])

  const flexBasis = useMemo(() => {
    let items = 1
    if (isLargerThan650) items = 3
    if (isLargerThan768) items = 4
    if (isLessThan325) items = 1

    const indent = isLargerThan650 ? 30 : 20

    return `calc((100% - ${indent}px * (${items} - 1)) / ${items})`
  }, [isLargerThan650, isLargerThan768, isLessThan325])

  const handleNav = (productId: number, categoryId: number) => {
    // localStorage.setItem("setCategory", product.name.split(' ')[0])
    navigate(`/product/${productId}?category=${categoryId}`);
  };
  return (
    <Flex
      fontFamily="'Roboto', sans-serif"
      flexDir="column"
      alignItems="center"
      cursor="pointer"
      bg="white"
      borderRadius={10}
      boxShadow="1px 2px 10px rgba(0,0,0,.12)"
      borderLeftRadius={10}
      borderRightRadius={10}
      overflow={'hidden'}
      flexBasis={flexBasis}
      p={isLargerThan768 ? "0px" : "15px"}
    >
      <Image
        fallback={<Image h={152} borderRadius={3} src={product.img} />}
        onClick={() => handleNav(product.id, product.categoryId)}
        minWidth={isLargerThan768 ? "auto" : "288px"}
        h={isLargerThan768 ? 152 : "auto"}
        src={product.img}
        objectFit="cover"
      />

      <Flex
        flexDir={'column'}
        gap={isLargerThan768 ? "8px" : "22px"}
        p={isLargerThan768 ? '16px' : '0'}
        w="100%"
        h="100%"
        justifyContent={'space-between'}
      >
        <Flex flexDir="column" gap={isLargerThan768 ? "12px" : "8px"}>
          <Text
            onClick={() => navigate(`/product/${product.id}`)}
            fontSize={isLargerThan768 ? "1.16rem" : "1.13rem"}
            fontWeight={isLargerThan768 ? 500 : 600}
            letterSpacing=".35px"
            color="#002034"
            fontFamily={'Rubik'}
          >
            {getNameByTranslate(product)}
          </Text>
          {
            !isLargerThan650 ?
              <Text
                onClick={() => navigate(`/product/${product.id}`)}
                fontSize={isLargerThan768 ? "0.78rem" : "0.77rem"}
                fontWeight={isLargerThan768 ? 500 : 600}
                opacity={0.7}
                color="#002034"
                fontFamily={'Rubik'}
                className="not truncated"
              >
                {getDescriptionByTranslate(product)}
              </Text>
              :
              <Tooltip label={getDescriptionByTranslate(product)} aria-label="Full description" className="truncated">
                <Text
                  onClick={() => navigate(`/product/${product.id}`)}
                  fontSize={isLargerThan768 ? "0.78rem" : "0.77rem"}
                  fontWeight={isLargerThan768 ? 500 : 600}
                  opacity={0.7}
                  color="#002034"
                  fontFamily={'Rubik'}
                  noOfLines={3}
                >
                  {truncateText(getDescriptionByTranslate(product), 200)}
                </Text>
              </Tooltip>
          }
        </Flex>

        <Flex flexDir={'column'}>
          <Text
              fontSize={isLargerThan768 ? 14 : 12}
              fontWeight={700}
              color="#002034"
              alignSelf="start"
              flexWrap="nowrap"
              fontFamily={'Rubik'}
          >
            {product.cartCount} szt
          </Text>

          <Flex align="center" gap="8px">
            <Text
              color="#9090A4"
              fontSize={isLargerThan768 ? 20 : 16}
              fontWeight={500}
              decoration={isDiscounted ? 'line-through' : 'none'}
              fontFamily={'Rubik'}
            >
              {product.price} zł
            </Text>

            {isDiscounted && (
              <Text
                color="#002034"
                fontWeight={900}
                fontSize={20}
                p="2px"
                fontFamily={'Rubik'}
              >
                {discountedPrice} zł
              </Text>
            )}
          </Flex>

          {!isThisProductAdded || count === 0? (
            <Button
              mt="1vh"
              w="100%"
              h={isLargerThan768 ? '40px' : '36px'}
              justifyContent="center"
              gap="8px"
              bg="#418a91"
              color="white"
              borderRadius={20}
              isDisabled={isThisProductAdded}
              _hover={!isThisProductAdded ? { bg: 'gray.200' } : undefined}
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
                {isThisProductAdded ? selectedProducts[index].count : count}
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
    </Flex>
  )
}

export default ProductCard
