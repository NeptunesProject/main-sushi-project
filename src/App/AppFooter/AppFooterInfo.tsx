import { Flex, useMediaQuery } from '@chakra-ui/react'
import AppFooterNav from './AppFooterNav'
import AppFooterAddress from './AppFooterAddress'
import AppFooterHours from './AppFooterHours'
import AppFooterContacts from './AppFooterContacts'

const AppFooterInfo = () => {
  const [isLessThan768] = useMediaQuery('(max-width: 768px)')

  return (
    <Flex
      gap={4}
      justify="space-around"
      w="85%"
      direction={isLessThan768 ? 'column' : 'row'}
    >
      <AppFooterNav />

      <AppFooterAddress />

      <AppFooterHours />

      <AppFooterContacts />
    </Flex>
  )
}

export default AppFooterInfo
