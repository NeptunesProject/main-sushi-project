import React from 'react'
import { Button, Container, Flex, Heading, useMediaQuery } from '@chakra-ui/react'
import NewsItemCard from './components/NewsItemCard'

const NewsContent = () => {
  const [isLargerThan1025] = useMediaQuery('(min-width: 1025px)')
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')


  return (
    <Container maxW="container.xl" pt="80px" w="100%" pos="relative" pl='3vw' pr='3vw'>
      <Heading
        fontWeight={500}
        letterSpacing=".35px"
        color="#002034"
        fontFamily={'Rubik'}
        scrollMargin={100}
        fontSize={36}
        lineHeight="24px"
        fontStyle={'normal'}
        textAlign={'left'}
        mb='30px'
        mt='40px'
      >
        Aktualności
      </Heading>
      <Flex flexDir='column' align='center' mb='20px'>
      <Flex align='center' justifyContent={'start'} wrap="wrap" gap={isLargerThan800? '20px' : '10px'} pb='30px'>

        <NewsItemCard />
        <NewsItemCard />
        <NewsItemCard isLarge={!isLargerThan1025}/>
        <NewsItemCard isLarge={!isLargerThan1025}/>
        <NewsItemCard isLarge={!isLargerThan1025}/>
        <NewsItemCard isLarge={!isLargerThan1025}/>
        <NewsItemCard isLarge={!isLargerThan1025}/>
        <NewsItemCard isLarge={!isLargerThan1025}/>
        <NewsItemCard isLarge={!isLargerThan1025}/>
        <NewsItemCard isLarge={!isLargerThan1025}/>
        <NewsItemCard isLarge={!isLargerThan1025}/>
        <NewsItemCard isLarge={!isLargerThan1025}/>

      </Flex>
      <Button
        w={isLargerThan768 ? '180px' : '160px'}
        h={isLargerThan768 ? '40px' : '36px'}
        justifyContent="center"
        gap="8px"
        bg="#418a91"
        color="white"
        borderRadius={20}
        _hover={{ bg: 'gray.200' }}
      >Pokaż więcej</Button>
      </Flex>
    </Container>
  )
}

export default NewsContent
