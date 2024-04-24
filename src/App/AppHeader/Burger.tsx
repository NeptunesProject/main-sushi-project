import React from 'react'
import burger from '../../assets/icons/menu.svg'
import close from '../../assets/icons/close.svg'
import { Box, Image } from '@chakra-ui/react'

interface BurgerProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Burger = ({ isOpen, setIsOpen }: BurgerProps) => {
  const handleChange = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      {isOpen ? (
        <>
          <Box onClick={handleChange}>
            <Image src={close} h="8px" w="8px" />
          </Box>
        </>
      ) : (
        <Box onClick={handleChange}>
          <Image src={burger} alt="Burger Icon" />
        </Box>
      )}
    </>
  )
}

export default Burger
