import { ArrowUpIcon } from '@chakra-ui/icons'
import { Box, Center } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)
  const windowRef = useRef(window)

  useEffect(() => {
    const currentWindow = windowRef.current

    const toggleVisibility = () => {
      const isScrollVisible = currentWindow.scrollY > 300
      setVisible(isScrollVisible)
    }

    currentWindow.addEventListener('scroll', toggleVisibility)
    return () => {
      currentWindow.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const onScrollToTop = () => {
    windowRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Box bottom={15} left="100%" display={visible ? 'inline-block' : 'none'}>
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
