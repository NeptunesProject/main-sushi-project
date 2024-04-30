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

  let isDiscounted = false

  if (totalPrice - totalPriceWithDiscount > 0) isDiscounted = true

  const priceWithVoucher = isDiscounted
    ? totalPriceWithDiscount * voucher.discount
    : totalPrice * voucher.discount

  let isVoucherActive = false

  if (totalPrice !== 0 && voucher.discount !== 1) {
    isVoucherActive = true
  }

  let discount = 0

  if (isVoucherActive) discount = totalPrice - priceWithVoucher
  else if (isDiscounted) discount = totalPrice - totalPriceWithDiscount

  return (
    <Flex direction="column">
      {/* <Box>
        <Text color="grey.200">Total weight:</Text>
        <Text color="blue.200" fontWeight={600}>
          {Number(totalWeight.toFixed(2))} gram
        </Text>
      </Box> */}
      {(isVoucherActive || isDiscounted) && (
        <Flex alignSelf={'center'}>
          <Text
            color="#9090A4"
            fontFamily={'Rubik'}
            fontStyle={'normal'}
            fontWeight={'500'}
            fontSize={'16px'}
            lineHeight={'24px'}
            pr={'9px'}
          >
            Discount:
          </Text>
          <Text
            color="#9090A4"
            fontFamily={'Rubik'}
            fontStyle={'normal'}
            fontWeight={'400'}
            fontSize={'16px'}
            lineHeight={'24px'}
          >
            {Number(discount.toFixed(2))} zł
          </Text>
        </Flex>
      )}

      <Flex alignSelf={'center'}>
        <Text
          color="#002034"
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          fontWeight={'500'}
          fontSize={'16px'}
          lineHeight={'24px'}
          pr={'5px'}
        >
          Total:
        </Text>
        <Text
          fontFamily={'Rubik'}
          color={isVoucherActive || isDiscounted ? '#9090A4' : '#002034'}
          fontWeight={400}
          decoration={isVoucherActive || isDiscounted ? 'line-through' : 'none'}
          fontSize={'16px'}
          lineHeight={'24px'}
          pr={'5px'}
        >
          {Number(totalPrice.toFixed(2))} zł
        </Text>
        {isVoucherActive && (
          <Text color="blue.200" fontWeight={600}>
            {Number(priceWithVoucher.toFixed(2))} zł
          </Text>
        )}
        {isDiscounted && (
          <Text
            fontFamily={'Rubik'}
            color={'#002034'}
            fontWeight={400}
            decoration={'none'}
            fontSize={'16px'}
            lineHeight={'24px'}
          >
            {Number(priceWithVoucher.toFixed(2))} zł
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

export default InfoToPay
