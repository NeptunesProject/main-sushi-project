import React from 'react'
import {
  Button,
  DrawerCloseButton,
  Flex,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import ProductsList from './ProductsList/ProductsList'
import InfoToPay from './InfoToPay'
import { BasketTypes } from 'types'
import { useSelector } from 'react-redux'
import { selectBasketProducts } from 'redux/products/selectors'
import { PromoCode } from './PromoCode'

interface Props {
  setSelectedBasketType: React.Dispatch<React.SetStateAction<BasketTypes>>
}

const BasketType = ({ setSelectedBasketType }: Props) => {
  const products = useSelector(selectBasketProducts)
  const [isLessThan768] = useMediaQuery('(max-width: 768px)')

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text
          fontSize={isLessThan768 ? '16px' : '24px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          fontWeight={'600'}
          lineHeight={isLessThan768 ? '21px' : '36px'}
          color={'#002034'}
          pl={'5px'}
        >
          Basket
        </Text>
        <DrawerCloseButton pos="static" />
      </Flex>

      <Flex flexDir="column">
        <Text
          fontSize={isLessThan768 ? 14 : 16}
          fontWeight={400}
          color={'#002034'}
          lineHeight={isLessThan768 ? '21px' : '24px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          mb={isLessThan768 ? '18px' : '16px'}
          pl={'5px'}
        >
          Your order:
        </Text>

        <ProductsList />

        <PromoCode />

        <InfoToPay />

        <Button
          alignSelf="center"
          bg="#002034"
          borderRadius={25}
          isDisabled={!products.length}
          onClick={() => setSelectedBasketType('delivery')}
          color={'#FFFFFF'}
          fontSize={16}
          fontWeight={400}
          lineHeight={'24px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          mt={'9px'}
        >
          Checkout
        </Button>
      </Flex>
    </>
  )
}

export default BasketType
