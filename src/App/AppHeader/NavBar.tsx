import { chakra, Flex } from '@chakra-ui/react'
import 'i18n/config'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../../constants/index'

const MainNavLink = chakra(NavLink, {
  baseStyle: {
    fontSize: 16,
    transition: 'all 0.2s',
    fontWeight: 400,
    letterSpacing: '.35px',
    color: '#343330',
    fontFamily: "Rubik",
    p: "6px",

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
    gap="24px"
    px="81.5px">
      
      {NAV_LINKS.map((route: string, idx: number) => (
        <MainNavLink to={route} key={`navbar.${idx}`}>
          {t(`navbar.${idx}`)}
        </MainNavLink>
      ))}
    </Flex>
  )
}

export default NavBar
