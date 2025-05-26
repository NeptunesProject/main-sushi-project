import { Flex, Link } from '@chakra-ui/react'
import FooterLink from 'ui/FooterLink'
import FooterTitle from 'ui/FooterTitle'

const AppFooterContacts = () => {
  return (
    <Flex flexDir="column" gap={2}>
      <FooterTitle>Przyjmowanie zamówień:</FooterTitle>

      <Flex flexDir="column">
        <FooterLink
          as={Link}
          color="white"
          _hover={{
            textDecoration: 'none',
            color: 'blue.100',
          }}
          href="tel:+48517102069"
        >
          +48517102069
        </FooterLink>
        <FooterLink
          as={Link}
          color="white"
          _hover={{
            textDecoration: 'none',
            color: 'blue.100',
          }}
          href="mailto:neptunessushi@gmail.com"
        >
          neptunessushi@gmail.com
        </FooterLink>
      </Flex>
    </Flex>
  )
}

export default AppFooterContacts
