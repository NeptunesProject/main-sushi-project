import { Flex, Text } from '@chakra-ui/react'
import { selectBasketProducts, selectVoucher } from 'redux/products/selectors'
import { useSelector } from 'react-redux'
import { useTotalPrice } from './InfoToPayHooks'
import { calculateDiscountedPrice } from './OrderFuncs'
import { calculateTotalPrice } from 'utils/calculateDiscountedPrice'

const InfoToPay = () => {
  const voucher = useSelector(selectVoucher)
  const selectedProducts = useSelector(selectBasketProducts)
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

  const showDiscounted = isVoucherActive || isDiscounted

  return (
    <Flex direction="column">
      {showDiscounted && (
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
          color={showDiscounted ? '#9090A4' : '#002034'}
          fontWeight={400}
          decoration={showDiscounted ? 'line-through' : 'none'}
          fontSize={'16px'}
          lineHeight={'24px'}
          pr={'5px'}
        >
          {Number(totalPrice.toFixed(2))} zł
        </Text>

        {showDiscounted && (
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
