import {
  Center,
  Drawer,
  DrawerContent,
  Image,
  useDisclosure,
} from '@chakra-ui/react'
import basket from 'assets/icons/basket.svg'
import DeliveryForm from './DeliveryForm'
import { BasketTypes } from '../../types'
import BasketType from './BasketType'
import { useState } from 'react'
import { StatusForm } from './StatusForm'
import PaymentMethod from './PaymentMethod'
import { selectBasketProducts } from 'redux/products/selectors'
import { useSelector } from 'react-redux'

const Basket = () => {
  const [selectedBaketType, setSelectedBasketType] =
    useState<BasketTypes>('basket')
  const [orderId, setOrderId] = useState<number | undefined>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const products = useSelector(selectBasketProducts)
  const productsCount = products.length

  return (
    <>
      <Center
        cursor="pointer"
        boxSize="48px"
        borderTopLeftRadius={10}
        borderBottomLeftRadius={10}
        boxShadow="2px 7px 11px rgba(0,0,0,.28)"
        onClick={onOpen}
        pos="relative"
        bgColor="#002034"
      >
        <Image boxSize="24px" src={basket} />
        {productsCount ? (
          <Center
            pos="absolute"
            top="7.5px"
            right="4.5px"
            borderRadius="50%"
            bg="orange"
            color="white"
            boxSize="15px"
            fontSize={12}
          >
            {productsCount}
          </Center>
        ) : null}
      </Center>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        blockScrollOnMount={false}
        isFullHeight={false}
        autoFocus={false}
        size="sm"
      >
        <DrawerContent>
          {selectedBaketType === 'basket' && (
            <BasketType setSelectedBasketType={setSelectedBasketType} />
          )}
          {selectedBaketType === 'delivery' && (
            <DeliveryForm setSelectedBasketType={setSelectedBasketType} />
          )}
          {selectedBaketType === 'pay' && (
            <PaymentMethod
              setOrderId={setOrderId}
              setSelectedBasketType={setSelectedBasketType}
            />
          )}
          {selectedBaketType === 'orderResponse' && (
            <StatusForm
              orderId={orderId}
              setSelectedBasketType={setSelectedBasketType}
            />
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Basket
