import React, { useState } from 'react'
import { Flex, useBreakpointValue, chakra, Container } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Logo from 'components/Logo'
import Place from './Place'
import Burger from './Burger'
import LanguageSelect from './LanguageSelect'
import { NAV_LINKS } from '../../constants/index'
import NavBar from './NavBar'

const MainNavLink = chakra(NavLink, {
  baseStyle: {
    fontSize: 16,
    transition: 'all 0.2s',
    fontWeight: 400,
    letterSpacing: '.35px',
    color: '#343330',
    fontFamily: 'Rubik',
    p: '6px',
    _hover: {
      color: 'gray.300',
    },
    _activeLink: {
      color: 'gray.600',
    },
  },
})

const AppHeader = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const isLargerScreen = useBreakpointValue({ base: false, lg: true })

  const stickyStyle = {
    top: 0,
    zIndex: 1000,
    backgroundColor: 'white',
    borderBottom: '1px solid #b8b9ba',
  }

  return (
    <Container pos="fixed" as="header" maxWidth="100%" style={stickyStyle}>
      <Flex
        align="center"
        justifyContent="space-between"
        w="100%"
        h="64px"
        px={{ base: 0, lg: '75px' }}
        py={{ base: 0, lg: '8px' }}
      >
        <Logo />
        {isLargerScreen ? (
          <>
            <NavBar />
            <Flex alignItems="center" gap="24px">
              <Place />
              <LanguageSelect />
            </Flex>
          </>
        ) : (
          <>
            <Place />
            <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
          </>
        )}
      </Flex>
      {!isLargerScreen && isOpen && (
        <Flex flexDir="column" alignItems={'flex-end'}>
          {NAV_LINKS.map((route, idx) => (
            <MainNavLink to={route} key={`navbar.${idx}`}>
              {t(`navbar.${idx}`)}
            </MainNavLink>
          ))}
          <Flex pb={2}>
            <LanguageSelect text={'Select Language'} />
          </Flex>
        </Flex>
      )}
    </Container>
  )
}

export default AppHeader
