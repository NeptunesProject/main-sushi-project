import { postVoucher } from '../api'
import {
  addProduct,
  deleteFreeProduct,
  setEnteredVoucher,
  setVoucher,
} from '../redux/products/ProductsSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../types'
import { getEnteredVoucher, selectVoucher } from '../redux/products/selectors'

export const useVoucher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const voucher = useSelector(selectVoucher)
  const enteredVoucher = useSelector(getEnteredVoucher)

  async function validateVoucher() {
    try {
      if (enteredVoucher !== '') {
        const { code, discountPercentage, freeProduct } = await postVoucher(
          enteredVoucher,
        )
        if (code) {
          dispatch(
            setVoucher({ code, discount: 1 - discountPercentage, error: '' }),
          )
          if (freeProduct) {
            dispatch(
              addProduct({
                product: {
                  ...freeProduct,
                  id: 777,
                  discount: {
                    ...freeProduct.discount,
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
      if (error === 'Voucher not found.') {
        dispatch(setVoucher({ discount: 1, error, code: '' }))
      }
    }
  }

  const CancelVoucher = () => {
    dispatch(
      setVoucher({
        discount: 1,
        error: '',
        code: '',
      }),
    )
    dispatch(setEnteredVoucher(''))
    dispatch(deleteFreeProduct())
  }
  useEffect(() => {
    setVoucher({ discount: voucher.discount, error: '', code: voucher.code })
  }, [voucher])

  return { CancelVoucher, validateVoucher, voucher, enteredVoucher }
}
