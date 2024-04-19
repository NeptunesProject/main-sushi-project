import { chakra, Flex } from '@chakra-ui/react'
import 'i18n/config'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../../constants/index'

const MainNavLink = chakra(NavLink, {
  baseStyle: {
    fontSize: 16,
    transition: 'all 0.2s',
    fontWeight: 800,
    letterSpacing: '.35px',
    color: '#343330',

    _hover: {
      color: 'gray.300',
    },
    _activeLink: {
      color: 'gray.600',
    },
  },
})


const NavBar = () => {
  const { t } = useTranslation()
  return (
    <Flex align="center" 
    gap={{ base: 5, xl: 8 }}>
      {NAV_LINKS.map((route: string, idx: number) => (
        <MainNavLink to={route} key={`navbar.${idx}`} fontWeight={600}>
          {t(`navbar.${idx}`)}
        </MainNavLink>
      ))}
    </Flex>
  )
}

export default NavBar
