import {
  Container,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'

const GratitudeNote = () => {
  return (
    <Container maxW="container.xl" w="100%" mb={55}>
      <Flex
        flexDirection="column"
        align="center"
        gap={5}
        pt={9}
        pb={69}
        px={139}
        bg="rgba(255, 255, 255, 0.7)"
        boxShadow="0 4px 4px rgba(0,0,0,.25)"
      >
        <Text color="cyanBlue.800" fontSize={28} fontWeight={700}>
          Dziękujemy za wybór Neptunes Sushi Delivery!
        </Text>

        <Text color="cyanBlue.800" fontSize={28} fontWeight={700}>
          Nasze sushi zostały przygotowane według przepisu samego króla mórz
          Neptuna, co oznacza, że zapewniamy ci:
        </Text>

        <UnorderedList>
          <ListItem>
            <Text color="cyanBlue.800" fontSize={28} fontWeight={700}>
              Świeże składniki: Używamy tylko najświeższych składników,
              zapewniając wysoką jakość i smak naszych sushi.
            </Text>
          </ListItem>
          <ListItem>
            <Text color="cyanBlue.800" fontSize={28} fontWeight={700}>
              Bogate menu: Nasze menu oferuje szeroki wybór sushi, zapewniając
              coś dla każdego, bez względu na preferencje smakowe.
            </Text>
          </ListItem>
          <ListItem>
            <Text color="cyanBlue.800" fontSize={28} fontWeight={700}>
              Szybka dostawa: Zapewniamy szybką i terminową dostawę, dzięki
              czemu możesz cieszyć się naszym pysznym sushi w wygodnym dla
              Ciebie czasie.
            </Text>
          </ListItem>
          <ListItem>
            <Text color="cyanBlue.800" fontSize={28} fontWeight={700}>
              Kreatywne kompozycje: Nasze sushi jest nie tylko smaczne, ale
              także pięknie podane, sprawiając, że jedzenie staje się również
              przyjemnością dla oka.
            </Text>
          </ListItem>
          <ListItem>
            <Text color="cyanBlue.800" fontSize={28} fontWeight={700}>
              Wysoka jakość obsługi klienta: Dbamy o naszych klientów i zawsze
              staramy się zapewnić im najlepsze doświadczenie związane z
              zamawianiem i spożywaniem naszego sushi.
            </Text>
          </ListItem>
        </UnorderedList>
      </Flex>
    </Container>
  )
}

export default GratitudeNote
