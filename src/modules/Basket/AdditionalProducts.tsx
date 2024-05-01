import { Flex, Text } from '@chakra-ui/react'
import {
  CountButtonBasketDec,
  CountButtonBasketInc,
} from '../../ui/CountButton'
import { useDispatch, useSelector } from 'react-redux'
import { selectPersonCount, selectStudySticks } from 'redux/products/selectors'
import { AppDispatch } from 'types'
import { setPersonCount, setStudySticks } from 'redux/products/ProductsSlice'

const AdditionalProducts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const personCount = useSelector(selectPersonCount)
  const studySticks = useSelector(selectStudySticks)

  const handlePersonCountDecrement = () => {
    if (personCount > 1) {
      dispatch(setPersonCount(-1))
    }
  }

  const handlePersonCountIncrement = () => {
    dispatch(setPersonCount(+1))
  }

  const handleStudySticksDecrement = () => {
    if (studySticks > 0) {
      dispatch(setStudySticks(-1))
    }
  }

  const handleStudySticksIncrement = () => {
    dispatch(setStudySticks(+1))
  }

  return (
    <Flex flexDir="column" fontWeight={600} gap={'5px'}>
      <Flex w="100%" alignItems={'center'} gap={'75px'}>
        <Text
          fontSize={16}
          fontWeight={400}
          color={'#002034'}
          lineHeight={'24px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
        >
          Number of people
        </Text>

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
          <CountButtonBasketDec
            borderRightRadius={5}
            borderLeftRadius={5}
            onClick={handlePersonCountDecrement}
          >
            -
          </CountButtonBasketDec>

          <Text
            fontSize={16}
            fontWeight={400}
            fontFamily={'Rubik'}
            lineHeight={'24px'}
            color={'#002034'}
            fontStyle={'normal'}
          >
            {personCount}
          </Text>

          <CountButtonBasketInc
            borderRightRadius={5}
            borderLeftRadius={5}
            onClick={handlePersonCountIncrement}
          >
            +
          </CountButtonBasketInc>
        </Flex>
      </Flex>

      <Flex w="100%" alignItems={'center'} gap={'20px'}>
        <Text
          fontSize={16}
          fontWeight={400}
          color={'#002034'}
          lineHeight={'24px'}
          fontFamily={'Rubik'}
          fontStyle={'normal'}
        >
          Number of training sticks
        </Text>

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
          <CountButtonBasketDec
            borderLeftRadius={5}
            borderRightRadius={5}
            onClick={handleStudySticksDecrement}
          >
            -
          </CountButtonBasketDec>

          <Text
            fontSize={16}
            fontWeight={400}
            fontFamily={'Rubik'}
            lineHeight={'24px'}
            color={'#002034'}
            fontStyle={'normal'}
          >
            {studySticks}
          </Text>

          <CountButtonBasketInc
            borderRightRadius={5}
            borderLeftRadius={5}
            onClick={handleStudySticksIncrement}
          >
            +
          </CountButtonBasketInc>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default AdditionalProducts
