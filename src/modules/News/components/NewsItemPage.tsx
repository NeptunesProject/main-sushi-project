import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Flex, Heading, Image, Text } from '@chakra-ui/react'

const src =
  'https://d3mvlk4okvy3v4.cloudfront.net/sushi_pl/content/2f5bb65b-1c6a-4418-b68b-8f38a9c3c19b/1310-577-desktop-slider.webp'

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
            Wiadomości o Ninja
          </Text>
          <Text>09.03.2025</Text>
        </Flex>
      </Flex>
      <Flex flexDirection="column" align="center" gap="30px">
        <Image objectFit="cover" src={src} alt="NewsItemCard" w="80vw" />
        <Text w="60vw" mb="30px">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius eveniet
          ipsum libero maiores nisi placeat ratione saepe tempore totam vero.
          Beatae consequatur cum deserunt ducimus esse laborum molestias
          perferendis quaerat quasi quos reprehenderit sit vero, vitae.
          Doloremque officiis porro possimus soluta tenetur. A alias aliquid cum
          delectus dolor, esse excepturi facere fuga impedit iusto maiores nobis
          odio perferendis praesentium quam qui quis rem repudiandae sapiente
          similique suscipit tempore totam veniam! A minima nulla quo? Ad
          aliquam at commodi dolorem exercitationem fugit, ipsa iure laboriosam
          nostrum nulla odit omnis quae, quibusdam quos ratione rerum, sunt
          velit voluptates? Eius mollitia porro veniam!
        </Text>
      </Flex>
    </Container>
  )
}

export default NewsItemPage
