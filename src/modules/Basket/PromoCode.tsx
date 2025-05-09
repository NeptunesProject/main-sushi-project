import { Button, Flex, Input, Text, useMediaQuery } from '@chakra-ui/react'
import { postVoucher } from 'api'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addProduct,
  deleteFreeProduct,
  setVoucher,
} from 'redux/products/ProductsSlice'
import { selectVoucher } from 'redux/products/selectors'
import { AppDispatch } from 'types'
import {
  useBasketContext,
  useBasketDispatchContext,
} from '../../contexts/BasketContext'

export const PromoCode = () => {

  const { voucher: contextVoucher } = useBasketContext()
  const { setVoucher: setContextVoucher } = useBasketDispatchContext()
  const dispatch = useDispatch<AppDispatch>()
  const voucher = useSelector(selectVoucher)
  const [voucherCode, setVoucherCode] = useState(contextVoucher.code)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(e.target.value)
  }

  async function validateVoucher() {
    try {
      if (voucherCode !== '') {
        const result = await postVoucher(voucherCode)
        if (result) {
          setVoucherCode(result.code)
          setContextVoucher({
            discount: 1 - result.discountPercentage,
            error: '',
            code: result.code,
          })
          dispatch(
            setVoucher({
              discount: 1 - result.discountPercentage,
              error: '',
              code: result.code,
            }),
          )
          if (result.freeProduct) {
            dispatch(
              addProduct({
                product: {
                  ...result.freeProduct,
                  id: 777,
                  discount: {
                    ...result.freeProduct.discount,
                    discountPerQuantity: { '1': '1' },
                  },
                },
                count: 1,
                isFree: true,
              }),
            )
          }
        }
      }
    } catch (error) {
      console.error(error)

      if (error === 'Voucher not found.') {
        dispatch(setVoucher({ discount: 1, error, code: '' }))
      }
    }
  }

  const CancelVoucher = () => {
    setContextVoucher({ discount: 1, error: '', code: '' })
    setVoucherCode('')
    dispatch(
      setVoucher({
        discount: 1,
        error: '',
        code: '',
      }),
    )
    dispatch(deleteFreeProduct())
  }
  useEffect(() => {
    setVoucher({ discount: voucher.discount, error: '', code: voucher.code })
  }, [voucher])

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
          value={voucherCode}
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

        {!contextVoucher.code ? (
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
        {contextVoucher.code && (
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
