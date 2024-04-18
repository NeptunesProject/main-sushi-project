import { Box, Flex} from '@chakra-ui/react'
import Logo from 'components/Logo'
import LanguageSelect from './LanguageSelect'
import Place from './Place'

const AppHeaderSm = () => {
  return (
    <Flex align="center" py={6} px={2.5} justify="space-between" w="100%">
      <Box w="33.3%">
        <Logo />
      </Box>

      <Flex align="center" justify="center" gap={3} w="33.3%">
        <LanguageSelect />
        <Place />
      </Flex>

      <Flex w="33.3%" justify="end">
      </Flex>
    </Flex>
  )
}

export default AppHeaderSm
