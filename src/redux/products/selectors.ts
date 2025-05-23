import { RootState } from 'types'

export const selectProducts = (state: RootState) => state.product.products

export const selectBasketProducts = (state: RootState) =>
  state.product.selectedProducts

export const selectIsDelivery = (state: RootState) => state.product.isDelivery

export const selectSticks = (state: RootState) =>
  state.product.additionalInfo.sticks

export const selectStudySticks = (state: RootState) =>
  state.product.additionalInfo.studySticks

export const selectPersonCount = (state: RootState) =>
  state.product.additionalInfo.personCount

export const selectLoading = (state: RootState) =>
  state.product.isProductsLoading

export const selectVoucher = (state: RootState) => state.product.voucher
export const getEnteredVoucher = (state: RootState) => state.product.enteredVoucher


