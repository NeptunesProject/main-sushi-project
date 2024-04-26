import { Box, Flex, Text } from '@chakra-ui/react'
import { selectBasketProducts, selectVoucher } from 'redux/products/selectors'
import { useSelector } from 'react-redux'
import { useTotalPrice, useTotalWeight } from './InfoToPayHooks'
import { calculateDiscountedPrice } from './OrderFuncs'

const InfoToPay = () => {
  const voucher = useSelector(selectVoucher)
  const selectedProducts = useSelector(selectBasketProducts)
  const totalPrice = useTotalPrice(selectedProducts, calculateDiscountedPrice)
  const totalWeight = useTotalWeight(selectedProducts)

  const discountedPrice = totalPrice * voucher.discount

  let isVoucherActive = false
  if (totalPrice !== 0 && voucher.discount !== 1) {
    isVoucherActive = true
  }

  return (
    <Flex w="100%" justify="space-between" align="end">
      <Box>
        <Text color="grey.200">Total weight:</Text>
        <Text color="blue.200" fontWeight={600}>
          {Number(totalWeight.toFixed(2))} gram
        </Text>
      </Box>
      <Flex flexBasis="50%" justify="space-between">
        <Text color="grey.200">Total price:</Text>
        {isVoucherActive && (
          <Text color="blue.200" fontWeight={600}>
            {Number(discountedPrice.toFixed(2))} zł
          </Text>
        )}

        <Text
          color="blue.200"
          fontWeight={600}
          decoration={isVoucherActive ? 'line-through' : 'none'}
        >
          {Number(totalPrice.toFixed(2))} zł
        </Text>
      </Flex>
    </Flex>
  )
}

export default InfoToPay
