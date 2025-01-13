import { Container, Divider, Flex, useMediaQuery } from '@chakra-ui/react'
import AppFooterMedia from './AppFooterMedia'
import AppFooterCopyright from './AppFooterCopyright'
import AppFooterInfo from './AppFooterInfo'

const AppFooter = () => {
  const [isLargerThan700] = useMediaQuery('(min-height: 700px)')

  return (
    <Container as="footer" maxW="100%" display="flex" px={0}>
      <Flex
        flexDir="column"
        gap={isLargerThan700 ? 6 : 3}
        flexWrap="wrap"
        align="center"
        justify="space-between"
        width="100%"
        bg="cyanBlue.800"
        pt={isLargerThan700 ? 6 : 2}
        pb={isLargerThan700 ? 4 : 2}
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
