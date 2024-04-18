import { Flex } from '@chakra-ui/react'
import AppFooterNav from './AppFooterNav'
import AppFooterAddress from './AppFooterAddress'
import AppFooterHours from './AppFooterHours'
import AppFooterContacts from './AppFooterContacts'

const AppFooterInfo = () => {
  return (
    <Flex gap={4} justify="space-around" w="85%">
      <AppFooterNav />

      <AppFooterAddress />

      <AppFooterHours />

      <AppFooterContacts />
    </Flex>
  )
}

export default AppFooterInfo
