import { configureStore } from '@reduxjs/toolkit'
import productReducer from './products/ProductsSlice'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const productPersistConfig = {
  key: 'product',
  storage,
  whitelist: ['selectedProducts', 'additionalInfo'],
}

export const store = configureStore({
  reducer: {
    product: persistReducer(productPersistConfig, productReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
