import { Flex, Text } from '@chakra-ui/react'
import { CountButton } from '../../ui/CountButton'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectPersonCount,
  selectSticks,
  selectStudySticks,
} from 'redux/products/selectors'
import { AppDispatch } from 'types'
import {
  setPersonCount,
  setSticks,
  setStudySticks,
} from 'redux/products/ProductsSlice'

const AdditionalProducts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const personCount = useSelector(selectPersonCount)
  const sticks = useSelector(selectSticks)
  const studySticks = useSelector(selectStudySticks)

  const handlePersonCountDecrement = () => {
    if (personCount > 1) {
      dispatch(setPersonCount(-1))
    }
  }

  const handlePersonCountIncrement = () => {
    dispatch(setPersonCount(+1))
  }

  const handleSticksDecrement = () => {
    if (sticks > 0) {
      dispatch(setSticks(-1))
    }
  }

  const handleSticksIncrement = () => {
    dispatch(setSticks(+1))
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
    <Flex flexDir="column" fontWeight={600} gap={3}>
      <Flex w="100%" justify="space-between">
        <Text>Кількість персон</Text>

        <Flex align="center" gap={2}>
          <CountButton
            borderLeftRadius={20}
            borderRightRadius={5}
            onClick={handlePersonCountDecrement}
          >
            -
          </CountButton>

          <Text fontSize={12} fontWeight={600}>
            {personCount}
          </Text>

          <CountButton
            borderRightRadius={20}
            borderLeftRadius={5}
            onClick={handlePersonCountIncrement}
          >
            +
          </CountButton>
        </Flex>
      </Flex>

      <Flex w="100%" justify="space-between">
        <Text>Кількість паличок</Text>

        <Flex align="center" gap={2}>
          <CountButton
            borderLeftRadius={20}
            borderRightRadius={5}
            onClick={handleSticksDecrement}
          >
            -
          </CountButton>

          <Text fontSize={12} fontWeight={600}>
            {sticks}
          </Text>

          <CountButton
            borderRightRadius={20}
            borderLeftRadius={5}
            onClick={handleSticksIncrement}
          >
            +
          </CountButton>
        </Flex>
      </Flex>
      <Flex w="100%" justify="space-between">
        <Text>Кількість навчальних паличок</Text>

        <Flex align="center" gap={2}>
          <CountButton
            borderLeftRadius={20}
            borderRightRadius={5}
            onClick={handleStudySticksDecrement}
          >
            -
          </CountButton>

          <Text fontSize={12} fontWeight={600}>
            {studySticks}
          </Text>

          <CountButton
            borderRightRadius={20}
            borderLeftRadius={5}
            onClick={handleStudySticksIncrement}
          >
            +
          </CountButton>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default AdditionalProducts
