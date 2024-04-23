import { Box, Flex} from '@chakra-ui/react'
import Logo from 'components/Logo'
import NavBar from './NavBar'
import LanguageSelect from './LanguageSelect'
import Place from './Place'

const AppHeaderLg = () => {
  return (
    <Flex
      align="center"
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      h="64px"
      px="75px"
      py="8px"
    >
      <Box >
        <Logo/>
      </Box>
      <NavBar />
      <Flex alignItems="center" justify="space-between" 
      gap="24px" 
>
        <Place />
        <LanguageSelect />
      </Flex>
    </Flex>
  )
}

export default AppHeaderLg
