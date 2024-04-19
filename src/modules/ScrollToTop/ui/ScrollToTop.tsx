import { ArrowUpIcon } from '@chakra-ui/icons'
import { Box, Center } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  const onScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <Box
      pos={visible ? 'sticky' : 'unset'}
      bottom={15}
      left="100%"
      display={visible ? 'inline-block' : 'none'}
    >
      <Center
        boxSize="48px"
        borderRadius={10}
        bgColor="#343330"
        cursor="pointer"
        onClick={onScrollToTop}
      >
        <ArrowUpIcon boxSize="36px" color="white" />
      </Center>
    </Box>
  )
}

export default ScrollToTopButton
