import React, { useEffect, useRef } from 'react'
import burger from '../../assets/icons/menu.svg'
import close from '../../assets/icons/close.svg'
import { Box, Flex, Image } from '@chakra-ui/react'

interface BurgerProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Burger = ({ isOpen, setIsOpen }: BurgerProps) => {
  const burgerRef = useRef<HTMLDivElement | null>(null)

  const handleChange = () => {
    setIsOpen((prev) => !prev)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (burgerRef.current && !burgerRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={burgerRef}>
      {isOpen ? (
        <Flex
          onClick={handleChange}
          width={'24px'}
          height={'24px'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Image src={close} h="10px" w="10px" />
        </Flex>
      ) : (
        <Box onClick={handleChange}>
          <Image src={burger} alt="Burger Icon" />
        </Box>
      )}
    </div>
  )
}

export default Burger
