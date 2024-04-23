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
    setSelectedProductCount(state, action) {
      const { id, count } = action.payload

      const index = state.selectedProducts.findIndex(
        (item) => item.product.id === id,
      )
      if (index !== -1 ) {
        state.selectedProducts[index].count = count
      }
    },
    deleteSelectedProduct(state, action) {
      const { id} = action.payload
      const index = state.selectedProducts.findIndex(
        (item) => item.product.id === id
      )
    state.selectedProducts.splice(index, 1)
    },
    eraseAfterOrder(state){
      state.selectedProducts=[];

    }
  },
  extraReducers: (builder) =>
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.personCount= 1;
      state.sticks= 0;
      state.studySticks= 0;
    }),
})

export const { addProduct, setProductCount, setSelectedProductCount, deleteSelectedProduct, eraseAfterOrder } = productSlice.actions

export default productSlice.reducer
