import { Flex } from '@chakra-ui/react'
import FooterLink from '../../ui/FooterLink'
import { useTranslation } from 'react-i18next'

const AppFooterNav = () => {
  const { t } = useTranslation()
  return (
    <Flex flexDir="column" gap={1}>
      <FooterLink to="/politika">{t('footer.logo.politika')}</FooterLink>
      <FooterLink to="/regulamin">{t('footer.logo.statute')}</FooterLink>
      <FooterLink to="/support">Support</FooterLink>
    </Flex>
  )
}

export default AppFooterNav
