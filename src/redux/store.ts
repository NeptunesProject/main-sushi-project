import { configureStore } from '@reduxjs/toolkit'
import productReducer from './products/ProductsSlice'

export default configureStore({
  reducer: {
    product: productReducer,
  },
})
