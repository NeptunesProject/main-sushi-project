import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from 'redux/products/operations'
import { ProductsState } from 'types'

export const initialState: ProductsState = {
  selectedProducts: [],
  additionalInfo: {
    personCount: 1,
    sticks: 0,
    studySticks: 0,
  },
  voucher: { discount: 1, error: '', code: '' },
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
      }
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
    deleteSelectedProduct(state, action) {
      const { id } = action.payload
      const index = state.selectedProducts.findIndex(
        (item) => item.product.id === id,
      )
      state.selectedProducts.splice(index, 1)
    },
    eraseAfterOrder(state) {
      state.selectedProducts = []
      state.additionalInfo.personCount = 1
      state.additionalInfo.sticks = 0
      state.additionalInfo.studySticks = 0
    },
    setVoucher(state, action) {
      state.voucher = action.payload
    },
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
} = productSlice.actions

export default productSlice.reducer
