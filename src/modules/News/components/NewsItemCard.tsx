import { Box, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
const src =
  'https://d3mvlk4okvy3v4.cloudfront.net/sushi_pl/content/2f5bb65b-1c6a-4418-b68b-8f38a9c3c19b/1310-577-desktop-slider.webp'
interface Props {
  isLarge?: boolean
}

const NewsItemCard = ({isLarge = true}: Props) => {
  const temporaryID = '1';
  const [isLargerThan500] = useMediaQuery('(min-width: 500px)')

  return (
    <NavLink to={`/news/${temporaryID}`}>
      <Box
        w={isLargerThan500? isLarge? '46vw' : '22.3vw' : '94vw'}
        fontFamily="'Roboto', sans-serif"
        flexDir="column"
        alignItems="center"
        cursor="pointer"
        bg="white"
        borderRadius={10}
        boxShadow="1px 2px 10px rgba(0,0,0,.12)"
        borderLeftRadius={20}
        borderRightRadius={20}
        overflow={'hidden'}
      >
        <Image objectFit="cover" src={src} alt="NewsItemCard" />
        <Flex p="10px" flexDir="column">
          <Flex justifyContent="space-between">
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
          <Text mt="10px" fontWeight="bold">
            Ninja Sushi x SoBeauty: Dream On
          </Text>
          <Text color="#00cc2d">Dowiedz się więcej</Text>
        </Flex>
      </Box>
    </NavLink>
  )
}

export default NewsItemCard
