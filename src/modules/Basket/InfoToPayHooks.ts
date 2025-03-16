import { useMemo } from 'react'
import { SelectedProduct } from 'types'
import { calculateDiscountedPrice } from './OrderFuncs'
import { useSelector } from 'react-redux'
import {
  selectBasketProducts,
  selectVoucher,
} from '../../redux/products/selectors'
import { calculateTotalPrice } from '../../utils/calculateDiscountedPrice'
import { minimalPrice } from '../../constants'

export function useTotalPrice() {
  const voucher = useSelector(selectVoucher)
  const selectedProducts: SelectedProduct[] = useSelector(selectBasketProducts)
  const totalPrice = calculateTotalPrice(selectedProducts)
  const totalPriceWithDiscount = useMemo(() => {
    return Object.values(selectedProducts).reduce((acc, item) => {
      let price = item.product.price

      if (item.product.discount) {
        price = calculateDiscountedPrice(
          price,
          item.product.discount.discountPerQuantity,
          item.count,
        )
      }

      return acc + price * item.count
    }, 0)
  }, [selectedProducts, calculateDiscountedPrice])
  let isDiscounted = false

  if (totalPrice - totalPriceWithDiscount > 0) isDiscounted = true

  const priceWithVoucher = isDiscounted
    ? totalPriceWithDiscount * voucher.discount
    : totalPrice * voucher.discount
  console.log(voucher.discount)
  const isMinimumPriceReached = useMemo(
    () => priceWithVoucher >= minimalPrice,
    [priceWithVoucher],
  )
  let isVoucherActive = false

  if (totalPrice !== 0 && voucher.discount !== 1) {
    isVoucherActive = true
  }

  let discount = 0

  if (isVoucherActive) discount = totalPrice - priceWithVoucher
  else if (isDiscounted) discount = totalPrice - totalPriceWithDiscount

  const showDiscounted = isVoucherActive || isDiscounted

  return {
    finalPrice: priceWithVoucher,
    totalPrice,
    isMinimumPriceReached,
    discount,
    showDiscounted,
  }
}

// export function useTotalWeight(selectedProducts: SelectedProduct[]) {
//   const totalWeight = useMemo(() => {
//     return Object.values(selectedProducts).reduce((acc, item) => {
//       return acc + item.product.weight * item.count
//     }, 0)
//   }, [selectedProducts])
//
//   return totalWeight
// }
