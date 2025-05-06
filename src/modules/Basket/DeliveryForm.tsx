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
import { AppDispatch, BasketTypes } from '../../types'
import InfoToPay from './InfoToPay'
import { BasketInput } from 'components/BasketInput'
import AdditionalProducts from './AdditionalProducts'
import BasketSelectTime from '../../components/BasketSelectTime'
import {
  getFromLocaleStorage,
  getObjectFromLocalStorage,
  parseDeliveryDay,
} from '../../utils/functions'
import { PhoneNumberInput } from './PhoneNumberIntup'
import TimeBasedModal from '../../components/SleepModal'
import useWorkingHours from '../../hooks/useWorkingHours'
import point from '../../assets/icons/point.svg'
import { PromoCode } from './PromoCode'
import { useDispatch, useSelector } from 'react-redux'
import { setIsDelivery } from '../../redux/products/ProductsSlice'
import { selectIsDelivery } from '../../redux/products/selectors'

interface Props {
  setSelectedBasketType: React.Dispatch<React.SetStateAction<BasketTypes>>
}

const DeliveryForm = ({ setSelectedBasketType }: Props) => {
  const { isClosed } = useWorkingHours()
  const [isLessThan768] = useMediaQuery('(max-width: 768px)')
  const [isLessThan768h] = useMediaQuery('(max-height: 768px)')
  const dispatch = useDispatch<AppDispatch>()

  const [name, setName] = useState(() =>
    getFromLocaleStorage('personInfo-Name', ''),
  )
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  const [phoneNumber, setPhoneNumber] = useState(() =>
    getObjectFromLocalStorage('personInfo-Number', {
      phoneNumber: '',
      isValid: false,
    }),
  )

  const isDelivery = useSelector(selectIsDelivery)

  const [street, setStreet] = useState(() =>
    getFromLocaleStorage('personInfo-Street', ''),
  )
  const [email, setEmail] = useState(() =>
    getFromLocaleStorage('personInfo-Email', ''),
  )
  const [deliveryDate, setDeliveryDate] = useState(() =>
    getObjectFromLocalStorage('personInfo-delivery-date', {
      day: 'Dzisiaj',
      time: 'Jak najszybciej',
    }),
  )
  const getDisabledState = () => {
    let isDisabled = false

    switch (true) {
      case name.length === 0:
      case !phoneNumber.isValid:
      case isDelivery && street.length === 0:
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
  function phoneSetter(phoneNumber: string, isValid: boolean) {
    setPhoneNumber({ phoneNumber: phoneNumber.trim(), isValid })
    localStorage.setItem(
      'personInfo-Number',
      JSON.stringify({ phoneNumber: phoneNumber.trim(), isValid }),
    )
  }
  function streetSetter(e: React.ChangeEvent<HTMLInputElement>) {
    setStreet(isDelivery ? (e.target as HTMLInputElement).value : '')
    localStorage.setItem(
      'personInfo-Street',
      JSON.stringify(isDelivery ? (e.target as HTMLInputElement).value : ''),
    )
  }

  function deliverySetter(value: string) {
    if (value === 'pickup') {
      setStreet('')
      localStorage.setItem('personInfo-Street', JSON.stringify(''))
      dispatch(setIsDelivery(false))
    } else {
      dispatch(setIsDelivery(true))
    }
  }

  function emailSetter(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value.trim())
    localStorage.setItem(
      'personInfo-Email',
      JSON.stringify((e.target as HTMLInputElement).value.trim()),
    )
  }

  const pickupBorderColor = !isDelivery ? 'black' : 'grey'
  const deliveryBorderColor = isDelivery ? 'black' : 'grey'

  const onContinueHandler = () => {
    const today = new Date().getDate()
    const deliveryDay = parseDeliveryDay(deliveryDate.day).getDate()
    if (
      today === deliveryDay &&
      isClosed &&
      deliveryDate.time === 'Jak najszybciej'
    ) {
      setModalIsOpen(true)
    } else setSelectedBasketType('pay')
  }
  return (
    <>
      <TimeBasedModal
        openSignal={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        header="Niestety nasze godziny pracy dobiegły końca."
      >
        W międzyczasie możesz złożyć zamówienie w przedsprzedaży...
      </TimeBasedModal>
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
          color="blue.300"
        >
          Szczegóły zamówienia
        </Text>
        <DrawerCloseButton pos="static" />
      </Flex>

      <Flex
        pl={isLessThan768 ? '5px' : '0px'}
        pr={isLessThan768 ? '5px' : '0px'}
        flexDir="column"
      >
        <Text
          fontSize={isLessThan768h ? 14 : 16}
          fontWeight={400}
          color="blue.300"
          lineHeight={isLessThan768h ? '14px' : '24px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          mb={'4px'}
        >
          Dane osobowe:
        </Text>
        <Flex
          flexDir="column"
          gap={isLessThan768h ? '5px' : '10px'}
          align="start"
          mb={'8px'}
        >
          <BasketInput
            required
            value={name}
            setter={nameSetter}
            type="text"
            placeholder="Imię"
          />
          <PhoneNumberInput
            value={phoneNumber.phoneNumber}
            setter={phoneSetter}
          />

          {isDelivery && (
            <BasketInput
              required
              value={street}
              setter={streetSetter}
              type="text"
              placeholder="Adres dostawy"
            />
          )}
          <BasketInput
            value={email}
            setter={emailSetter}
            type="email"
            placeholder="Email"
          />
          <Text
            fontSize={isLessThan768h ? 14 : 16}
            fontWeight={400}
            color="blue.300"
            lineHeight={isLessThan768h ? '14px' : '24px'}
            fontFamily={'Rubik'}
            fontStyle={'normal'}
            mb={'4px'}
          >
            Сzas dostawy:
          </Text>
          <BasketSelectTime
            deliveryDate={deliveryDate}
            setDeliveryDate={setDeliveryDate}
          />
        </Flex>
        <Text
          fontSize={isLessThan768h ? 14 : 16}
          fontWeight={400}
          color="blue.300"
          lineHeight={isLessThan768h ? '21px' : '24px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          mb={'1px'}
        >
          Wybierz rodzaj dostawy:
        </Text>
        <RadioGroup
          onChange={(value) => deliverySetter(value)}
          value={isDelivery ? 'delivery' : 'pickup'}
        >
          <Stack direction="column" spacing={'3px'}>
            <Radio
              style={{
                borderColor: pickupBorderColor,
              }}
              size={isLessThan768 ? 'sm' : 'md'}
              value="pickup"
            >
              Odbiór osobisty
            </Radio>
            <Radio
              style={{
                borderColor: deliveryBorderColor,
              }}
              size={isLessThan768 ? 'sm' : 'md'}
              value="delivery"
            >
              Dostawa
            </Radio>
          </Stack>
        </RadioGroup>
        {!isDelivery && (
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
              Dolna 41, Mokotow, 00-773 Warszawa
            </Text>
          </Flex>
        )}

        <Box
          w="100%"
          h="1px"
          bg="grey.100"
          opacity={0.6}
          mb={'10px'}
          mt={isLessThan768 ? '19px' : '10px'}
        />

        <AdditionalProducts />

        <Box w="100%" h="1px" bg="grey" opacity={0.6} mt={'10px'} mb={'13px'} />

        <PromoCode />

        <InfoToPay />

        <Flex justifyContent={'center'} gap={'8px'}>
          <Button
            bg="blue.300"
            borderRadius={25}
            color="white.200"
            fontSize={16}
            fontWeight={400}
            lineHeight={'24px'}
            fontFamily={'Rubik'}
            fontStyle={'normal'}
            mt={'9px'}
            alignSelf="end"
            onClick={() => setSelectedBasketType('basket')}
            width={'99px'}
            h={isLessThan768h ? '30px' : '40px'}
          >
            Wstecz
          </Button>

          <Button
            bg="blue.100"
            borderRadius={25}
            color="white.200"
            fontSize={isLessThan768h ? 14 : 16}
            fontWeight={400}
            lineHeight={'24px'}
            fontFamily={'Rubik'}
            fontStyle={'normal'}
            mt={'9px'}
            alignSelf="end"
            onClick={onContinueHandler}
            isDisabled={getDisabledState()}
            h={isLessThan768h ? '30px' : '40px'}
          >
            Kontynuuj
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default DeliveryForm
