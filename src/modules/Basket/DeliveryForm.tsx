import React, { useState } from 'react'
import {
  Box,
  Button,
  DrawerCloseButton,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import { BasketTypes } from '../../types'
import InfoToPay from './InfoToPay'
import { BasketInput } from 'components/BasketInput'
import AdditionalProducts from './AdditionalProducts'
import point from '../../assets/icons/point.svg'

interface Props {
  setSelectedBasketType: React.Dispatch<React.SetStateAction<BasketTypes>>
}

const getFromLocaleStorage = (key: string, defaultValue: string): string => {
  const storedValue = localStorage.getItem(key)
  if (storedValue) {
    return JSON.parse(storedValue)
  }

  return defaultValue
}

const DeliveryForm = ({ setSelectedBasketType }: Props) => {
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
  const [email, setEmail] = useState(() =>
    getFromLocaleStorage('personInfo-Email', ''),
  )
  const getDisabledState = () => {
    let isDisabled = false

    switch (true) {
      case name.length === 0:
      case phoneNumber.length === 0:
      case deliveryType !== 'pickup' && street.length === 0:
        isDisabled = true
        break
      default:
        isDisabled = false
        break
    }

    return isDisabled
  }

  function nameSetter(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value.trim())
    localStorage.setItem(
      'personInfo-Name',
      JSON.stringify((e.target as HTMLInputElement).value.trim()),
    )
  }
  function phoneSetter(e: React.ChangeEvent<HTMLInputElement>) {
    setPhoneNumber((e.target as HTMLInputElement).value.trim())
    localStorage.setItem(
      'personInfo-Number',
      JSON.stringify((e.target as HTMLInputElement).value.trim()),
    )
  }
  function streetSetter(e: React.ChangeEvent<HTMLInputElement>) {
    setStreet(
      deliveryType === 'delivery'
        ? (e.target as HTMLInputElement).value.trim()
        : '',
    )
    localStorage.setItem(
      'personInfo-Street',
      JSON.stringify(
        deliveryType === 'delivery'
          ? (e.target as HTMLInputElement).value.trim()
          : '',
      ),
    )
  }

  function deliverySetter(value: string) {
    setDeliveryType(value)
    if (value === 'pickup') {
      setStreet('')
      localStorage.setItem('personInfo-Street', JSON.stringify(''))
    }

    localStorage.setItem('personInfo-Delivery', JSON.stringify(value))
  }

  function emailSetter(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value.trim())
    localStorage.setItem(
      'personInfo-Email',
      JSON.stringify((e.target as HTMLInputElement).value.trim()),
    )
  }

  const pickupBorderColor = deliveryType === 'pickup' ? 'black' : 'grey'
  const deliveryBorderColor = deliveryType === 'delivery' ? 'black' : 'grey'

  const [isLessThan768] = useMediaQuery('(max-width: 768px)')

  return (
    <>
      <Flex
        pl={isLessThan768 ? '5px' : '0px'}
        pr={isLessThan768 ? '5px' : '0px'}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          fontSize={isLessThan768 ? '16px' : '24px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          fontWeight={'600'}
          lineHeight={isLessThan768 ? '21px' : '36px'}
          color={'#002034'}
        >
          Order Details
        </Text>
        <DrawerCloseButton pos="static" />
      </Flex>

      <Flex
        pl={isLessThan768 ? '5px' : '0px'}
        pr={isLessThan768 ? '5px' : '0px'}
        flexDir="column"
      >
        <Text
          fontSize={isLessThan768 ? 14 : 16}
          fontWeight={400}
          color={'#002034'}
          lineHeight={isLessThan768 ? '21px' : '24px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          mb={'4px'}
        >
          Personal Data:
        </Text>
        <Flex flexDir="column" gap={'10px'} align="start" mb={'8px'}>
          <BasketInput
            value={name}
            setter={nameSetter}
            type="text"
            placeholder="User Name"
          />
          <BasketInput
            value={phoneNumber}
            setter={phoneSetter}
            type="tel"
            placeholder="Phone"
          />
          <BasketInput
            value={email}
            setter={emailSetter}
            type="email"
            placeholder="Email"
          />
          {deliveryType === 'delivery' && (
            <BasketInput
              value={street}
              setter={streetSetter}
              type="text"
              placeholder="Delivery Address"
            />
          )}
        </Flex>
        <Text
          fontSize={isLessThan768 ? 14 : 16}
          fontWeight={400}
          color={'#002034'}
          lineHeight={isLessThan768 ? '21px' : '24px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          mb={'1px'}
        >
          Choose Delivery Type:
        </Text>
        <RadioGroup
          onChange={(value) => deliverySetter(value)}
          value={deliveryType}
        >
          <Stack direction="column" spacing={'3px'}>
            <Radio
              style={{
                borderColor: pickupBorderColor,
              }}
              size={isLessThan768 ? 'sm' : 'md'}
              value="pickup"
            >
              Self pick-up
            </Radio>
            <Radio
              style={{
                borderColor: deliveryBorderColor,
              }}
              size={isLessThan768 ? 'sm' : 'md'}
              value="delivery"
            >
              Delivery
            </Radio>
          </Stack>
        </RadioGroup>
        {deliveryType === 'pickup' && (
          <Flex gap={'3px'}>
            <img width={isLessThan768 ? '13px' : '18px'} src={point}></img>
            <Text
              fontSize={isLessThan768 ? 14 : 16}
              fontWeight={400}
              color={'#002034'}
              lineHeight={isLessThan768 ? '21px' : '24px'}
              fontFamily={'Rubik'}
              fontStyle={'normal'}
              mb={'1px'}
            >
              Warsaw, Chrystiana Piotra Aignera 6, 00-710
            </Text>
          </Flex>
        )}

        <Box
          w="100%"
          h="1px"
          bg="grey"
          opacity={0.6}
          mb={'10px'}
          mt={isLessThan768 ? '19px' : '10px'}
        />

        <AdditionalProducts />

        <Box w="100%" h="1px" bg="grey" opacity={0.6} mt={'10px'} mb={'13px'} />

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
            onClick={() => setSelectedBasketType('basket')}
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
            onClick={() => setSelectedBasketType('pay')}
            isDisabled={getDisabledState()}
          >
            Continue
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default DeliveryForm
