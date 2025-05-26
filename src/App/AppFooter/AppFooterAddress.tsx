import { Flex, Text, Link } from '@chakra-ui/react'
import FooterTitle from 'ui/FooterTitle'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import FooterLink from "../../ui/FooterLink";

const AppFooterAddress = () => {
  const { t } = useTranslation()
  return (
    <Flex flexDir="column" gap={2}>
      <FooterTitle>{t('footer.address.title')}:</FooterTitle>

      <Flex flexDir="column">
        <Text as="span">Warsaw, Mokotov</Text>
        <Text as="span">Dolna 41, 00-773</Text>
      </Flex>
        <FooterLink to="/regulamin">{t('footer.reglamentLink')}</FooterLink>
    </Flex>
  )
}

export default AppFooterAddress
