import { Box, Flex} from '@chakra-ui/react'
import Logo from 'components/Logo'
import NavBar from './NavBar'
import LanguageSelect from './LanguageSelect'
import Place from './Place'

const AppHeaderLg = () => {
  return (
    <Flex
      align="center"
      // pt={2}
      pt={4}
      // pb={2}
      px={2.5}
      alignItems="center"
      justifyContent="center"
      w="100%"
      h={129}
      // gap={{ base: 5, xl: 16 }}
    >
      <Box position={"fixed"}  left={10} zIndex={10}>
      {/* <Box> */}
        <Logo/>
      </Box>
      <NavBar />
      <Flex align="center" justify="space-between" 
      // gap={{ base: 5, xl: 16 }} 
      gap={5} 
      ml={4}>
        <Place />
        <LanguageSelect />
      </Flex>
    </Flex>
  )
}

export default AppHeaderLg
