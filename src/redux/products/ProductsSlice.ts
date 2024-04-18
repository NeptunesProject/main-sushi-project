import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from 'redux/products/operations'
import { ProductsState } from 'types'

export const initialState: ProductsState = {
  selectedProducts: [],
  personCount: 1,
  sticks: 0,
  studySticks: 0,
  voucher: { discount: 1 },
  products: [],
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.selectedProducts.push(action.payload)
    },
    removeProduct(state, action) {
      const { product } = action.payload
      if (state.selectedProducts[product.id]?.count > 1) {
        state.selectedProducts[product.id].count -= 1
      } else {
        delete state.selectedProducts[product.id]
      }
    },
    deleteProduct(state, action) {
      const { product } = action.payload
      delete state.selectedProducts[product.id]
    },
    setPersonCount(state, action) {
      state.personCount = action.payload
    },
    setSticks(state, action) {
      state.sticks = action.payload
    },
    setStudySticks(state, action) {
      state.studySticks = action.payload
    },
    setVoucher(state, action) {
      state.voucher = action.payload
    },
    clearBasket(state) {
      state.selectedProducts = []
      state.personCount = 1
      state.sticks = 0
      state.studySticks = 0
      state.voucher = { discount: 1 }
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload
    }),
})

export const {
  addProduct,
  removeProduct,
  deleteProduct,
  setPersonCount,
  setSticks,
  setStudySticks,
  setVoucher,
  clearBasket,
} = productSlice.actions

export default productSlice.reducer
