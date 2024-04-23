import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { BasketTypes } from '../../types'
import { ArrowBackIcon } from '@chakra-ui/icons'
import InfoToPay from './InfoToPay'
import {
  useBasketContext,
  useBasketDispatchContext,
} from 'contexts/BasketContext'
import Stripe from 'stripe'

import { ReturnedOrder } from '../../types'
import { handleClick, makeOrder } from './OrderFuncs'
import { postVoucher } from 'api'

interface Props {
  setSelectedBasketType: React.Dispatch<React.SetStateAction<BasketTypes>>
  setOrderId: React.Dispatch<React.SetStateAction<number | undefined>>
}

const PaymentMethod = ({ setSelectedBasketType, setOrderId }: Props) => {
  const [comment, setComment] = useState('')

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(e.target.value)
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
    getFromLocaleStorage('personInfo-Delivery', 'pickup'),
  )
  const [street, setStreet] = useState(() =>
    getFromLocaleStorage('personInfo-Street', ''),
  )
  const [payment, setPayment] = useState(() =>
    getFromLocaleStorage('paymentType', ''),
  )
  const [voucherCode, setVoucherCode] = useState('')

  const { personCount, sticks, studySticks, totalPrice, voucher } =
    useBasketContext()
  const {
    setPersonCount,
    setSticks,
    clearProductList,
    setStudySticks,
    setVoucher,
  } = useBasketDispatchContext()

  useEffect(() => {
    setVoucher({ discount: voucher.discount, error: '' })
  }, [])

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
      sticks,
      studySticks,
      payment,
      comment,
    )
    handleClick(
      order.id,
      setSelectedBasketType,
      setOrderId as React.Dispatch<React.SetStateAction<number>>,
      setName,
      setPhoneNumber,
      setDeliveryType,
      setStreet,
      setPersonCount as React.Dispatch<React.SetStateAction<number>>,
      setSticks as React.Dispatch<React.SetStateAction<number>>,
      clearProductList,
      setStudySticks as React.Dispatch<React.SetStateAction<number>>,
      setPayment,
    )
    if (order && order.paymentType === 'ONLINE') {
      createSession(order)
    }
    nullifyVoucher()
  }

  async function validateVoucher() {
    try {
      if (voucherCode !== '') {
        const result = await postVoucher(voucherCode)
        if (result) {
          setVoucherCode('')
          setVoucher({
            discount: 1 - result.discountPercentage,
            error: '',
          })
        }
      }
    } catch (error) {
      console.error(error)
      if (error === 'Voucher not found.') {
        setVoucher({ discount: 1, error })
      }
    }
  }

  function nullifyVoucher() {
    setVoucherCode('')
    setVoucher({
      discount: 1,
      error: '',
    })
  }

  const CancelVoucher = () => {
    setVoucher({
      discount: 1,
      error: '',
    })
  }

  return (
    <>
      <DrawerHeader
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          cursor="pointer"
          onClick={() => setSelectedBasketType('delivery')}
          fontSize={15}
        >
          <ArrowBackIcon /> back{' '}
        </Text>
        <DrawerCloseButton pos="static" />
      </DrawerHeader>
      <DrawerBody color="blue.200">
        <Flex flexDir="column" gap={5}>
          <Text fontSize={18} fontWeight={600} mb={5}>
            Choose payment method
          </Text>

          <Box mb={10}>
            <RadioGroup onChange={paymentSetter} ml={1}>
              <Stack direction="column" defaultValue={payment}>
                <Radio id="terminal" value="TERMINAL">
                  By card upon receipt
                </Radio>
                <Radio id="cash" value="CASH">
                  In cash
                </Radio>
                <Radio id="online" value="ONLINE">
                  Online
                </Radio>
              </Stack>
            </RadioGroup>

            <Textarea
              placeholder="Leave a comment"
              mt={5}
              p={1}
              value={comment}
              onChange={handleTextareaChange}
            />

            <Input
              variant="flushed"
              placeholder="Enter voucher code"
              mt={5}
              px={1.5}
              value={voucherCode}
              onChange={handleInputChange}
            />

            {voucher.discount === 1 ? (
              <Flex alignItems="center" justifyContent="flex-end">
                {voucher.error !== '' && (
                  <Text color="red.400" float={'right'} m={2}>
                    {voucher.error}
                  </Text>
                )}
                <Button float={'right'} m={2} onClick={validateVoucher}>
                  Validate voucher
                </Button>
              </Flex>
            ) : (
              <Flex alignItems="center" justifyContent="flex-end">
                <Button m={2} onClick={CancelVoucher}>
                  Remove voucher
                </Button>
                <Text m={2} fontWeight={'bold'}>
                  Applied discount {Math.round((1 - voucher.discount) * 100)}%
                </Text>
              </Flex>
            )}
          </Box>

          <InfoToPay />

          <Button
            id="button-continue"
            alignSelf="end"
            w="60%"
            border="2px solid"
            borderColor="turquoise.77"
            bg="none"
            borderRadius={25}
            onClick={() => createOrder()}
            isDisabled={payment === ''}
          >
            Continue
          </Button>
        </Flex>
      </DrawerBody>
    </>
  )
}

export default PaymentMethod
