import React from 'react'
import { Box, Button, DrawerCloseButton, Flex, Text } from '@chakra-ui/react'
import ProductsList from './ProductsList/ProductsList'
import AdditionalProducts from './AdditionalProducts'
import InfoToPay from './InfoToPay'
import { BasketTypes } from 'types'
import { useSelector } from 'react-redux'
import { selectBasketProducts } from 'redux/products/selectors'

interface Props {
  setSelectedBasketType: React.Dispatch<React.SetStateAction<BasketTypes>>
}

const BasketType = ({ setSelectedBasketType }: Props) => {
  const products = useSelector(selectBasketProducts)

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text
          fontSize={'24px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          fontWeight={'600'}
          lineHeight={'36px'}
          color={'#002034'}
        >
          Basket
        </Text>
        <DrawerCloseButton pos="static" />
      </Flex>

      {/* <DrawerBody> */}
      <Flex flexDir="column">
        <Text
          fontSize={16}
          fontWeight={400}
          color={'#002034'}
          lineHeight={'24px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          mb={'16px'}
        >
          Your order:
        </Text>

        <ProductsList />

        {/* <AdditionalProducts /> */}

        {/* <Box w="100%" h="1px" bg="grey" opacity={0.6} /> */}

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
      {/* </DrawerBody> */}
    </>
  )
}

export default BasketType
