import { Link, Image, Flex } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import logo from '@/assets/img/logo.svg'
import companyLogo from '@/assets/img/companyLogo.svg'

const Logo = () => {
  return (
    <Link to="/" as={RouterLink} h="100%">
      <Flex  alignItems={"center"}>
        {/* <Image src={logo} w={{ base: "60%", xl: 'auto' }} /> */}
        <Image
          src={companyLogo}
          w={{ base: '78px', xl: 'auto' }}
          // h={{ base: '88px', xl: 'auto' }}
        />
        <Image
          src={logo}
          w={{ base: '190px', xl: 'auto' }}
          h={{ base: '49px', xl: 'auto' }}
        />
        {/* <Image src={companyLogo} w={{ base: "60%", xl: 'auto' }} /> */}
       
      </Flex>
    </Link>
  )
}

export default Logo
