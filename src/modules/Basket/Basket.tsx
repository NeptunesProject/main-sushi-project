import React, { useState } from 'react'
import {
  Center,
  Image,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  useMediaQuery,
  ModalOverlay,
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
  const [isLessThan768] = useMediaQuery('(max-width: 768px)')

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
        {productsCount > 0 && (
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={isLessThan768 ? true : false}
      >
        {isLessThan768 && <ModalOverlay />}
        <ModalContent
          style={{
            backgroundColor: '#FFFFFF',
            position: 'fixed',
            top: isLessThan768 ? '30px' : '120px',
            right: isLessThan768 ? 'auto' : '75px',
            maxWidth: isLessThan768 ? '340px' : '410px',
            borderRadius: '16px',
            paddingLeft: isLessThan768 ? '7px' : '19px',
            paddingRight: isLessThan768 ? '7px' : '19px',
            paddingTop: isLessThan768 ? '10px' : '15px',
            paddingBottom: isLessThan768 ? '13px' : '15px',
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
