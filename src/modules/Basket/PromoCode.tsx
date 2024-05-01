import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { postVoucher } from 'api'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setVoucher } from 'redux/products/ProductsSlice'
import { selectVoucher } from 'redux/products/selectors'
import { AppDispatch } from 'types'

export const PromoCode = () => {
  const dispatch = useDispatch<AppDispatch>()
  const voucher = useSelector(selectVoucher)
  const [voucherCode, setVoucherCode] = useState('')
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(e.target.value)
  }

  async function validateVoucher() {
    try {
      if (voucherCode !== '') {
        const result = await postVoucher(voucherCode)
        if (result) {
          setVoucherCode(result.code)
          dispatch(
            setVoucher({
              discount: 1 - result.discountPercentage,
              error: '',
            }),
          )
        }
      }
    } catch (error) {
      console.error(error)
      if (error === 'Voucher not found.') {
        dispatch(setVoucher({ discount: 1, error }))
      }
    }
  }

  const CancelVoucher = () => {
    dispatch(
      setVoucher({
        discount: 1,
        error: '',
      }),
    )
  }

  useEffect(() => {
    setVoucher({ discount: voucher.discount, error: '' })
  }, [voucher])

  return (
    <>
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        gap={'10px'}
        mt={'16px'}
        mb={'12px'}
      >
        <Text
          color="#002034"
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          fontWeight={'500'}
          fontSize={'16px'}
          lineHeight={'24px'}
        >
          Promocode
        </Text>
        <Input
          value={voucherCode}
          onChange={handleInputChange}
          style={{
            border: '1px solid #B7B7B7',
            borderRadius: '4px',
            padding: '6px',
            maxWidth: '128px',
            boxSizing: 'border-box',
          }}
        />

        {voucher.discount === 1 ? (
          <Flex alignItems="center" justifyContent="flex-end">
            <Button
              float={'right'}
              onClick={validateVoucher}
              bg="#002034"
              borderRadius={25}
              color={'#FFFFFF'}
              fontSize={16}
              fontWeight={400}
              lineHeight={'24px'}
              fontFamily={'Rubik'}
              fontStyle={'normal'}
            >
              Apply
            </Button>
          </Flex>
        ) : (
          <Flex alignItems="center" justifyContent="flex-end">
            <Button
              onClick={CancelVoucher}
              float={'right'}
              bg="#002034"
              borderRadius={25}
              color={'#FFFFFF'}
              fontSize={16}
              fontWeight={400}
              lineHeight={'24px'}
              fontFamily={'Rubik'}
              fontStyle={'normal'}
            >
              Remove
            </Button>
          </Flex>
        )}
      </Flex>
      {voucher.error !== '' && (
        <Text
          color="red.400"
          fontFamily="Rubik"
          fontStyle="normal"
          fontWeight="400"
          fontSize="16px"
          lineHeight="24px"
          pl={'40px'}
        >
          {voucher.error}
        </Text>
      )}
    </>
  )
}
