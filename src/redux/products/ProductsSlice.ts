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
    setProductCount(state, action) {
      const { id, count } = action.payload

      const index = state.selectedProducts.findIndex(
        (item) => item.product.id === id,
      )
      if (index !== -1) {
        state.selectedProducts[index].count += count
      }
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload
    }),
})

export const { addProduct, setProductCount } = productSlice.actions

export default productSlice.reducer
