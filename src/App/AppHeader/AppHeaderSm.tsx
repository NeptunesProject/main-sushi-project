import { chakra, Box, Flex } from '@chakra-ui/react'
import Logo from 'components/Logo'
import LanguageSelect from './LanguageSelect'
import Place from './Place'
import Burger from './Burger'

import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../../constants/index'
import 'i18n/config'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

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
      <Flex align="center" py={6} px={2.5} w="100%">
        <Box w="33.3%">
          <Logo />
        </Box>

        <Flex align="center" justify="center" gap={3} w="33.3%" grow={1}>
          <LanguageSelect />
          <Place />
        </Flex>

        <Flex w="33.3%" justify="end">
          <Burger isOpen={isOpen} setIsOpen={setIsOpen}/>
        </Flex>
      </Flex>

    {isOpen && (
       <Flex flexDir="column" alignSelf="end">
       {NAV_LINKS.map((route: string, idx: number) => (
         <MainNavLink to={route} key={`navbar.${idx}`}>
           {t(`navbar.${idx}`)}
         </MainNavLink>
       ))}
     </Flex>
    )}
     
    </>
  )
}

export default AppHeaderSm
