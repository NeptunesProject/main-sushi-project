import { Text } from '@chakra-ui/react'
import { minimalPrice } from '../constants'

const MinimumPriceWarning = () => {
  return (
      <Text
        color="red"
        fontFamily={'Rubik'}
        fontStyle={'normal'}
        fontWeight={'300'}
        textAlign={'center'}
        pr={'5px'}
      >
        Minimalna kwota zamówienia {minimalPrice} zł
      </Text>
  )
}

export default MinimumPriceWarning
