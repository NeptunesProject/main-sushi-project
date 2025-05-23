import { Button, Flex, Input, Text, useMediaQuery } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { useVoucher } from '../../hooks/useVoucher'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../types'
import { setEnteredVoucher } from '../../redux/products/ProductsSlice'

export const PromoCode = () => {
  const dispatch = useDispatch<AppDispatch>()

  const {
    CancelVoucher,
    validateVoucher,
    voucher,
    enteredVoucher
  } = useVoucher()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEnteredVoucher(e.target.value))
  }

  const [isLessThan768] = useMediaQuery('(max-width: 768px)')
  const [isLessThan768h] = useMediaQuery('(max-height: 768px)')

  return (
    <>
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        gap={'10px'}
        mb={'12px'}
        mt={'12px'}
      >
        <Text
          color="blue.300"
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          fontWeight={'500'}
          fontSize={isLessThan768 ? '14px' : '16px'}
          lineHeight={isLessThan768 ? '21px' : '24px'}
        >
          Kod promocyjny
        </Text>
        <Input
          value={enteredVoucher}
          onChange={handleInputChange}
          style={{
            border: '1px solid gray.50',
            borderRadius: '4px',
            padding: '6px',
            maxWidth: isLessThan768 ? '114px' : '128px',
            maxHeight: isLessThan768 ? '26px' : '30px',
            boxSizing: 'border-box',
          }}
        />

        {!voucher.code ? (
          <Flex alignItems="center" justifyContent="flex-end">
            <Button
              float={'right'}
              onClick={validateVoucher}
              bg="blue.100"
              borderRadius={25}
              color={'#FFFFFF'}
              fontWeight={400}
              lineHeight={'24px'}
              fontFamily={'Rubik'}
              fontStyle={'normal'}
              fontSize={isLessThan768h ? 14 : 16}
              h={isLessThan768h ? '30px' : '40px'}
            >
              Zastosuj
            </Button>
          </Flex>
        ) : (
          <Flex alignItems="center" justifyContent="flex-end">
            <Button
              onClick={CancelVoucher}
              float={'right'}
              bg="blue.300"
              borderRadius={25}
              color={'#FFFFFF'}
              fontWeight={400}
              lineHeight={'24px'}
              fontFamily={'Rubik'}
              fontStyle={'normal'}
              fontSize={isLessThan768h ? 14 : 16}
              h={isLessThan768h ? '30px' : '40px'}
            >
              Usunąć
            </Button>
          </Flex>
        )}
      </Flex>
      <Flex justifyContent={'center'} alignItems={'center'}>
        {voucher.error !== '' && (
          <Text
            color="red.400"
            fontFamily="Rubik"
            fontStyle="normal"
            fontWeight="400"
            fontSize={isLessThan768 ? '14px' : '16px'}
            lineHeight={isLessThan768 ? '21px' : '24px'}
          >
            {voucher.error}
          </Text>
        )}
        {voucher.code && (
          <Text
            color="blue.300"
            fontFamily="Rubik"
            fontStyle="normal"
            fontWeight="400"
            fontSize={isLessThan768 ? '14px' : '16px'}
            lineHeight={isLessThan768 ? '21px' : '24px'}
          >
            kod promocyjny{' '}
            <Text as="span" fontWeight="700">
              {voucher.code}
            </Text>{' '}
            aktywowany
          </Text>
        )}
      </Flex>
    </>
  )
}
