import { Container, Divider, Flex } from '@chakra-ui/react'
import AppFooterMedia from './AppFooterMedia'
import AppFooterCopyright from './AppFooterCopyright'
import AppFooterInfo from './AppFooterInfo'

const AppFooter = () => {
  return (
    <Container as="footer" maxW="100%" display="flex" px={0}>
      <Flex
        flexDir="column"
        gap={6}
        flexWrap="wrap"
        align="center"
        justify="space-between"
        width="100%"
        bg="cyanBlue.800"
        pt={6}
        pb={4}
        color="white"
      >
        <AppFooterMedia />

        <AppFooterInfo />

        <Divider color="gray.300" />

        <AppFooterCopyright />
      </Flex>
    </Container>
  )
}

export default AppFooter
