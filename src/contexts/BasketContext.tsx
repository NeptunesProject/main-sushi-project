import { Product, Voucher } from '../types'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface ProductObj {
  count: number
  product: Product
}

interface BasketContextState {
  products: (Product & { count: number })[]
  totalWeight: number
  totalPrice: number
  productsCount: number
  personCount: number
  sticks: number
  studySticks: number
  voucher: Voucher
}
interface IAdditionalProducts {
  sticks: number
  studySticks: number
  personCount: number
}

interface BasketDispatchContextState {
  addProduct: (product: Product, count?: number) => void
  removeProduct: (product: Product) => void
  deleteProduct: (product: Product) => void
  isProductAdded: (product: Product) => boolean
  setPersonCount: (count: number) => void
  setSticks: (count: number) => void
  clearProductList: () => void
  setStudySticks: (count: number) => void
  setVoucher: (voucher: Voucher) => void
  calculateDiscountedPrice: (
    price: number,
    discounts: Record<number, string>,
    quantity: number,
  ) => number
}

const BasketContext = createContext<BasketContextState>(
  {} as BasketContextState,
)

const ProductsDispatchContext = createContext<BasketDispatchContextState>(
  {} as BasketDispatchContextState,
)

const useBasketContext = () => {
  const context = useContext(BasketContext)

  if (!Object.keys(context).length) {
    throw new Error('useProductsContext must be used within a ProductsProvider')
  }

  return context
}

const useBasketDispatchContext = () => {
  const context = useContext(ProductsDispatchContext)
  if (!Object.keys(context).length) {
    throw new Error(
      'useProductsDispatchContext must be used within a ProductsProvider',
    )
  }
  return context
}

const getFromLocaleStorage = (key: string): IAdditionalProducts => {
  const storedValue = localStorage.getItem(key)
  return storedValue ? JSON.parse(storedValue) : {}
}

const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProducts, setSelectedProducts] = useState<
    Record<number, ProductObj>
  >(
    localStorage.getItem('selectedProducts')
      ? JSON.parse(localStorage.getItem('selectedProducts') as string)
      : {},
  )

  const [personCount, setPersonCount] = useState<number>(() => {
    const additionalProducts = getFromLocaleStorage('additionalProducts')

    return additionalProducts.personCount ? additionalProducts.personCount : 1
  })

  const [sticks, setSticks] = useState<number>(() => {
    const additionalProducts = getFromLocaleStorage('additionalProducts')

    return additionalProducts.sticks ? additionalProducts.sticks : 0
  })

  const [studySticks, setStudySticks] = useState<number>(() => {
    const additionalProducts = getFromLocaleStorage('additionalProducts')

    return additionalProducts.studySticks ? additionalProducts.studySticks : 0
  })

  const [voucher, setVoucher] = useState(
    localStorage.getItem('voucher')
      ? JSON.parse(localStorage.getItem('voucher') as string)
      : { discount: 1 },
  )

  const additionalProducts = useMemo(
    () => ({
      sticks,
      studySticks,
      personCount,
    }),
    [sticks, studySticks, personCount],
  )

  useEffect(() => {
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts))
    localStorage.setItem(
      'additionalProducts',
      JSON.stringify(additionalProducts),
    )
    localStorage.setItem('voucher', JSON.stringify(voucher))
  }, [selectedProducts, additionalProducts, voucher])

  const calculateDiscountedPrice = useCallback(
    (price: number, discounts: Record<number, string>, quantity: number) => {
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
    },
    [],
  )

  const addProduct = useCallback(
    (product: Product, count?: number) => {
      const delta = count ? count : 1
      if (selectedProducts[product.id]) {
        setSelectedProducts((prevState) => {
          return {
            ...prevState,
            [product.id]: {
              ...prevState[product.id],
              count: prevState[product.id].count + delta,
            },
          }
        })
      } else {
        setSelectedProducts((prevState) => {
          return {
            ...prevState,
            [product.id]: {
              count: delta,
              product,
            },
          }
        })
      }
    },
    [selectedProducts],
  )

  const deleteProduct = useCallback((product: Product) => {
    setSelectedProducts((prevState) => {
      const newState = { ...prevState }
      delete newState[product.id]
      return newState
    })
  }, [])

  const clearProductList = useCallback(() => {
    setSelectedProducts({})
  }, [])

  const removeProduct = useCallback(
    (product: Product) => {
      if (selectedProducts[product.id]?.count > 1) {
        setSelectedProducts((prevState) => {
          return {
            ...prevState,
            [product.id]: {
              ...prevState[product.id],
              count: prevState[product.id].count - 1,
            },
          }
        })
      } else {
        deleteProduct(product)
      }
    },
    [deleteProduct, selectedProducts],
  )

  const isProductAdded = useCallback(
    (product: Product) => {
      return Boolean(selectedProducts[product.id])
    },
    [selectedProducts],
  )

  const totalWeight = useMemo(() => {
    return Object.values(selectedProducts).reduce((acc, item) => {
      return acc + item.product.weight * item.count
    }, 0)
  }, [selectedProducts])

  const totalPrice = useMemo(() => {
    // temporary
    const discount = {
      id: 1,
      discountPerQuantity: {
        1: '0.1',
        5: '0.3',
        10: '0.5',
      },
    }

    return Object.values(selectedProducts).reduce((acc, item) => {
      /* if (item.product.discount) {
      return acc + calculateDiscountedPrice(item.product.price,item.product.discount,item.count)
      } else { */

      //* temporary
      if (discount) {
        return (
          acc +
          calculateDiscountedPrice(
            item.product.price,
            discount.discountPerQuantity,
            item.count,
          )
        )
      }
      return acc + item.product.price * item.count
      /* } */
    }, 0)
  }, [selectedProducts, calculateDiscountedPrice])

  const contextValue = useMemo(
    () => ({
      products: Object.values(selectedProducts).map((item) => ({
        ...item.product,
        count: item.count,
      })),

      totalWeight,
      totalPrice,
      productsCount: Object.values(selectedProducts).length,
      personCount,
      sticks,
      studySticks,
      voucher,
    }),
    [selectedProducts, personCount, sticks, studySticks, voucher],
  )

  const contextDispatchValue = useMemo(
    () => ({
      addProduct,
      removeProduct,
      deleteProduct,
      isProductAdded,
      setPersonCount,
      setSticks,
      clearProductList,
      setStudySticks,
      setVoucher,
      calculateDiscountedPrice,
    }),
    [
      addProduct,
      deleteProduct,
      removeProduct,
      isProductAdded,
      setPersonCount,
      setSticks,
      clearProductList,
      setStudySticks,
      setVoucher,
      calculateDiscountedPrice,
    ],
  )

  return (
    <BasketContext.Provider value={contextValue}>
      <ProductsDispatchContext.Provider value={contextDispatchValue}>
        {children}
      </ProductsDispatchContext.Provider>
    </BasketContext.Provider>
  )
}

export { useBasketContext, useBasketDispatchContext, BasketProvider }
