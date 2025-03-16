import { Flex, Text, useMediaQuery } from '@chakra-ui/react'
import { useTotalPrice } from './InfoToPayHooks'
import MinimumPriceWarning from '../../components/MinimumPriceWarning'
import React, { useEffect } from 'react'

interface Props {
  setIsButtonDisabled?: React.Dispatch<React.SetStateAction<boolean>>
}

const InfoToPay = ({ setIsButtonDisabled }: Props) => {
  const {
    finalPrice,
    totalPrice,
    isMinimumPriceReached,
    discount,
    showDiscounted,
  } = useTotalPrice()

  useEffect(() => {
    if (setIsButtonDisabled) setIsButtonDisabled(!isMinimumPriceReached)
  }, [isMinimumPriceReached])

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
              {Number(finalPrice.toFixed(2))} zł
            </Text>
          )}
        </Flex>
      </Flex>
      {!isMinimumPriceReached && <MinimumPriceWarning />}
    </>
  )
}

export default InfoToPay
