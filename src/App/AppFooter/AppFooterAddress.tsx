import { Flex, Text } from '@chakra-ui/react'
import FooterTitle from 'ui/FooterTitle'
import { useTranslation } from 'react-i18next'

const AppFooterAddress = () => {
  const { t } = useTranslation()
  return (
    <Flex flexDir="column" gap={2}>
      <FooterTitle>{t('footer.address.title')}:</FooterTitle>

      <Flex flexDir="column">
        <Text as="span">Warsaw, Mokotov</Text>
        <Text as="span">Dolna 41, 00-773</Text>
      </Flex>
    </Flex>
  )
}

export default AppFooterAddress
