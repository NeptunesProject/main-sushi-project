import {
  Center,
  Image,
  Link,
} from '@chakra-ui/react'
import phone from 'assets/icons/phone.svg'

const PhoneCall = () => {
  return (
    <Center
      cursor="pointer"
      boxSize={77}
      borderTopLeftRadius={10}
      borderBottomLeftRadius={10}
      boxShadow="2px 7px 11px rgba(0,0,0,.28)"
      pos="relative"
      bgColor="gray.800"
    >
      <Link href="tel:+404112">
        <Image src={phone} w={'31px'} h={'31px'} />
      </Link>
    </Center>
  )
}

export default PhoneCall
