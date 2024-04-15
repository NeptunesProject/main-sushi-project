import {
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  Text,
} from '@chakra-ui/react'
import { BasketTypes } from 'types'
import svg from '../../assets/img/done.svg'

interface Props {
  setSelectedBasketType: React.Dispatch<React.SetStateAction<BasketTypes>>
  orderId: number | undefined
}

export const StatusForm = ({ setSelectedBasketType, orderId }: Props) => {
  return (
    <>
      <DrawerHeader
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize={28} display="flex" fontWeight={600} mt={5} ml={5}>
          <img
            src={svg}
            alt="Success image"
            width={40}
            height={40}
            style={{ paddingRight: '3px' }}
          />
          Thank you!
        </Text>
        <DrawerCloseButton
          pos="static"
          onClick={() => setSelectedBasketType('basket')}
        />
      </DrawerHeader>
      <DrawerBody color="blue.200">
        <Text fontWeight={600} mb={4} ml={5}>
          Your order №{orderId} has been accepted.
        </Text>
        <Text fontWeight={600} mb={2} ml={5}>
          We will contact you as soon as possible to confirm your order.
        </Text>
      </DrawerBody>
    </>
  )
}
