import { ReactNode } from 'react'
import { store } from 'redux/store'

enum Languages {
  en = 'EN',
  pl = 'PL',
  ua = 'UA',
  ru = 'RU',
}

interface Product {
  id: number
  name: string
  nameRu: string
  nameEn: string
  nameUa: string
  price: number
  categoryId: number
  allergensId: number
  weight: number
  url: string
  img: string
  status: number
  description: string
  descriptionRu: string
  descriptionEn: string
  descriptionUa: string
  size: number
  sale: number
  cartCount: number
  sort: number
  box: number
  discount: {
    id: number
    discountPerQuantity: Record<string, string>
    discountType: string
    relationId: number
  }
}

interface Category {
  id: number
  name: string
  nameUa: string
  nameRu: string
  nameEn: string
  url: string
  img: string
}

interface ConstCategory extends Omit<Category, 'id' | 'url'> {
  route: string
  translateId: string
}

interface ChakraFactoryComponent {
  className?: string
  children?: ReactNode | ReactNode[]
}

interface ClientInfo {
  phoneNumber: string
  name: string
}

interface DeliveryAddress {
  clientAddress: string
}

interface CartItem {
  id: string
  quantity: number
}

interface ReturnedOrder {
  id: number
  toDateTime: string
  clientInfo: ClientInfo
  deliveryAddress: DeliveryAddress
  comment: string
  peopleCount: number
  cartItems: CartItem[]
  studySticksCount: number
  deliveryType: string
  paymentType: string
  statusType: 'CREATED'
  code: string
  email: string
}

type OrderToPost = Omit<ReturnedOrder, 'statusType' | 'id'>

interface ProductObj {
  count: number
  product: Product
}

interface Voucher {
  discount: number
  error: string
}

interface ValidatedVoucher {
  code: string
  dateUntilValid: number
  quantityOfUse: number
  discountPercentage: number
}

interface SelectedProduct {
  product: Product
  count: number
}

interface ProductsState {
  selectedProducts: SelectedProduct[]
  additionalInfo: {
    personCount: number
    sticks: number
    studySticks: number
  }
  voucher: { discount: number; error: string; code: string }
  products: Product[]
  isProductsLoading: boolean
}

type RootState = {
  product: ProductsState
}

type BasketTypes = 'basket' | 'delivery' | 'pay' | 'orderResponse'

type AppDispatch = typeof store.dispatch

export type {
  Languages,
  Product,
  ChakraFactoryComponent,
  BasketTypes,
  Category,
  OrderToPost,
  ProductObj,
  ReturnedOrder,
  CartItem,
  Voucher,
  ValidatedVoucher,
  AppDispatch,
  ProductsState,
  RootState,
  SelectedProduct,
  ConstCategory,
}
