import { Button, chakra } from '@chakra-ui/react'

export const CountButton = chakra(Button, {
  baseStyle: {
    bg: 'turquoise.77',
    borderLeftRadius: 20,
    h: "20px",
    width: 10,
    color: 'white',
    px: 0,
  },
})

export const CountButtonBasketDec = chakra(Button, {
  baseStyle: {
    bg: '#FFFFFF',
    pl: '0px',
    pr: '4px',
    pt: '6px',
    pb: '6px',
    fontSize: '12px',
    fontWeight: '400',
    fontFamily: 'Rubik',
    lineHeight: '12px',
    color: 'white',
    fontStyle: 'normal',
  },
})

export const CountButtonBasketInc = chakra(Button, {
  baseStyle: {
    bg: '#FFFFFF',
    pr: '0px',
    pl: '0px',
    pt: '6px',
    pb: '6px',
    fontSize: '12px',
    fontWeight: '400',
    fontFamily: 'Rubik',
    lineHeight: '12px',
    color: 'white',
    fontStyle: 'normal',
  },
})
