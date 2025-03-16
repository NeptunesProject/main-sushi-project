import { Flex, Text, useMediaQuery } from '@chakra-ui/react'
import { selectBasketProducts, selectVoucher } from 'redux/products/selectors'
import { useSelector } from 'react-redux'
import { useTotalPrice } from './InfoToPayHooks'
import { calculateDiscountedPrice } from './OrderFuncs'
import { calculateTotalPrice } from 'utils/calculateDiscountedPrice'
import MinimumPriceWarning from '../../components/MinimumPriceWarning'
import React, { useEffect, useMemo } from 'react'
import { minimalPrice } from '../../constants'

interface Props {
  setIsButtonDisabled:  React.Dispatch<React.SetStateAction<boolean>>
}

const InfoToPay = ({setIsButtonDisabled}: Props) => {
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

  const isMinimumPriceReached = useMemo(() =>  priceWithVoucher >= minimalPrice , [priceWithVoucher]);

  useEffect(() => {
    setIsButtonDisabled(!isMinimumPriceReached)
  }, [isMinimumPriceReached])
  console.log(totalPriceWithDiscount, isMinimumPriceReached)

  let isVoucherActive = false

  if (totalPrice !== 0 && voucher.discount !== 1) {
    isVoucherActive = true
  }

  let discount = 0

  if (isVoucherActive) discount = totalPrice - priceWithVoucher
  else if (isDiscounted) discount = totalPrice - totalPriceWithDiscount

  const showDiscounted = isVoucherActive || isDiscounted

  const [isLessThan730] = useMediaQuery('(max-height: 730px)')

  return (
    <>
    <Flex direction="column">
      {showDiscounted && (
        <Flex alignSelf={'center'}>
          <Text
            color="#002034"
            fontFamily={'Rubik'}
            fontStyle={'normal'}
            fontWeight={'500'}
            fontSize={isLessThan730 ? '14px' : '18px'}
            lineHeight={isLessThan730 ? '18px' : '24px'}
            pr={'9px'}
          >
            Discount:
          </Text>
          <Text
            color="#418a91"
            fontFamily={'Rubik'}
            fontStyle={'normal'}
            fontWeight={'400'}
            fontSize={isLessThan730 ? '12px' : '16px'}
            lineHeight={isLessThan730 ? '18px' : '24px'}
          >
            {Number(discount.toFixed(2))} zł
          </Text>
        </Flex>
      )}

      <Flex
        alignSelf={'center'}
        fontSize={isLessThan730 ? '15px' : '19px'}
        lineHeight={isLessThan730 ? '18px' : '24px'}
      >
        <Text
          color="#002034"
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          fontWeight={'500'}
          pr={'5px'}
        >
          Total:
        </Text>
        <Text
          fontFamily={'Rubik'}
          color={showDiscounted ? '#9090A4' : '#418a91'}
          fontWeight={400}
          decoration={showDiscounted ? 'line-through' : 'none'}
          pr={'5px'}
        >
          {Number(totalPrice.toFixed(2))} zł
        </Text>

        {showDiscounted && (
          <Text
            fontFamily={'Rubik'}
            color={'#418a91'}
            fontWeight={400}
            decoration={'none'}
          >
            {Number(priceWithVoucher.toFixed(2))} zł
          </Text>
        )}
      </Flex>
    </Flex>
      {!isMinimumPriceReached && <MinimumPriceWarning />}

    </>
  )
}

export default InfoToPay
