import { chakra } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const FooterLink = chakra(NavLink, {
  baseStyle: {
    transition: 'all 0.2s',
    letterSpacing: '.35px',
    color: 'gray.50',

    _hover: {
      color: 'white',
    },
  },
})

export default FooterLink
