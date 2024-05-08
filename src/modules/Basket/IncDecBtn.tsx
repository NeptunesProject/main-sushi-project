import { useMediaQuery } from '@chakra-ui/react'
import inc from 'assets/icons/inc.svg'
import dec from 'assets/icons/dec.svg'
import { CountButtonBasketDec, CountButtonBasketInc } from 'ui/CountButton'

interface Props {
  onClick: () => void
  text: string
}

export const IncBtn = ({ onClick, text }: Props) => {
  const [isLessThan768] = useMediaQuery('(max-width: 768px)')

  return (
    <>
      {isLessThan768 ? (
        <img
          src={inc}
          alt="Increment image"
          onClick={onClick}
          style={{
            cursor: 'pointer',
            paddingTop: '14px',
            paddingBottom: '14px',
            paddingRight: '5px',
            paddingLeft: '10px',
          }}
        />
      ) : (
        <CountButtonBasketInc
          borderRightRadius={5}
          borderLeftRadius={5}
          onClick={onClick}
        >
          {text}
        </CountButtonBasketInc>
      )}
    </>
  )
}

export const DecBtn = ({ onClick, text }: Props) => {
  const [isLessThan768] = useMediaQuery('(max-width: 768px)')

  return (
    <>
      {isLessThan768 ? (
        <img
          src={dec}
          alt="Decrement image"
          onClick={onClick}
          style={{
            cursor: 'pointer',
            paddingTop: '14px',
            paddingBottom: '14px',
            paddingLeft: '5px',
            paddingRight: '10px',
          }}
        />
      ) : (
        <CountButtonBasketDec
          borderRightRadius={5}
          borderLeftRadius={5}
          onClick={onClick}
        >
          {text}
        </CountButtonBasketDec>
      )}
    </>
  )
}
