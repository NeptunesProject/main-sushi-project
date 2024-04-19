import { Flex, Text } from '@chakra-ui/react'
import FooterTitle from 'ui/FooterTitle'
import { useTranslation } from 'react-i18next'

const AppFooterAddress = () => {
  const { t } = useTranslation()
  return (
    <Flex flexDir="column" gap={2}>
      <FooterTitle>{t('footer.address.title')}:</FooterTitle>

      <Flex flexDir="column">
        <Text as="span">Warsaw, Chrystiana</Text>
        <Text as="span">Piotra Aignera 6, 00-710</Text>
      </Flex>
    </Flex>
  )
}

export default AppFooterAddress
