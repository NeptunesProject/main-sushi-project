import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Flex, Heading, Image, Text } from '@chakra-ui/react'

const src =
  ''

const NewsItemPage = () => {
  const { id } = useParams()

  return (
    <Container maxW="container.xl" pt="80px" w="100%" pos="relative">
      <Flex flexDir="column" mb="20px">
        <Heading w="70vw" m="16px auto 0">
          Title {id}
        </Heading>
        <Flex w="70vw" m="16px auto 0" gap="30px" align="center">
          <Text

            p="7px"
            backgroundColor="#f5f5f7"
            color="#686870"
            borderRadius="5px"
          >
            Wiadomości o Neptunes
          </Text>
          <Text>09.03.2025</Text>
        </Flex>
      </Flex>
      <Flex flexDirection="column" align="center" gap="30px">
        <Image objectFit="cover" borderRadius='20px' src={src} alt="NewsItemCard" w="80vw" />
        <Text w="60vw" mb="30px">text</Text>
      </Flex>
    </Container>
  )
}

export default NewsItemPage
