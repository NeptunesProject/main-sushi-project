import AnimatedAppearance from '../components/AnimatedAppearance'
import { Box, Flex, Link, Image, Center } from '@chakra-ui/react'
import AppHeader from './AppHeader'
import Routes from '../router/Routes'
import AppFooter from './AppFooter'
// import ImagesLayout from '../components/ImagesLayout'
import AppSidebar from './AppSidebar'
import AppMedia from './AppMedia'
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
          {/* absolute blocks */}
          {/* <ImagesLayout /> */}
          <Box
            w={{ base: '100%', lg: 'auto' }}
            pos="fixed"
            top={{ base: 'none', lg: '20' }}
            bottom={{ base: 0, lg: 'none' }}
            overflowX="scroll"
          >
            <AppSidebar />
          </Box>
          {/* <Box pos="fixed" bottom="20%" right={0}>
            <AppMedia />
          </Box> */}
          <Box pos="fixed" top={300} right={0}>
            <Basket />
          </Box>
          <Box pos="fixed" top={400} right={0}>
           <PhoneCall/>
          </Box>
        </BasketProvider>
      </Flex>
    </AnimatedAppearance>
  )
}

export default AppContainer
