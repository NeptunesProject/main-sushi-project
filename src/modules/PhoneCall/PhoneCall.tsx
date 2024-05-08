import { Center, Image, Link } from '@chakra-ui/react'
import phone from 'assets/icons/phone.svg'

const PhoneCall = () => {
  return (
    <Center
      cursor="pointer"
      boxSize="48px"
      borderTopLeftRadius={10}
      borderBottomLeftRadius={10}
      boxShadow="2px 7px 11px rgba(0,0,0,.28)"
      pos="relative"
      bgColor="#002034"
    >
      <Link href="tel:+404112">
        <Image src={phone} w={'24px'} h={'24px'} />
      </Link>
    </Center>
  )
}

export default PhoneCall
