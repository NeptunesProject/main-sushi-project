import { Link, Image, Flex } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import logo from '@/assets/img/logo.svg'
import companyLogo from '@/assets/img/companyLogo.svg'

const Logo = () => {
  return (
    <Link to="/" as={RouterLink}>
      <Flex flexDir={"column"} alignItems={"center"}>
        {/* <Image src={logo} w={{ base: "60%", xl: 'auto' }} /> */}
        <Image
          src={logo}
          w={{ base: '256px', xl: 'auto' }}
          h={{ base: '67px', xl: 'auto' }}
        />
        {/* <Image src={companyLogo} w={{ base: "60%", xl: 'auto' }} /> */}
        <Image
          src={companyLogo}
          w={{ base: '96px', xl: 'auto' }}
          h={{ base: '88px', xl: 'auto' }}
        />
      </Flex>
    </Link>
  )
}

export default Logo
