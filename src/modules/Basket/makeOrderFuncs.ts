import { postOrder } from 'api'
import { BasketTypes, CartItem, ProductObj, ReturnedOrder } from 'types'

type DispatchSetter<T> = React.Dispatch<React.SetStateAction<T>>

interface IMakeOrder {
  (
    setSelectedBasketType: DispatchSetter<BasketTypes>,
    name: string,
    street: string,
    deliveryType: string,
    phoneNumber: string,
    personCount: number,
    sticks: number,
    studySticks: number,
    payment: string,
  ): Promise<ReturnedOrder>
}

interface IClearCard {
  (
    setName: DispatchSetter<string>,
    setPhoneNumber: DispatchSetter<string>,
    setDeliveryType: DispatchSetter<string>,
    setStreet: DispatchSetter<string>,
    setPersonCount: DispatchSetter<number>,
    setSticks: DispatchSetter<number>,
    clearProductList: () => void,
    setStudySticks: DispatchSetter<number>,
    setPayment: DispatchSetter<string>,
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
    setPersonCount: DispatchSetter<number>,
    setSticks: DispatchSetter<number>,
    clearProductList: () => void,
    setStudySticks: DispatchSetter<number>,
    setPayment: DispatchSetter<string>,
  ): void
}

export const makeOrder: IMakeOrder = async (
  setSelectedBasketType,
  name,
  street,
  deliveryType,
  phoneNumber,
  personCount,
  sticks,
  studySticks,
  payment,
) => {
  setSelectedBasketType('delivery')

  const productsList: Record<string, ProductObj> = JSON.parse(
    localStorage.getItem('selectedProducts') || '{}',
  )

  const cartItems: CartItem[] = Object.keys(productsList).map(
    (productId: string) => {
      const product = productsList[productId]
      return {
        id: productId,
        quantity: product.count,
      }
    },
  )

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
      comment: 'Leave at the door.', // Temporary default value
      peopleCount: personCount,
      cartItems,
      studySticksCount: studySticks,
      sticksCount: sticks,
      deliveryType: deliveryType.toUpperCase(),
      paymentType: payment.toUpperCase(),
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
  setPersonCount,
  setSticks,
  clearProductList,
  setStudySticks,
  setPayment,
) => {
  setName('')
  setPhoneNumber('')
  setDeliveryType('pickup')
  setStreet('')
  setPersonCount(1)
  setSticks(0)
  clearProductList()
  setStudySticks(0)
  setPayment('')
}

export const clearLocaleStorage = () => {
  localStorage.setItem('personInfo-Name', JSON.stringify(''))
  localStorage.setItem('personInfo-Number', JSON.stringify(''))
  localStorage.setItem('personInfo-Delivery', JSON.stringify('pickup'))
  localStorage.setItem('personInfo-Street', JSON.stringify(''))
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
  setPersonCount,
  setSticks,
  clearProductList,
  setStudySticks,
  setPayment,
) => {
  setOrderId(orderId)
  clearCard(
    setName,
    setPhoneNumber,
    setDeliveryType,
    setStreet,
    setPersonCount,
    setSticks,
    clearProductList,
    setStudySticks,
    setPayment,
  )
  clearLocaleStorage()
  setSelectedBasketType('orderResponse')
}
