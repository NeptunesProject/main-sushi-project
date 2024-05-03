import React, { useState } from 'react'
import {
  Center,
  Image,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react'
import basket from 'assets/icons/basket.svg'
import DeliveryForm from './DeliveryForm'
import { BasketTypes } from '../../types'
import BasketType from './BasketType'
import PaymentMethod from './PaymentMethod'
import { selectBasketProducts } from 'redux/products/selectors'
import { useSelector } from 'react-redux'
import { StatusForm } from './StatusForm'

const Basket = () => {
  const [selectedBasketType, setSelectedBasketType] =
    useState<BasketTypes>('basket')
  const [orderId, setOrderId] = useState<number | undefined>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const products = useSelector(selectBasketProducts)
  const productsCount = products.length

  const renderSelectedComponent = () => {
    switch (selectedBasketType) {
      case 'basket':
        return <BasketType setSelectedBasketType={setSelectedBasketType} />
      case 'delivery':
        return <DeliveryForm setSelectedBasketType={setSelectedBasketType} />
      case 'pay':
        return (
          <PaymentMethod
            setOrderId={setOrderId}
            setSelectedBasketType={setSelectedBasketType}
          />
        )
      case 'orderResponse':
        return (
          <StatusForm
            orderId={orderId}
            setSelectedBasketType={setSelectedBasketType}
          />
        )
      default:
        return <BasketType setSelectedBasketType={setSelectedBasketType} />
    }
  }

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
        {productsCount && (
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
        )}
      </Center>
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
        <ModalContent
          style={{
            backgroundColor: '#FFFFFF',
            position: 'fixed',
            top: '120px',
            right: '75px',
            maxWidth: '410px',
            borderRadius: '16px',
            paddingLeft: '19px',
            paddingRight: '19px',
            paddingTop: '15px',
            paddingBottom: '15px',
          }}
        >
          <ModalBody pl={'0px'} pt={'0px'} pr={'0px'} pb={'0px'}>
            {renderSelectedComponent()}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Basket
