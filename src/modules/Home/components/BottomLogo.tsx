import { Link, Image, Flex } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import logo from '@/assets/img/logo.svg'

const BottomLogo = () => {
  return (
    <Flex flexDir={'column'} alignItems={'center'}>
      <Link to="/" as={RouterLink}>
        <Image
          src={logo}
          w={{ base: '256px', xl: 'auto' }}
          h={{ base: '67px', xl: 'auto' }}
        />
      </Link>
    </Flex>
  )
}

export default BottomLogo
