import { AppDispatch, Product } from 'types'
import { Button, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import basket from 'assets/icons/basket.svg'
import sushiImg from 'assets/img/SuhsiTestImg.jpg'
import { CountButton } from 'ui/CountButton'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, setProductCount } from 'redux/products/ProductsSlice'
import { selectBasketProducts } from 'redux/products/selectors'
import { calculateDiscountedPrice } from 'modules/Basket/OrderFuncs'

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  const [isLargerThan650] = useMediaQuery('(min-width: 650px)')
  const [isLargerThan1258] = useMediaQuery('(min-width: 1253px)')
  const [isLessThan325] = useMediaQuery('(max-width: 325px)')
  const [count, setCount] = useState(1)
  const [currentDiscount, setCurrentDiscount] = useState(1)
  const selectedProducts = useSelector(selectBasketProducts)

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
      dispatch(setProductCount({ id: product.id, count: -1 }))
    } else if (count > 1) {
      setCount((prevCount) => prevCount - 1)
    }
  }

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
    let items = 2
    if (isLargerThan650) items = 3
    if (isLargerThan768) items = 4
    if (isLessThan325) items = 1

    const indent = isLargerThan650 ? 30 : 20

    return `calc((100% - ${indent}px * (${items} - 1)) / ${items})`
  }, [isLargerThan650, isLargerThan768, isLessThan325])

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
    >
      <Image
        fallback={<Image h={152} borderRadius={3} src={sushiImg} />}
        onClick={() => navigate(`/product/${product.id}`)}
        minWidth="288px"
        h={isLargerThan768 ? 152 : 109}
        src={product.img}
      />

      <Flex
        flexDir={'column'}
        gap="8px"
        p={isLargerThan768 ? '16px' : '6px'}
        w="100%"
      >
        <Text
          onClick={() => navigate(`/product/${product.id}`)}
          fontSize={isLargerThan768 ? 20 : 16}
          fontWeight={isLargerThan768 ? 500 : 600}
          letterSpacing=".35px"
          color="#002034"
          fontFamily={'Rubik'}
          height={isLargerThan1258 ? 8 : 12}
        >
          {product.name}
        </Text>

        <Text
          fontSize={14}
          fontWeight={400}
          color="#002034"
          alignSelf="start"
          flexWrap="nowrap"
          fontFamily={'Rubik'}
        >
          {product.weight} gram / {product.cartCount} pieces
        </Text>

        <Flex align="center" gap="8px">
          <Text
            color="#002034"
            fontSize={isLargerThan768 ? 20 : 16}
            fontWeight={500}
            decoration={isDiscounted ? 'line-through' : 'none'}
            fontFamily={'Rubik'}
          >
            {product.price} zł
          </Text>

          {isDiscounted && (
            <Text
              color="#9090A4"
              fontWeight={400}
              fontSize={16}
              p="2px"
              fontFamily={'Rubik'}
            >
              {discountedPrice} zł
            </Text>
          )}
        </Flex>

        {!isThisProductAdded ? (
          <Button
            w="100%"
            h={isLargerThan768 ? '40px' : '36px'}
            justifyContent="center"
            gap="8px"
            bg="#002034"
            color="white"
            borderRadius={20}
            isDisabled={isThisProductAdded}
            _hover={!isThisProductAdded && { bg: 'gray.300' }}
            onClick={() => {
              handleAdd(product, count)
              setCount(1)
            }}
            _disabled={{
              cursor: 'not-allowed',
            }}
          >
            <Text fontSize={16} fontWeight={400} fontFamily={'Rubik'}>
              Add to cart
            </Text>
            <Image src={basket} h={22} />
          </Button>
        ) : (
          <Flex
            w="100%"
            h="40px"
            bg="#002034"
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
            >
              -
            </CountButton>
            <Text flex={1} align="center">
              {isThisProductAdded ? selectedProducts[index].count : count}
            </Text>

            <CountButton
              onClick={handleIncrement}
              borderRightRadius={20}
              borderLeftRadius={5}
              bg="none"
              h="100%"
            >
              +
            </CountButton>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default ProductCard
