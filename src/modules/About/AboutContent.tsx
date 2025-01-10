import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const AboutContent = () => {
  const { t } = useTranslation()
  return (
      <Container
          maxW="container.xl"
          my={24}
          display="flex"
          justifyContent="center"
          fontFamily="'Roboto', sans-serif"
      >
        <Box maxW={{ base: 500, lg: 1150 }} minW={{ base: 'auto', lg: '80%' }}>
          <Heading
              as="h2"
              fontSize={36}
              fontWeight={700}
              color="turquoise.77"
              mb={8}
              fontFamily="'Roboto', sans-serif"
          >
            {t('about.title')}
          </Heading>
          <Flex
              borderRadius={16}
              flexDir="column"
              gap={3}
              maxW={900}
              bg="rgba(255, 255, 255, 0.7)"
              p={4}
              color="#333"
              fontWeight={600}
          >
            <Text>Jesteśmy dynamicznie rozwijającym się warszawskim startupem, który koncentruje się na przygotowywaniu premium sushi. Rozpoczynamy realizację Twojego zamówienia i będziemy się nim zajmować z najwyższą starannością.</Text>
            <Text>W razie jakichkolwiek pytań lub wątpliwości, skontaktuj się z nami:
              📞 <a href='tel:+48517102069'>+48 517 102 069</a>
              📱 Instagram: <a href='https://www.instagram.com/neptunes.sushi/'>@neptunes.sushi</a>
              📘</Text>
            {/*<Text>{t('about.thirdP')}</Text>*/}
            {/*<Text>{t('about.fourthP')}</Text>*/}
            {/*<Text>{t('about.fifthP')}</Text>*/}
          </Flex>
        </Box>
      </Container>
  )
}

export default AboutContent
