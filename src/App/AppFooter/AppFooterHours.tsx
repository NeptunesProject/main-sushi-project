import { Flex, Text } from '@chakra-ui/react'
import FooterTitle from 'ui/FooterTitle'

const AppFooterHours = () => {
  return (
    <Flex flexDir="column" gap={2}>
      <FooterTitle>Godziny pracy:</FooterTitle>

      <Flex flexDir="column">
        <Text as="span">Poniedziałek-Czwartek 12:00-22:00</Text>
        <Text as="span">Piątek-Niedziela 12:00-23:00</Text>
      </Flex>
    </Flex>
  )
}

export default AppFooterHours
