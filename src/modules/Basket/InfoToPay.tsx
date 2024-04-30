import { Box, Flex, Text } from '@chakra-ui/react'
import { selectBasketProducts, selectVoucher } from 'redux/products/selectors'
import { useSelector } from 'react-redux'
import { useTotalPrice, useTotalWeight } from './InfoToPayHooks'
import { calculateDiscountedPrice } from './OrderFuncs'
import { calculateTotalPrice } from 'utils/calculateDiscountedPrice'

const InfoToPay = () => {
  const voucher = useSelector(selectVoucher)
  const selectedProducts = useSelector(selectBasketProducts)
  const totalWeight = useTotalWeight(selectedProducts)
  const totalPrice = calculateTotalPrice(selectedProducts)
  const totalPriceWithDiscount = useTotalPrice(
    selectedProducts,
    calculateDiscountedPrice,
  )
  // const discountedPriceWithVoucher = totalPrice * voucher.discount

  let isVoucherActive = false
  let isDiscounted = false

  if (totalPrice - totalPriceWithDiscount > 0) isDiscounted = true

  if (totalPrice !== 0 && voucher.discount !== 1) {
    isVoucherActive = true
  }

  return (
    <Flex direction="column">
      {/* <Box>
        <Text color="grey.200">Total weight:</Text>
        <Text color="blue.200" fontWeight={600}>
          {Number(totalWeight.toFixed(2))} gram
        </Text>
      </Box> */}
      <Flex alignSelf={'center'}>
        <Text
          color="#9090A4"
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          fontWeight={'500'}
          fontSize={'16px'}
          lineHeight={'24px'}
        >
          Discount:
        </Text>
        {/* <Text
          color="blue.200"
          fontWeight={600}
          decoration={isVoucherActive ? 'line-through' : 'none'}
        >
          {Number(totalPrice.toFixed(2))} zł
        </Text> */}
      </Flex>

      <Flex alignSelf={'center'}>
        <Text
          color="#002034"
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          fontWeight={'500'}
          fontSize={'16px'}
          lineHeight={'24px'}
        >
          Total:
        </Text>
        <Text
          color="blue.200"
          fontWeight={600}
          decoration={isVoucherActive ? 'line-through' : 'none'}
        >
          {Number(totalPrice.toFixed(2))} zł
        </Text>
        {/* {isVoucherActive && (
          <Text color="blue.200" fontWeight={600}>
            {Number(totalPrice.toFixed(2))} zł
          </Text>
        )} */}
      </Flex>
    </Flex>
  )
}

export default InfoToPay
