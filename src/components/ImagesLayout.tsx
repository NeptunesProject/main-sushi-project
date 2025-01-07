import { Flex } from '@chakra-ui/react'

const ImagesLayout = () => {
  return (
    <Flex
      h="100vh"
      w="100%"
      pos="fixed"
      top={0}
      justify="space-between"
      align="end"
      zIndex={-1}
    ></Flex>
  )
}

export default ImagesLayout
