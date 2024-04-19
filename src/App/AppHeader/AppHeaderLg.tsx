import { Box, Flex} from '@chakra-ui/react'
import Logo from 'components/Logo'
import NavBar from './NavBar'
import LanguageSelect from './LanguageSelect'
import Place from './Place'

const AppHeaderLg = () => {
  return (
    <Flex
      align="center"
      pt={4}
      px={2.5}
      alignItems="center"
      justifyContent="center"
      w="100%"
      h={129}
    >
      <Box position={"fixed"}  left={10} zIndex={10}>
        <Logo/>
      </Box>
      <NavBar />
      <Flex alignItems="center" justify="space-between" 
      gap={5} 
      ml={4}>
        <Place />
        <LanguageSelect />
      </Flex>
    </Flex>
  )
}

export default AppHeaderLg
