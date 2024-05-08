import React from 'react'
import burger from '../../assets/icons/menu.svg'
import close from '../../assets/icons/close.svg'
import { Box, Flex, Image } from '@chakra-ui/react'

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
    </>
  )
}

export default Burger
