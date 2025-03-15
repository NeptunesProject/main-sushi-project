import { chakra, Flex, Link } from '@chakra-ui/react'
import 'i18n/config'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { EXTERNAL_LINKS, NAV_LINKS } from '../../constants'

const MainNavLink = chakra(NavLink, {
  baseStyle: {
    fontSize: "0.83rem",
    transition: 'all 0.24s',
    fontWeight: 400,
    letterSpacing: '.35px',
    color: '#343331',
    fontFamily: "Rubik",
    p: "6px",

    _hover: {
      color: 'gray.300',
    },
    _activeLink: {
      color: 'blue.100',
    },
  },
})
export const ExternalLink = chakra(Link, {
  baseStyle: {
    fontSize: "0.83rem",
    transition: 'all 0.24s',
    fontWeight: 400,
    letterSpacing: '.35px',
    color: '#343331',
    fontFamily: "Rubik",
    p: "6px",

    _hover: {
      color: 'gray.300',
    },
  },
})

const NavBar = () => {
  const { t } = useTranslation()
  return (
    <Flex align="center"
    gap="24px"
    px="81.6px">
      {NAV_LINKS.map((route: string, idx: number) => (
        <MainNavLink to={route} key={`navbar.${idx}`}>
          {t(`navbar.${idx}`)}
        </MainNavLink>
      ))}
      {EXTERNAL_LINKS.map((route: string, idx: number) =>
        <ExternalLink href={route} isExternal key={`navbar.l${idx}`}>
          {t(`navbar.l${idx}`)}
        </ExternalLink>
      )}



    </Flex>
  )
}

export default NavBar
