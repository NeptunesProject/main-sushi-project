import { useEffect, useMemo, useState } from 'react'
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
  const [discountMessage, setDiscountMessage] = useState<number>(0)
  const totalPriceWithDiscount = useMemo(() => {
    return selectedProducts.reduce((acc, item) => {
      const { price, discount } = item.product
      const discountedPrice = discount
        ? calculateDiscountedPrice(price, discount.discountPerQuantity, item.count)
        : price
      return acc + discountedPrice * item.count
    }, 0)
  }, [selectedProducts])
  console.log(voucher)
  const isDiscounted = totalPrice > totalPriceWithDiscount
  const priceWithVoucher = (isDiscounted ? totalPriceWithDiscount : totalPrice) * voucher.discount
  const isMinimumPriceReached = priceWithVoucher >= minimalPrice
  const isVoucherActive = totalPrice !== 0 && voucher.discount !== 1
  const discount = isVoucherActive
    ? totalPrice - priceWithVoucher
    : isDiscounted
      ? totalPrice - totalPriceWithDiscount
      : 0

  useEffect(() => {
    const voucherPercent = (1 - voucher.discount) * 100
    setDiscountMessage(Math.round(voucherPercent))
  },[isVoucherActive])

  return {
    finalPrice: priceWithVoucher,
    totalPrice,
    isMinimumPriceReached,
    discount,
    showDiscounted: isVoucherActive || isDiscounted,
    discountMessage
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
