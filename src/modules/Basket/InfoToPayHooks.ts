import { useMemo } from 'react'
import { SelectedProduct } from 'types'
import { ICalculateDiscountedPrice } from './OrderFuncs'

export function useTotalPrice(
  selectedProducts: SelectedProduct[],
  calculateDiscountedPrice: ICalculateDiscountedPrice,
) {
  const totalPrice = useMemo(() => {
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

  return totalPrice
}

export function useTotalWeight(selectedProducts: SelectedProduct[]) {
  const totalWeight = useMemo(() => {
    return Object.values(selectedProducts).reduce((acc, item) => {
      return acc + item.product.weight * item.count
    }, 0)
  }, [selectedProducts])

  return totalWeight
}
