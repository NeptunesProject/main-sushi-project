import { SelectedProduct } from 'types'

export const calculateDiscountedPrice = (
    price: number,
    discounts: Record<number, string>,
    quantity: number,
) => {
  let discount = 0

  const keys = Object.keys(discounts)
      .map(Number)
      .sort((a, b) => b - a)

  for (const key of keys) {
    if (quantity >= key) {
      discount = parseFloat(discounts[key])
      break
    }
  }

  const discountedPrice = price * (1 - discount)

  // Round to one decimal place
  return Math.round(discountedPrice)
}


export function calculateTotalPrice(products: SelectedProduct[]): number {
  return products.reduce(
    (total, selectedProduct) =>
      total + selectedProduct.product.price * selectedProduct.count,
    0,
  )
}
