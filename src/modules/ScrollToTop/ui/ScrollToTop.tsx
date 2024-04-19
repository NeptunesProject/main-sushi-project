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
      pos={visible ? 'sticky' : 'absolute'}
      bottom={15}
      left="100%"
      display={visible ? 'inline-block' : 'hidden'}
    >
      <Center
        boxSize={54}
        borderRadius={10}
        bgColor="#343330"
        cursor="pointer"
        onClick={onScrollToTop}
      >
        <ArrowUpIcon boxSize={42} color="white" />
      </Center>
    </Box>
  )
}

export default ScrollToTopButton
