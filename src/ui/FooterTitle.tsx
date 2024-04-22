import { chakra, Text } from '@chakra-ui/react'

const FooterTitle = chakra(Text, {
  baseStyle: {
    fontFamily: `'Roboto', sans-serif`,
    transition: 'all 0.2s',
    fontWeight: 400,
    letterSpacing: '.35px',
    lineHeight: '12px',
    color: 'gray.50',
  },
})

export default FooterTitle
