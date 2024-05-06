import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  DrawerCloseButton,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useMediaQuery,
} from '@chakra-ui/react'
import { AppDispatch, BasketTypes } from '../../types'
import InfoToPay from './InfoToPay'
import Stripe from 'stripe'

import { ReturnedOrder } from '../../types'
import { calculateDiscountedPrice, handleClick, makeOrder } from './OrderFuncs'
import { setVoucher } from 'redux/products/ProductsSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectBasketProducts,
  selectPersonCount,
  selectStudySticks,
  selectVoucher,
} from 'redux/products/selectors'
import { useTotalPrice } from './InfoToPayHooks'
import { eraseAfterOrder } from 'redux/products/ProductsSlice'

interface Props {
  setSelectedBasketType: React.Dispatch<React.SetStateAction<BasketTypes>>
  setOrderId: React.Dispatch<React.SetStateAction<number | undefined>>
}

const PaymentMethod = ({ setSelectedBasketType, setOrderId }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const [comment, setComment] = useState('')

  const selectedProducts = useSelector(selectBasketProducts)

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const STRIPE_SK = import.meta.env.VITE_STRIPE_SECRET_KEY
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL
  const stripe = new Stripe(STRIPE_SK)

  const getFromLocaleStorage = (key: string, defaultValue: string): string => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : defaultValue
  }

  function paymentSetter(value: string) {
    setPayment(value)
    localStorage.setItem('paymentType', JSON.stringify(value))
  }

  const [name, setName] = useState(() =>
    getFromLocaleStorage('personInfo-Name', ''),
  )
  const [phoneNumber, setPhoneNumber] = useState(() =>
    getFromLocaleStorage('personInfo-Number', ''),
  )
  const [deliveryType, setDeliveryType] = useState(() =>
    getFromLocaleStorage('personInfo-Delivery', ''),
  )
  const [street, setStreet] = useState(() =>
    getFromLocaleStorage('personInfo-Street', ''),
  )
  const [payment, setPayment] = useState(() =>
    getFromLocaleStorage('paymentType', ''),
  )

  const [email, setEmail] = useState(() =>
    getFromLocaleStorage('personInfo-Email', ''),
  )

  const totalPrice = useTotalPrice(selectedProducts, calculateDiscountedPrice)

  const personCount = useSelector(selectPersonCount)
  const studySticks = useSelector(selectStudySticks)
  const voucher = useSelector(selectVoucher)

  useEffect(() => {
    setVoucher({ discount: voucher.discount, error: '' })
  }, [voucher])

  async function createSession(order: ReturnedOrder) {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'pln',
              product_data: {
                name: `Order #${order.id}`,
              },
              unit_amount: totalPrice * voucher.discount * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${BASE_URL}?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${BASE_URL}?cancel=true&session_id={CHECKOUT_SESSION_ID}`,
      })
      if (session && session.url) {
        window.location.replace(session.url)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function createOrder() {
    const order = await makeOrder(
      setSelectedBasketType,
      name,
      street,
      deliveryType,
      phoneNumber,
      personCount,
      studySticks,
      payment,
      comment,
      voucher.code,
      email,
      selectedProducts,
    )
    handleClick(
      order.id,
      setSelectedBasketType,
      setOrderId as React.Dispatch<React.SetStateAction<number>>,
      setName,
      setPhoneNumber,
      setDeliveryType,
      setStreet,
      setPayment as React.Dispatch<React.SetStateAction<string>>,
      setEmail,
    )
    dispatch(eraseAfterOrder())
    if (order && order.paymentType === 'ONLINE') {
      createSession(order)
    }
    nullifyVoucher()
  }

  function nullifyVoucher() {
    dispatch(
      setVoucher({
        discount: 1,
        error: '',
        code: '',
      }),
    )
  }

  const [isLessThan768] = useMediaQuery('(max-width: 768px)')

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={isLessThan768 ? '9px' : '10px'}
        pl={isLessThan768 ? '5px' : '0px'}
        pr={isLessThan768 ? '5px' : '0px'}
      >
        <Text
          fontSize={isLessThan768 ? '16px' : '24px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          fontWeight={'600'}
          lineHeight={isLessThan768 ? '21px' : '36px'}
          color={'#002034'}
        >
          Choose payment method
        </Text>
        <DrawerCloseButton pos="static" />
      </Flex>
      <Flex
        flexDir="column"
        fontSize={isLessThan768 ? '14px' : '16px'}
        fontFamily={'Rubik'}
        fontStyle={'normal'}
        fontWeight={'400'}
        lineHeight={isLessThan768 ? '21px' : '24px'}
        color={'rgba(0, 0, 0, 0.4)'}
        pl={isLessThan768 ? '5px' : '0px'}
        pr={isLessThan768 ? '5px' : '0px'}
      >
        <Text fontWeight={'500'} color={'#002034'} mb={'3px'}>
          Verify your order details:
        </Text>
        <Text mb={'3px'}>{name}</Text>
        <Text mb={'3px'}>{phoneNumber}</Text>
        <Text mb={'3px'}>{email}</Text>
        <Text mb={'3px'} color={'rgba(0, 0, 0, 0.28)'}>
          {street}
        </Text>
        <Flex gap={'3px'} pt={isLessThan768 ? '11px' : '10px'}>
          <Text fontWeight={'500'} mb={'5px'}>
            Delivery Type:
          </Text>
          <Text>
            {deliveryType.charAt(0).toUpperCase() + deliveryType.slice(1)}
          </Text>
        </Flex>
        {deliveryType === 'pickup' && (
          <Flex gap={'3px'}>
            <Text lineHeight={'21px'} fontSize={'14px'}>
              Self Pickup on Warsaw, Chrystiana Piotra Aignera 6, 00-710
            </Text>
          </Flex>
        )}
      </Flex>
      <Flex
        pl={isLessThan768 ? '5px' : '0px'}
        pr={isLessThan768 ? '5px' : '0px'}
      >
        <Box w="100%" h="1px" bg="grey" opacity={0.6} mb={'6px'} />
      </Flex>

      <Box
        mb={isLessThan768 ? '31px' : '26px'}
        pl={isLessThan768 ? '5px' : '0px'}
        pr={isLessThan768 ? '5px' : '0px'}
      >
        <RadioGroup onChange={paymentSetter} value={payment} mb={'5px'}>
          <Stack
            direction="column"
            defaultValue={payment}
            spacing={isLessThan768 ? '6px' : '3px'}
          >
            <Radio
              style={{
                borderColor: payment === 'CASH' ? 'black' : 'grey',
              }}
              size={isLessThan768 ? 'sm' : 'md'}
              id="cash"
              value="CASH"
            >
              Cash
            </Radio>
            <Radio
              style={{
                borderColor: payment === 'TERMINAL' ? 'black' : 'grey',
              }}
              size={isLessThan768 ? 'sm' : 'md'}
              id="terminal"
              value="TERMINAL"
            >
              Card
            </Radio>

            <Radio
              style={{
                borderColor: payment === 'ONLINE' ? 'black' : 'grey',
              }}
              size={isLessThan768 ? 'sm' : 'md'}
              id="online"
              value="ONLINE"
            >
              Online
            </Radio>
          </Stack>
        </RadioGroup>
        <Text
          fontWeight={'500'}
          color={'#002034'}
          fontSize={isLessThan768 ? '14px' : '16px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          lineHeight={isLessThan768 ? '21px' : '24px'}
          mb={'5px'}
        >
          Comments:
        </Text>
        <Textarea
          placeholder="Leave a comment"
          mt={'2px'}
          p={isLessThan768 ? '10px' : '8px'}
          value={comment}
          height={'91px'}
          onChange={handleTextareaChange}
          style={{ resize: 'none' }}
          fontSize={isLessThan768 ? '14px' : '16px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          lineHeight={isLessThan768 ? '21px' : '24px'}
        />
      </Box>

      <InfoToPay />
      <Flex justifyContent={'center'} gap={'8px'}>
        <Button
          bg="#002034"
          borderRadius={25}
          color={'#FFFFFF'}
          fontSize={16}
          fontWeight={400}
          lineHeight={'24px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          mt={'9px'}
          alignSelf="end"
          onClick={() => setSelectedBasketType('delivery')}
          width={'99px'}
        >
          Back
        </Button>

        <Button
          bg="#002034"
          borderRadius={25}
          color={'#FFFFFF'}
          fontSize={16}
          fontWeight={400}
          lineHeight={'24px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          mt={'9px'}
          alignSelf="end"
          onClick={() => createOrder()}
          isDisabled={payment === ''}
        >
          Submit Order
        </Button>
      </Flex>
    </>
  )
}

export default PaymentMethod
