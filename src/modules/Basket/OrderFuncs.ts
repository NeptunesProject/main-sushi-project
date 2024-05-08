import { postOrder } from 'api'
import { BasketTypes, CartItem, ReturnedOrder, SelectedProduct } from 'types'

type DispatchSetter<T> = React.Dispatch<React.SetStateAction<T>>

interface IMakeOrder {
  (
    setSelectedBasketType: DispatchSetter<BasketTypes>,
    name: string,
    street: string,
    deliveryType: string,
    phoneNumber: string,
    personCount: number,
    studySticks: number,
    payment: string,
    commentary: string,
    voucherCode: string,
    email: string,
    selectedProducts: SelectedProduct[],
  ): Promise<ReturnedOrder>
}

interface IClearCard {
  (
    setName: DispatchSetter<string>,
    setPhoneNumber: DispatchSetter<string>,
    setDeliveryType: DispatchSetter<string>,
    setStreet: DispatchSetter<string>,
    setPayment: DispatchSetter<string>,
    setEmail: DispatchSetter<string>,
  ): void
}

interface IHandleClick {
  (
    orderId: number,
    setSelectedBasketType: DispatchSetter<BasketTypes>,
    setOrderId: DispatchSetter<number>,
    setName: DispatchSetter<string>,
    setPhoneNumber: DispatchSetter<string>,
    setDeliveryType: DispatchSetter<string>,
    setStreet: DispatchSetter<string>,
    setPayment: DispatchSetter<string>,
    setEmail: DispatchSetter<string>,
  ): void
}

interface DiscountRecord {
  [key: number]: string
}

export interface ICalculateDiscountedPrice {
  (price: number, discounts: DiscountRecord, quantity: number): number
}

export const makeOrder: IMakeOrder = async (
  setSelectedBasketType,
  name,
  street,
  deliveryType,
  phoneNumber,
  personCount,
  studySticks,
  payment,
  commentary,
  voucherCode,
  email,
  selectedProducts,
) => {
  setSelectedBasketType('delivery')

  const cartItems: CartItem[] = selectedProducts.map((item) => {
    return {
      id: item.product.id.toString(),
      quantity: item.count,
    }
  })

  try {
    const order = await postOrder({
      toDateTime: new Date().toISOString(),
      clientInfo: {
        name,
        phoneNumber,
      },
      deliveryAddress: {
        clientAddress: street,
      },
      comment: commentary,
      peopleCount: personCount,
      cartItems,
      studySticksCount: studySticks,
      deliveryType: deliveryType.toUpperCase(),
      paymentType: payment.toUpperCase(),
      code: voucherCode,
      email,
    })

    return order
  } catch (error) {
    console.error('Error occurred while making order:', error)
    throw new Error('Failed to make order')
  }
}

export const clearCard: IClearCard = (
  setName,
  setPhoneNumber,
  setDeliveryType,
  setStreet,
  setPayment,
  setEmail,
) => {
  setName('')
  setPhoneNumber('')
  setDeliveryType('')
  setStreet('')
  setPayment('')
  setEmail('')
}

export const clearLocaleStorage = () => {
  localStorage.setItem('personInfo-Name', JSON.stringify(''))
  localStorage.setItem('personInfo-Number', JSON.stringify(''))
  localStorage.setItem('personInfo-Delivery', JSON.stringify(''))
  localStorage.setItem('personInfo-Street', JSON.stringify(''))
  localStorage.setItem('personInfo-Email', JSON.stringify(''))
  localStorage.setItem('paymentType', JSON.stringify(''))
}

export const handleClick: IHandleClick = async (
  orderId,
  setSelectedBasketType,
  setOrderId,
  setName,
  setPhoneNumber,
  setDeliveryType,
  setStreet,
  setPayment,
  setEmail,
) => {
  setOrderId(orderId)
  clearCard(
    setName,
    setPhoneNumber,
    setDeliveryType,
    setStreet,
    setPayment,
    setEmail,
  )
  clearLocaleStorage()
  setSelectedBasketType('orderResponse')
}

export const calculateDiscountedPrice: ICalculateDiscountedPrice = (
  price: number,
  discounts: Record<number, string>,
  quantity: number,
) => {
  let discount = 0

  const keys = Object.keys(discounts)
    .map(Number)
    .sort((a, b) => b - a)

  for (const key of keys) {
    if (quantity >= key) {
      discount = parseFloat(discounts[key])
      break
    }
  }

  return price * (1 - discount)
}
