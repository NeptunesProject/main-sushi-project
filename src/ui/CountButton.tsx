import { Button, chakra } from '@chakra-ui/react'

export const CountButton = chakra(Button, {
  baseStyle: {
    bg: 'turquoise.77',
    borderLeftRadius: 20,
    h: 25,
    width: 10,
    color: 'white',
    px: 0,
  },
})

export const CountButtonBasketDec = chakra(Button, {
  baseStyle: {
    bg: '#FFFFFF',
    pl: '0px',
    pr: '8px',
    pt: '12px',
    pb: '12px',
    fontSize: '16px',
    fontWeight: '400',
    fontFamily: 'Rubik',
    lineHeight: '24px',
    color: '#002034',
    fontStyle: 'normal',
  },
})

export const CountButtonBasketInc = chakra(Button, {
  baseStyle: {
    bg: '#FFFFFF',
    pr: '0px',
    pl: '8px',
    pt: '12px',
    pb: '12px',
    fontSize: '16px',
    fontWeight: '400',
    fontFamily: 'Rubik',
    lineHeight: '24px',
    color: '#002034',
    fontStyle: 'normal',
  },
})
