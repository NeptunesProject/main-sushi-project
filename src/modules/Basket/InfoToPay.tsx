import { Box, Flex, Text } from '@chakra-ui/react'
import { useBasketContext } from '../../contexts/BasketContext'

const InfoToPay = () => {
  const { totalPrice, totalWeight, voucher } = useBasketContext()
  const discountedPrice = totalPrice * voucher.discount
  const isDiscounted = voucher.discount !== 1

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
        {isDiscounted && (
          <Text color="blue.200" fontWeight={600}>
            {Number(discountedPrice.toFixed(2))} zl
          </Text>
        )}
        <Text
          color="blue.200"
          fontWeight={600}
          decoration={isDiscounted ? 'line-through' : 'none'}
        >
          {Number(totalPrice.toFixed(2))} zl
        </Text>
      </Flex>
    </Flex>
  )
}

export default InfoToPay
