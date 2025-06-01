import { Flex, Text, Link } from '@chakra-ui/react'
import FooterTitle from 'ui/FooterTitle'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import FooterLink from "../../ui/FooterLink";

const AppFooterDocs = () => {
  const { t } = useTranslation()
  return (
    <Flex flexDir="row" gap={6}>
        <FooterLink to="/regulamin">{t('footer.reglamentLink')}</FooterLink>
        <FooterLink to="/privacy">{t('footer.privacyLink')}</FooterLink>
    </Flex>
  )
}

export default AppFooterDocs
