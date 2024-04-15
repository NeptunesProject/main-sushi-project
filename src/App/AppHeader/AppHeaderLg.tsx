import { Flex, Image, Link } from '@chakra-ui/react'
import Logo from 'components/Logo'
import NavBar from './NavBar'
import LanguageSelect from './LanguageSelect'
import Place from './Place'
import WorkHours from './WorkHours'
import phone from 'assets/img/phone.svg'

const AppHeaderLg = () => {
  return (
    <Flex
      align="end"
      pt={2}
      pb={2}
      px={2.5}
      justifyContent="space-between"
      alignItems="center"
    >
      <Logo />

      <Flex gap={{ base: 5, xl: 16 }}>
        <NavBar />

        <Flex align="center" justify="space-between" gap={{ base: 5, xl: 16 }}>
          <LanguageSelect />
          <Place />
          <Flex align="start" gap={5}>
            <WorkHours />
            <Link href="tel:+404112">
              <Image src={phone} />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default AppHeaderLg
