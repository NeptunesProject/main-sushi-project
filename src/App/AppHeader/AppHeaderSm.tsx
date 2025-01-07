import { chakra, Flex } from '@chakra-ui/react'
import Logo from 'components/Logo'
import Place from './Place'
import Burger from './Burger'

import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../../constants/index'
import 'i18n/config'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import LanguageSelect from './LanguageSelect'

const MainNavLink = chakra(NavLink, {
  baseStyle: {
    fontSize: 16,
    transition: 'all 0.2s',
    fontWeight: 400,
    letterSpacing: '.35px',
    color: '#343330',
    fontFamily: 'Rubik',
    p: '6px',
    alignSelf: 'end',

    _hover: {
      color: 'gray.300',
    },
    _activeLink: {
      color: 'gray.600',
    },
  },
})

const AppHeaderSm = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Flex py={6} justifyContent="space-between">
        <Logo />
        <Place />
        <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
      </Flex>

      {isOpen && (
        <Flex flexDir="column" alignSelf="end">
          {NAV_LINKS.map((route: string, idx: number) => (
            <MainNavLink to={route} key={`navbar.${idx}`}>
              {t(`navbar.${idx}`)}
            </MainNavLink>
          ))}
          <Flex alignSelf="end" pb={2}>
            <LanguageSelect text={'Select Language'} />
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default AppHeaderSm
