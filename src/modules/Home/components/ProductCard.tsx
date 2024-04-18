import { DiscountObj, Product } from 'types'
import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import stubImg from 'assets/img/stub.jpg'
import basket from "assets/icons/basket.svg"
import {
  useBasketContext,
  useBasketDispatchContext,
} from 'contexts/BasketContext'
// import CountButton from 'ui/CountButton'

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const {
    addProduct,
    isProductAdded,
    calculateDiscountedPrice,
    // removeProduct,
  } = useBasketDispatchContext()
  const { products } = useBasketContext()
  const [count, setCount] = useState(1)
  const [currentDiscount, setCurrentDiscount] = useState(1)

  const navigate = useNavigate()

  const discount: DiscountObj = {
    id: 1,
    discountPerQuantity: {
      1: '0.1',
      5: '0.3',
      10: '0.5',
    },
  }

  const isThisProductAdded = useMemo(
    () => isProductAdded(product),
    [isProductAdded, product],
  )

  const findProductById = (id: number) => {
    const product = products.find((item) => item.id === id)
    return product ? product.count : 0
  }
  const quantity = findProductById(product.id)

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    discount.discountPerQuantity,
    quantity ? quantity : count,
  )

  // const handleIncrement = () => {
  //   if (quantity) {
  //     addProduct(product)
  //   } else {
  //     setCount((prevCount) => prevCount + 1)
  //   }
  // }

  // const handleDecrement = () => {
  //   if (quantity && quantity > 1) {
  //     removeProduct(product)
  //   } else if (count > 1) {
  //     setCount((prevCount) => prevCount - 1)
  //   }
  // }
  const isDiscounted = Boolean(currentDiscount) && currentDiscount !== 1

  const setDiscount = useCallback(() => {
    if (discount) {
      const keys = Object.keys(discount.discountPerQuantity)
        .map(Number)
        .sort((a, b) => b - a)

      if (quantity) {
        for (const key of keys) {
          if (quantity >= key) {
            setCurrentDiscount(parseFloat(discount.discountPerQuantity[key]))
            break
          }
        }
      } else {
        for (const key of keys) {
          if (count >= key) {
            setCurrentDiscount(parseFloat(discount.discountPerQuantity[key]))
            break
          }
        }
      }
    }
  }, [count, quantity])

  useEffect(() => {
    setDiscount()
  }, [setDiscount, count])

  return (
    <Flex
      fontFamily="'Roboto', sans-serif"
      flexDir="column"
      alignItems="center"
      w={328}
      h={453}
      cursor="pointer"
      bg="white"
      borderRadius={10}
      boxShadow="1px 2px 10px rgba(0,0,0,.12)"
    >
      <Text
        onClick={() => navigate(`/product/${product.id}`)}
        fontSize={20}
        lineHeight="19px"
        fontWeight={800}
        letterSpacing=".35px"
        color="#002034"
        whiteSpace="nowrap"
        my={6}
      >
        {product.name}
      </Text>

      <Image
        fallback={<Image w={223} h={221} borderRadius={3} src={stubImg} />}
        onClick={() => navigate(`/product/${product.id}`)}
        w={223}
        h={221}
        src={product.img}
        borderLeftRadius={10}
      />

      {/* <Flex
        w="100%"
        flexDir="column"
        align="start"
        justify="space-between"
        p={2.5}
        pl={{ base: 2, md: 4 }}
        overflow="hidden"
      > */}

      <Flex
        // justifyContent="space-between"
        w="80%"
        mt={4}
        flexGrow={1}
        gap={20}
      >
        <Flex flexDir="column">
          <Text fontSize={12} fontWeight={200} color="black" alignSelf="start" flexWrap="nowrap">
            {product.weight} / {product.cartCount}
          </Text>
        </Flex>
        <Flex flexDir="column">
          <Text color="#757575" fontSize={13} fontWeight={400}>
            Avocado, Flying fish caviar, Cream cheese, Fresh salmon, Nori,
            Cucumber, Rice
          </Text>
        </Flex>
      </Flex>

      {isDiscounted && (
        <Text
          color="#002034"
          fontWeight={400}
          fontSize={12}
          alignSelf="end"
          marginRight="10%"
          // mt={4}
        >
          (Discount: {currentDiscount * 100}%)
        </Text>
      )}

      <Flex justifyContent="space-between" w="90%" my={2} alignItems="center">
        <Flex flexDir="column">
          <Flex align="center" justify="space-between" w="100%">
            <Text
              color="#002034"
              fontSize={15}
              fontWeight={400}
              decoration={isDiscounted ? 'line-through' : 'none'}
            >
              {product.price} zł
            </Text>

            {isDiscounted && (
              <Text color="#154C8D" fontWeight={400} fontSize={15} ml={2}>
                {discountedPrice} zł
              </Text>
            )}

            {/* <Flex gap={{ base: 0.5, md: 1 }}>
          <CountButton
            onClick={handleDecrement}
            borderLeftRadius={20}
            borderRightRadius={5}
          >
            -
          </CountButton>
          <Text>{quantity ? quantity : count}</Text>
          <CountButton
            onClick={handleIncrement}
            borderRightRadius={20}
            borderLeftRadius={5}
          >
            +
          </CountButton>
        </Flex> */}
          </Flex>
        </Flex>
        <Flex>
          <Button
            // w="100%"
            w="189px"
            // bg="turquoise.77"
            justifyContent="space-around"
            bg="#002034"
            color="white"
            h={8}
            borderRadius={20}
            onClick={() => {
              addProduct(product, count)
              setCount(1)
            }}
          >
            <Text fontSize={12} fontWeight={400}>
              {isThisProductAdded ? 'Added to basket' : 'Add to cart' }
            </Text>
            <Image src={basket} h={22} w={19}/>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ProductCard
