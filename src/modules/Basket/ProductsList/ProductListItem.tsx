import { SelectedProduct, AppDispatch } from 'types'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import stubImg from 'assets/img/stub.jpg'
import CountButton from '../../../ui/CountButton'
import closeIcon from 'assets/icons/delete.svg'
import { useBasketDispatchContext } from '../../../contexts/BasketContext'
import { useDispatch } from 'react-redux'
import {
  setSelectedProductCount,
  deleteSelectedProduct,
} from 'redux/products/ProductsSlice'

interface Props {
  item: SelectedProduct
}

const ProductListItem = ({ item }: Props) => {
  const { calculateDiscountedPrice } = useBasketDispatchContext()
  let count: number = item.count
  const itemId: number = item.product.id

  const dispatch = useDispatch<AppDispatch>()

  const handleCount = (id: number, count: number) => {
    dispatch(setSelectedProductCount({ id, count }))
  }

  const handleDelete = (id: number) => {
    dispatch(deleteSelectedProduct({ id }))
  }

  const isDiscounted = Boolean(item.product.discount)

  const price = isDiscounted
    ? calculateDiscountedPrice(
        item.product.price,
        item.product.discount.discountPerQuantity,
        item.count,
      )
    : null

  return (
    <Flex align="center" justify="space-between" w="100%" color="blue.200">
      <Flex gap={2} align="center">
        <Image
          src={item.product.img}
          boxSize={12}
          fallback={<Image boxSize={12} src={stubImg} />}
        />

        <Box>
          <Text maxW={130} fontSize={14} lineHeight="14px" fontWeight={600}>
            {item.product.name}
          </Text>
          <Text fontSize={13}>
            {Number(item.product.weight * item.count).toFixed(2)} gram /{' '}
            {item.product.size * item.count} шт.
          </Text>
        </Box>
      </Flex>

      <Flex align="center" gap={3}>
        <Flex align="center" gap={2}>
          <CountButton
            borderLeftRadius={20}
            borderRightRadius={5}
            onClick={() => {
              if (count > 1) {
                count = count - 1
                handleCount(itemId, count)
              }
            }}
          >
            -
          </CountButton>

          <Text fontSize={12} fontWeight={600}>
            {item.count}
          </Text>

          <CountButton
            borderRightRadius={20}
            borderLeftRadius={5}
            onClick={() => {
              count = count + 1
              handleCount(itemId, count)
            }}
          >
            +
          </CountButton>
        </Flex>

        {price && (
          <Text minW={10} fontWeight={600}>
            {price * item.count} zł
          </Text>
        )}

        <Text
          minW={10}
          fontWeight={600}
          decoration={isDiscounted ? 'line-through' : 'none'}
        >
          {item.product.price * item.count} zł
        </Text>

        <Image
          cursor="pointer"
          src={closeIcon}
          onClick={() => handleDelete(itemId)}
        />
      </Flex>
    </Flex>
  )
}

export default ProductListItem
