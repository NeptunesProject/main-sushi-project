import { createAsyncThunk } from '@reduxjs/toolkit'

import { getProducts } from 'api'
import { Product } from 'types'

export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/FetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await getProducts()
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)
