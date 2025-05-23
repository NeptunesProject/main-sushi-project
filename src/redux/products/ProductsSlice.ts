import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchProducts } from 'redux/products/operations'
import { ProductsState, VoucherProps } from 'types'

export const initialState: ProductsState = {
  selectedProducts: [],
  additionalInfo: {
    personCount: 1,
    sticks: 0,
    studySticks: 0,
  },
  isDelivery: true,
  voucher: { discount: 1, error: '', code: '' },
  enteredVoucher: '',
  products: [],
  isProductsLoading: false,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.selectedProducts.push(action.payload)
    },
    setProductCount(state, action) {
      const { id, count } = action.payload

      const index = state.selectedProducts.findIndex(
        (item) => item.product.id === id,
      )
      if (index !== -1) {
        state.selectedProducts[index].count += count

        if (state.selectedProducts[index].count <= 0) {
          state.selectedProducts.splice(index, 1)
        }
      }
    },
    setIsDelivery(state, action) {
      state.isDelivery = action.payload
    },
    setPersonCount(state, action) {
      state.additionalInfo.personCount += action.payload
    },
    setSticks(state, action) {
      state.additionalInfo.sticks += action.payload
    },
    setStudySticks(state, action) {
      state.additionalInfo.studySticks += action.payload
    },
    setSelectedProductCount(state, action) {
      const { id, count } = action.payload

      const index = state.selectedProducts.findIndex(
        (item) => item.product.id === id,
      )
      if (index !== -1) {
        state.selectedProducts[index].count = count
      }
    },
    deleteSelectedProduct(state, action: PayloadAction<{ itemId: number }>) {
      const { itemId } = action.payload
      const index = state.selectedProducts.findIndex(
        (item) => item.product.id === itemId,
      )
      state.selectedProducts.splice(index, 1)
    },
    deleteFreeProduct(state) {
      state.selectedProducts = state.selectedProducts.filter(
        (item) => !item.isFree,
      )
    },
    eraseAfterOrder(state) {
      state.selectedProducts = []
      state.additionalInfo.personCount = 1
      state.additionalInfo.sticks = 0
      state.additionalInfo.studySticks = 0
    },
    setVoucher(state, action: PayloadAction<VoucherProps>) {
      state.voucher = action.payload
    },
    setEnteredVoucher(state, action: PayloadAction<string>) {
      state.enteredVoucher = action.payload
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.isProductsLoading = false
      })
      .addCase(fetchProducts.pending, (state) => {
        state.isProductsLoading = true
      }),
})

export const {
  addProduct,
  setProductCount,
  setSelectedProductCount,
  deleteSelectedProduct,
  eraseAfterOrder,
  setPersonCount,
  setSticks,
  setStudySticks,
  setVoucher,
  deleteFreeProduct,
  setIsDelivery,
  setEnteredVoucher
} = productSlice.actions

export default productSlice.reducer
