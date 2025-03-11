import { postOrder } from 'api'
import { BasketTypes, CartItem, ReturnedOrder, SelectedProduct } from 'types'
import { getISOSDate } from '../../utils/functions'

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
    deliveryDate: {day: string, time: string},
  ): Promise<ReturnedOrder>
}

interface IClearCard {
  (
    setName: DispatchSetter<string>,
    setPhoneNumber: DispatchSetter<{
      phoneNumber: string,
      isValid: boolean,
    }>,
    setDeliveryType: DispatchSetter<string>,
    setStreet: DispatchSetter<string>,
    setPayment: DispatchSetter<string>,
    setEmail: DispatchSetter<string>,
    setDeliveryDate: DispatchSetter<{
      day: string
      time: string
    }>,
  ): void
}

interface IHandleClick {
  (
    orderId: number,
    setSelectedBasketType: DispatchSetter<BasketTypes>,
    setOrderId: DispatchSetter<number>,
    setName: DispatchSetter<string>,
    setPhoneNumber: DispatchSetter<{
      phoneNumber: string,
      isValid: boolean,
    }>,
    setDeliveryType: DispatchSetter<string>,
    setStreet: DispatchSetter<string>,
    setPayment: DispatchSetter<string>,
    setEmail: DispatchSetter<string>,
    setDeliveryDate: DispatchSetter<{
      day: string
      time: string
    }>,
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
  deliveryDate
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
      toDateTime: getISOSDate(deliveryDate),
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
  setDeliveryDate,
) => {
  setName('')
  setPhoneNumber({
    phoneNumber: '',
    isValid: false,
  })
  setDeliveryType('delivery')
  setStreet('')
  setPayment('')
  setEmail('')
  setDeliveryDate({
    day: 'Dzisiaj',
    time: 'Jak najszybciej',
  })
}

export const clearLocaleStorage = () => {
  localStorage.setItem('personInfo-Name', JSON.stringify(''))
  localStorage.setItem('personInfo-Number', JSON.stringify({
    phoneNumber: '',
    isValid: false,
  }))
  localStorage.setItem('personInfo-Delivery', JSON.stringify('delivery'))
  localStorage.setItem('personInfo-Street', JSON.stringify(''))
  localStorage.setItem('personInfo-Email', JSON.stringify(''))
  localStorage.setItem('paymentType', JSON.stringify(''))
  localStorage.setItem(
    'personInfo-delivery-date',
    JSON.stringify({
      day: 'Dzisiaj',
      time: 'Jak najszybciej',
    }),
  )
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
  setDeliveryDate,
) => {
  setOrderId(orderId)
  clearCard(
    setName,
    setPhoneNumber,
    setDeliveryType,
    setStreet,
    setPayment,
    setEmail,
    setDeliveryDate
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

  const discountedPrice = price * (1 - discount)

  // Round to one decimal place
  return Math.round(discountedPrice)
}
