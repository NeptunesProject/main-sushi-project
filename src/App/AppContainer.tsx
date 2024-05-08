import AnimatedAppearance from '../components/AnimatedAppearance'
import { Box, Flex } from '@chakra-ui/react'
import AppHeader from './AppHeader'
import Routes from '../router/Routes'
import AppFooter from './AppFooter'
import Basket from 'modules/Basket'
import { BasketProvider } from '../contexts/BasketContext'
import PhoneCall from 'modules/PhoneCall/PhoneCall'

const AppContainer = () => {
  return (
    <AnimatedAppearance>
      <Flex flexDir="column" minH="100vh" pos="relative">
        <BasketProvider>
          <AppHeader />
          <Box as="main" flex="1 0 auto">
            <Routes />
          </Box>
          <AppFooter />
          <Box
            w={{ base: '100%', lg: 'auto' }}
            pos="fixed"
            top={{ base: 'none', lg: '20' }}
            bottom={{ base: 0, lg: 'none' }}
            overflowX="scroll"
          ></Box>
          <Box pos="fixed" top={327} right={0}>
            <Basket />
          </Box>
          <Box pos="fixed" top={400} right={0}>
            <PhoneCall />
          </Box>
        </BasketProvider>
      </Flex>
    </AnimatedAppearance>
  )
}

export default AppContainer
