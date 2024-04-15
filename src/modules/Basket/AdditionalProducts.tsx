import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import CountButton from '../../ui/CountButton'
import {
  useBasketContext,
  useBasketDispatchContext,
} from 'contexts/BasketContext'

const AdditionalProducts = () => {
  const { personCount, sticks, studySticks } = useBasketContext()
  const { setPersonCount, setSticks, setStudySticks } =
    useBasketDispatchContext()

  const handlePersonCountDecrement = () => {
    if (personCount > 1) {
      setPersonCount(personCount - 1)
    }
  }

  const handlePersonCountIncrement = () => {
    setPersonCount(personCount + 1)
  }

  const handleSticksDecrement = () => {
    if (sticks > 0) {
      setSticks(sticks - 1)
    }
  }

  const handleSticksIncrement = () => {
    setSticks(sticks + 1)
  }

  const handleStudySticksDecrement = () => {
    if (studySticks > 0) {
      setStudySticks(studySticks - 1)
    }
  }

  const handleStudySticksIncrement = () => {
    setStudySticks(studySticks + 1)
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
