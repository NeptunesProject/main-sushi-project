import React, { useState } from 'react'
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
} from '@chakra-ui/react'
import { BasketTypes } from '../../types'
import { ArrowBackIcon } from '@chakra-ui/icons'
import InfoToPay from './InfoToPay'


interface Props {
  setSelectedBasketType: React.Dispatch<React.SetStateAction<BasketTypes>>
}

const getFromLocaleStorage = (key: string, defaultValue: string): string => {
  const storedValue = localStorage.getItem(key)
  return storedValue ? JSON.parse(storedValue) : defaultValue
}

const DeliveryForm = ({ setSelectedBasketType }: Props) => {
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


  return (
    <>
      <DrawerHeader
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          cursor="pointer"
          onClick={() => setSelectedBasketType('basket')}
          fontSize={15}
        >
          <ArrowBackIcon /> back{' '}
        </Text>
        <DrawerCloseButton pos="static" />
      </DrawerHeader>
      <DrawerBody color="blue.200" pr="2">
        <Flex flexDir="column" gap={5}>
          <Text fontSize={18} fontWeight={600} mb={5}>
            Confirm order
          </Text>

          <Box mb={10}>
            <Text fontWeight={600} mb={2}>
              Personal data:
            </Text>

            <Flex flexDir="column" gap={3} align="start" mb={4}>
              <Input
                value={name}
                onInput={(e) => {
                  setName((e.target as HTMLInputElement).value.trim())
                  localStorage.setItem(
                    'personInfo-Name',
                    JSON.stringify((e.target as HTMLInputElement).value.trim()),
                  )
                }}
                placeholder="name"
              />
              <Input
                value={phoneNumber}
                onInput={(e) => {
                  setPhoneNumber((e.target as HTMLInputElement).value.trim())
                  localStorage.setItem(
                    'personInfo-Number',
                    JSON.stringify((e.target as HTMLInputElement).value.trim()),
                  )
                }}
                type="tel"
                placeholder="phone number"
              />
              {deliveryType === 'delivery' && (
                <Input
                  value={street}
                  onInput={(e) => {
                    setStreet((e.target as HTMLInputElement).value.trim())
                    localStorage.setItem(
                      'personInfo-Street',
                      JSON.stringify(
                        (e.target as HTMLInputElement).value.trim(),
                      ),
                    )
                  }}
                  type="text"
                  placeholder="street"
                />
              )}
            </Flex>

            <RadioGroup
              onChange={(value) => {
                setDeliveryType(value)
                localStorage.setItem(
                  'personInfo-Delivery',
                  JSON.stringify(value),
                )
              }}
              value={deliveryType}
            >
              <Stack direction="column">
                <Radio value="pickup">Self pick-up</Radio>
                <Radio value="delivery">Delivery to address</Radio>
              </Stack>
            </RadioGroup>

          </Box>

          <InfoToPay />

          <Button
            alignSelf="end"
            w="60%"
            border="2px solid"
            borderColor="turquoise.77"
            bg="none"
            borderRadius={25}
            onClick={() => setSelectedBasketType("pay")}
            isDisabled={
              name.length === 0 ||
              phoneNumber.length === 0 ||
              (deliveryType !== 'pickup' && street.length === 0)
            }
          >
            Continue
          </Button>
        </Flex>
      </DrawerBody>
    </>
  )
}

export default DeliveryForm
