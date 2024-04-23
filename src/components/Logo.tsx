import { Link, Image, Flex, useMediaQuery } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import companyLogo from '@/assets/img/companyLogo.svg'

const Logo = () => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  return (
    <Link to="/" as={RouterLink}  _hover="none">
      <Flex alignItems={'center'} justifyItems={"flex-start"}>
        <Image src={companyLogo} 
        w={isLargerThan768 ? "55px" : "40px"} />
        <Flex flexDir={'column'} alignItems={'center'}>
          <h1
            style={{
              whiteSpace: "nowrap",
              fontSize: isLargerThan768 ? '36px' : '20px',
              marginBottom: -8,
            }}
          >
            NEPTUNES
          </h1>
          <h1
            style={{
              fontSize: isLargerThan768 ? '12px' : '8px',
            }}
          >
            SUSHI DELIVERY
          </h1>
        </Flex>
      </Flex>
    </Link>
  )
}

export default Logo
