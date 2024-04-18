import { RootState } from 'types'

export const selectProducts = (state: RootState) => state.product.products

export const selectBasketProducts = (state: RootState) => {
  return state.product.selectedProducts
}
