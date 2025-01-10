import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const SuccessContent = () => {
  // const { t } = useTranslation()
  return (
      <Container
          maxW="container.xl"
          mt={'22vh'}
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
            Twoje zamówienie zostało złożone z sukcesem!
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
            <Text>
              Dziękujemy za dokonanie płatności! Rozpoczęliśmy już realizację
              Twojego zamówienia i będziemy się nim zajmować z najwyższą
              starannością.
            </Text>
            <Text>
              W razie jakichkolwiek pytań lub wątpliwości, skontaktuj się z nami:
            </Text>
            <Text fontWeight={700}>
              📞 Numer kontaktowy: +48517102069
            </Text>
            <Text>Dziękujemy, że wybrałeś naszą usługę!</Text>
          </Flex>
        </Box>
      </Container>
  )
}

export default SuccessContent
