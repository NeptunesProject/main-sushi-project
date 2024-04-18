import { chakra, Flex } from '@chakra-ui/react'
import 'i18n/config'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../../constants/index'

const MainNavLink = chakra(NavLink, {
  baseStyle: {
    fontSize: 16,
    // lineHeight: 24,
    transition: 'all 0.2s',
    fontWeight: 800,
    letterSpacing: '.35px',
    // color: 'grey.100',
    color: '#343330',

    _hover: {
      // color: 'blue.100',
      color: 'gray.300',
    },
    _activeLink: {
      // color: 'turquoise.77',
      color: 'gray.600',
    },
  },
})


const NavBar = () => {
  const { t } = useTranslation()
  return (
    <Flex align="center" 
    // justify="space-between" 
    gap={{ base: 5, xl: 12 }}>
      {NAV_LINKS.map((route: string, idx: number) => (
        <MainNavLink to={route} key={`navbar.${idx}`} fontWeight={600}>
          {t(`navbar.${idx}`)}
        </MainNavLink>
      ))}
    </Flex>
  )
}

export default NavBar
