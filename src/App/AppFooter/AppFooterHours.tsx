import { Flex, Text } from '@chakra-ui/react'
import FooterTitle from 'ui/FooterTitle'

const AppFooterHours = () => {
  return (
    <Flex flexDir="column" gap={2}>
      <FooterTitle>Godziny pracy:</FooterTitle>

      <Flex flexDir="column">
        <Text as="span">Poniedziałek-Czwartek 16:00-2:30</Text>
      </Flex>
    </Flex>
  )
}

export default AppFooterHours
