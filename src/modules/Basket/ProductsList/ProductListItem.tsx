import { SelectedProduct, AppDispatch } from 'types'
import { Box, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react'
import stubImg from 'assets/img/stub.jpg'
import closeIcon from 'assets/icons/delete.svg'
import { calculateDiscountedPrice } from '../OrderFuncs'
import { useDispatch } from 'react-redux'
import {
  setSelectedProductCount,
  deleteSelectedProduct,
} from 'redux/products/ProductsSlice'
import { DecBtn, IncBtn } from '../IncDecBtn'
import { useTranslation } from 'react-i18next'

interface Props {
  item: SelectedProduct
}

const ProductListItem = ({ item }: Props) => {
  let count: number = item.count
  const itemId: number = item.product.id
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language

  const getNameByTranslate = () => {
    switch (currentLanguage) {
      case 'en':
        return item.product.nameEn
      case 'ua':
        return item.product.nameUa
      case 'pl':
        return item.product.name
      case 'ru':
        return item.product.nameRu
      default:
        return item.product.name
    }
  }

  const dispatch = useDispatch<AppDispatch>()

  const handleCount = (id: number, count: number) => {
    dispatch(setSelectedProductCount({ id, count }))
  }

  const handleDelete = () => {
    dispatch(deleteSelectedProduct({ itemId }))
  }

  const increaseCount = () => {
    count = count + 1
    handleCount(itemId, count)
  }


  const decreaseCount = () => {
    if (count > 0) {
      count -= 1;
      handleCount(itemId, count);
    }
    if (count === 0) {
      dispatch(deleteSelectedProduct({ id: item.product.id }));
    }
  };

    const isDiscounted = Boolean(item.product.discount)

  const discountedPrice =
      isDiscounted &&
      calculateDiscountedPrice(
          item.product.price,
          item.product.discount.discountPerQuantity,
          item.count,
      )

  const finalDiscountedPrice = typeof discountedPrice === 'number' ? discountedPrice : 0;

  const totalDiscountedPrice = Math.round(finalDiscountedPrice * item.count) ;

  const [isLessThan768] = useMediaQuery('(max-width: 768px)')

  return (
    <Flex
      align="center"
      justify="space-between"
      w="100%"
      color="blue.200"
      backgroundColor={'#ECECF5'}
      borderRadius={'9px'}
      // pr={"16px"}
      boxSizing="border-box"
    >
      <Flex flex={'0 0 23%'}>
        <Image
          src={item.product.img}
          // w={isLessThan768 ? "150px" : 'auto'}
          // maxW={isLessThan768 ? "70px" : 'auto'}
          objectFit={'cover'}
          // height={"auto"}
          // maxHeight={"92px"}
          // fallback={<Image boxSize={19} src={stubImg} />}
          fallback={<Image src={stubImg}/>}
          overflow={'hidden'}
          borderLeftRadius={'9px'}
          // width={'100px'}
        />
      </Flex>

      <Flex flexDir={'column'} flex={'0 0 45%'} pl={isLessThan768 ? '' : ''}>
        <Text
          fontSize={isLessThan768 ? "0.62rem" : "0.83rem"}
          lineHeight={isLessThan768 ? '' : ''}
          fontWeight={400}
          fontFamily={'Rubik'}
          color={'#002034'}
          fontStyle={'normal'}
          maxW="91%"
        >
          {getNameByTranslate()}
        </Text>
        <Text
          fontSize={isLessThan768 ? "0.62rem" : "0.83rem"}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
          fontWeight={400}
          lineHeight={isLessThan768 ? '0.93rem' : '21px'}
          color={'#9090A4'}
          maxW="91%"
        >
          {item.product.size * item.count} szt.
        </Text>
        <Flex>
          <Flex align="center" gap="8px">
            <Text
                fontSize={isLessThan768 ? '0.72rem' : "0.83rem"}
                minW={10}
                fontWeight={400}
                decoration={isDiscounted ? 'line-through' : 'none'}
                lineHeight={isLessThan768 ? '1.09rem' : '24px'}
                color={'#002034'}
                fontFamily={'Rubik'}
                maxW="91%"

            >
              {item.product.price * item.count} zł
            </Text>

            {isDiscounted && (
                <Text
                    color="#9090A4"
                    fontWeight={400}
                    fontSize={16}
                    p="2px"
                    fontFamily={'Rubik'}
                >
                  {totalDiscountedPrice} zł
                </Text>
            )}
          </Flex>
        </Flex>
      </Flex>

      <Flex align="center" gap={3} flex={'0 0 30%'}>
        <Flex
          align="center"
          gap={2}
          backgroundColor={'#FFFFFF'}
          overflow={'hidden'}
          borderRightRadius={5}
          borderLeftRadius={5}
          borderColor={'#B7B7B7'}
          borderWidth={'1px'}
        >
          <DecBtn onClick={decreaseCount} text={'-'}></DecBtn>
          <Text
            fontSize={isLessThan768 ? 13 : "0.83rem"}
            fontWeight={400}
            fontFamily={'Rubik'}
            lineHeight={isLessThan768 ? '14px' : '24px'}
            color={'#002034'}
            fontStyle={'normal'}
          >
            {item.count}
          </Text>
          <IncBtn onClick={increaseCount} text={'+'} ></IncBtn>
        </Flex>
        <Image cursor="pointer" src={closeIcon} onClick={handleDelete} w={'10px'}/>
      </Flex>
    </Flex>
  )
}

export default ProductListItem
