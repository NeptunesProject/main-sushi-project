import {
  Container,
  Flex,
  Text,
  UnorderedList,
  useMediaQuery,
} from '@chakra-ui/react'
import { THANK_NOTE_TEXT } from '../../../constants'
import ListItem from 'ui/ListItem'

const GratitudeNote = () => {
  const [isLessThan768] = useMediaQuery('(max-width: 768px)')

  return (
    <Container maxW="container.xl" w="100%" mb={10}>
      <Flex
        flexDirection="column"
        align="center"
        gap={6}
        py={9}
        px={isLessThan768 ? 16 : 221}
        bg="rgba(255, 255, 255, 0.7)"
        borderRadius={16}
      >
        <Text as="h2" color="cyanBlue.800" fontSize={28} fontWeight={500}>
          Dziękujemy za wybór Neptunes Sushi Delivery!
        </Text>

        <Text
          color="cyanBlue.800"
          textAlign="center"
          fontSize={20}
          fontWeight={500}
        >
          Nasze sushi zostały przygotowane według przepisu samego króla mórz
          Neptuna, co oznacza, że zapewniamy ci:
        </Text>

        <UnorderedList>
          {THANK_NOTE_TEXT &&
            THANK_NOTE_TEXT.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
        </UnorderedList>
      </Flex>
    </Container>
  )
}

export default GratitudeNote
