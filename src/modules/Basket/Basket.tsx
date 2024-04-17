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
import { useBasketContext } from '../../contexts/BasketContext'
import { StatusForm } from './StatusForm'
import PaymentMethod from './PaymentMethod'

const Basket = () => {
  const [selectedBaketType, setSelectedBasketType] =
    useState<BasketTypes>('basket')
  const [orderId, setOrderId] = useState<number | undefined>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { productsCount } = useBasketContext()
  return (
    <>
      <Center
        cursor="pointer"
        boxSize={77}
        borderTopLeftRadius={10}
        borderBottomLeftRadius={10}
        boxShadow="2px 7px 11px rgba(0,0,0,.28)"
        // bg="white"
        onClick={onOpen}
        pos="relative"
        bgColor="gray.800"
      >
        <Image boxSize={30} src={basket}/>
        {productsCount ? (
          <Center
            pos="absolute"
            top={3}
            right={2}
            borderRadius="50%"
            // bg="red"
            bg="orange"
            color="white"
            boxSize={4}
            fontSize={14}
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
