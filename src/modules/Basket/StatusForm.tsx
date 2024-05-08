import { DrawerCloseButton, Flex, Text, useMediaQuery } from '@chakra-ui/react'
import { BasketTypes } from 'types'
import logo from '../../assets/icons/logoBasket.svg'

interface Props {
  setSelectedBasketType: React.Dispatch<React.SetStateAction<BasketTypes>>
  orderId: number | undefined
}

export const StatusForm = ({ setSelectedBasketType, orderId }: Props) => {
  const [isLessThan768] = useMediaQuery('(max-width: 768px)')

  return (
    <>
      <Flex
        direction="column"
        alignItems={'center'}
        fontWeight={400}
        fontFamily={'Rubik'}
        color={'#002034'}
        lineHeight={'24px'}
        fontSize={'16px'}
        gap={'23px'}
        pl={'23px'}
        pr={'23px'}
        pb={isLessThan768 ? '119px' : '108px'}
      >
        <DrawerCloseButton
          pos="static"
          onClick={() => setSelectedBasketType('basket')}
          alignSelf="end"
          mb={isLessThan768 ? '21px' : '85px'}
        />
        <img
          src={logo}
          alt="Success image"
          width={'114px'}
          height={'118px'}
          style={{ paddingRight: '3px' }}
        />
        <Text
          fontSize={'24px'}
          display="flex"
          fontWeight={600}
          mt={5}
          lineHeight={'36px'}
        >
          Thank you!
        </Text>

        <Text> Your order №{orderId} is received</Text>
        <Text textAlign={'center'}>
          Our manager will contact you as soon as possible to confirm your order
        </Text>
      </Flex>
    </>
  )
}
