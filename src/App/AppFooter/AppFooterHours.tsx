import { Flex, Text } from '@chakra-ui/react'
import FooterTitle from 'ui/FooterTitle'

const AppFooterHours = () => {
  return (
    <Flex flexDir="column" gap={2}>
      <FooterTitle>Working hours:</FooterTitle>

      <Flex flexDir="column">
        <Text as="span">Mon-Thu 12:00-22:00</Text>
        <Text as="span">Fri-Sun 12:00-23:00</Text>
      </Flex>
    </Flex>
  )
}

export default AppFooterHours
