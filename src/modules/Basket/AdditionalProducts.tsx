import { Flex, Text, useMediaQuery } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPersonCount, selectStudySticks } from 'redux/products/selectors'
import { AppDispatch } from 'types'
import { setPersonCount, setStudySticks } from 'redux/products/ProductsSlice'
import { DecBtn, IncBtn } from './IncDecBtn'

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

  const [isLessThan768] = useMediaQuery('(max-width: 768px)')

  return (
    <Flex flexDir="column" fontWeight={600} gap={'5px'}>
      <Flex
        w="100%"
        alignItems={'center'}
        justifyContent={'space-between'}
        pr={isLessThan768 ? '20px' : '40px'}
      >
        <Text
          fontSize={isLessThan768 ? 14 : 16}
          fontWeight={400}
          color={'#002034'}
          lineHeight={isLessThan768 ? '21px' : '24px'}
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
          <DecBtn onClick={handlePersonCountDecrement} text={'-'}></DecBtn>

          <Text
            fontSize={isLessThan768 ? 13 : 16}
            fontWeight={400}
            fontFamily={'Rubik'}
            lineHeight={isLessThan768 ? '20px' : '24px'}
            color={'#002034'}
            fontStyle={'normal'}
            minWidth={isLessThan768 ? '20px' : '20px'}
            textAlign={'center'}
          >
            {personCount}
          </Text>
          <IncBtn onClick={handlePersonCountIncrement} text={'+'}></IncBtn>
        </Flex>
      </Flex>

      <Flex
        w="100%"
        alignItems={'center'}
        justifyContent={'space-between'}
        pr={isLessThan768 ? '20px' : '40px'}
      >
        <Text
          fontSize={isLessThan768 ? 14 : 16}
          fontWeight={400}
          color={'#002034'}
          lineHeight={isLessThan768 ? '21px' : '24px'}
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
          <DecBtn onClick={handleStudySticksDecrement} text={'-'}></DecBtn>

          <Text
            fontSize={isLessThan768 ? 13 : 16}
            fontWeight={400}
            fontFamily={'Rubik'}
            lineHeight={isLessThan768 ? '20px' : '24px'}
            color={'#002034'}
            fontStyle={'normal'}
            minWidth={isLessThan768 ? '20px' : '20px'}
            textAlign={'center'}
          >
            {studySticks}
          </Text>
          <IncBtn onClick={handleStudySticksIncrement} text={'+'}></IncBtn>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default AdditionalProducts
