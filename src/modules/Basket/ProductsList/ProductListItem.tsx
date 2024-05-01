import { SelectedProduct, AppDispatch } from 'types'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import stubImg from 'assets/img/stub.jpg'
import {
  CountButtonBasketInc,
  CountButtonBasketDec,
} from '../../../ui/CountButton'
import closeIcon from 'assets/icons/delete.svg'
import { useDispatch } from 'react-redux'
import {
  setSelectedProductCount,
  deleteSelectedProduct,
} from 'redux/products/ProductsSlice'

interface Props {
  item: SelectedProduct
}

const ProductListItem = ({ item }: Props) => {
  let count: number = item.count
  const itemId: number = item.product.id

  const dispatch = useDispatch<AppDispatch>()

  const handleCount = (id: number, count: number) => {
    dispatch(setSelectedProductCount({ id, count }))
  }

  const handleDelete = () => {
    dispatch(deleteSelectedProduct({ itemId }))
  }

  const increaseCount = () => {
    count = count + 1
    handleCount(itemId, count)
  }

  const decreaseCount = () => {
    if (count > 1) {
      count = count - 1
      handleCount(itemId, count)
    }
  }

  return (
    <Flex
      align="center"
      justify="space-between"
      w="100%"
      color="blue.200"
      backgroundColor={'#ECECF5'}
      borderRadius={'9px'}
    >
      <Flex gap={3} align="center">
        <Image
          src={item.product.img}
          width={'69px'}
          height={'92px'}
          fallback={<Image boxSize={19} src={stubImg} />}
          overflow={'hidden'}
          borderLeftRadius={'9px'}
        />
        <Flex gap={'8px'}>
          <Box>
            <Text
              maxW={130}
              fontSize={16}
              lineHeight="24px"
              fontWeight={400}
              fontFamily={'Rubik'}
              color={'#002034'}
              fontStyle={'normal'}
            >
              {item.product.name}
            </Text>
            <Text
              fontSize={14}
              fontFamily={'Rubik'}
              fontStyle={'normal'}
              fontWeight={400}
              lineHeight="21px"
              color={'#9090A4'}
            >
              {Number(item.product.weight * item.count).toFixed(2)} gram /{' '}
              {item.product.size * item.count} шт.
            </Text>
            <Flex>
              <Text
                fontSize={'16px'}
                minW={10}
                fontWeight={400}
                lineHeight={'24px'}
                color={'#002034'}
                fontFamily={'Rubik'}
              >
                {item.product.price * item.count} zł
              </Text>
            </Flex>
          </Box>
        </Flex>

        <Flex align="center" gap={3} mr={'6px'}>
          <Flex
            align="center"
            gap={2}
            backgroundColor={'#FFFFFF'}
            overflow={'hidden'}
            borderRightRadius={5}
            borderLeftRadius={5}
            borderColor={'#B7B7B7'}
            borderWidth={'1px'}
          >
            <CountButtonBasketDec
              borderLeftRadius={5}
              borderRightRadius={5}
              onClick={decreaseCount}
            >
              -
            </CountButtonBasketDec>

            <Text
              fontSize={16}
              fontWeight={400}
              fontFamily={'Rubik'}
              lineHeight={'24px'}
              color={'#002034'}
              fontStyle={'normal'}
            >
              {item.count}
            </Text>

            <CountButtonBasketInc
              borderRightRadius={5}
              borderLeftRadius={5}
              onClick={increaseCount}
            >
              +
            </CountButtonBasketInc>
          </Flex>
        </Flex>
        <Image cursor="pointer" src={closeIcon} onClick={handleDelete} />
      </Flex>
    </Flex>
  )
}

export default ProductListItem
