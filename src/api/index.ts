import axios from 'axios'
import {
  Category,
  OrderToPost,
  Product,
  ReturnedOrder,
  ValidatedVoucher,
} from '../types'

const BASE_URL = import.meta.env.VITE_APP_MAIN_API

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
})

const postOrder = async (orderObj: OrderToPost): Promise<ReturnedOrder> => {
  return new Promise((resolve, reject) => {
    apiClient
      .post('/orders', orderObj)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const postVoucher = async (voucher: string): Promise<ValidatedVoucher> => {
  return new Promise((resolve, reject) => {
    apiClient
      .post('/vouchers/validate', { voucherKey: voucher })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error.response.data)
      })
  })
}

const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    apiClient
      .get('/products')
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const getProduct = async (id: string): Promise<Product> => {
  return new Promise((resolve, reject) => {
    apiClient
      .get(`/products/${id}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const getCategories = async (): Promise<Category[]> => {
  return new Promise((resolve, reject) => {
    apiClient
      .get('/category')
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export { getProducts, getCategories, getProduct, postOrder, postVoucher }
