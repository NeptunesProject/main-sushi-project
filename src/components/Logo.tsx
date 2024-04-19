import { Link, Image, Flex } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import companyLogo from '@/assets/img/companyLogo.svg'

const Logo = () => {
  return (
    <Link to="/" as={RouterLink} h="100%" _hover="none">
      <Flex  alignItems={"center"}>
        <Image
          src={companyLogo}
          // w={{ base: '55px', xl: 'auto' }}
          w='55px'
        />
        <Flex flexDir={"column"} alignItems={"center"}>
        <h1
          style={{
            width:'190px',
            height: "49px",
            fontSize: "36px",
            marginBottom: -8
          }}>
            NEPTUNES
            </h1>
            <h1 
            style={{
              fontSize: "12px",
              
            }}>
              SUSHI DELIVERY
            </h1>
        </Flex>
      </Flex>
    </Link>
  )
}

export default Logo
