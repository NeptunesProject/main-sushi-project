import { Flex, Image, Text, Button } from '@chakra-ui/react'
import base from 'assets/img/hero@1x.webp'
import retina from 'assets/img/hero@2x.webp'
import gift from 'assets/icons/promotions/gift.svg'

const HomeSlider = () => {
  return (
    <Flex justify="center" py={19}>
      <Flex align="center" w={1070}>
        <Flex flexDir="column" gap={6} w={520} color="gray.800">
          <Text fontSize={48} fontWeight={500}>
            Savor the Moment: Introducing our new menu
          </Text>
          <Text>
            Where Every Bite Tells a Story of Tradition and Innovation
          </Text>
          <Button
            w="max-content"
            py={2}
            px={4}
            fontWeight={400}
            color="white"
            bgColor="cyanBlue.800"
          >
            <Flex gap="10px" alignItems="center">
              <Image src={gift} />
              <Text as="span">Get 10% off when you pick up in person!</Text>
            </Flex>
          </Button>
        </Flex>
        <Image srcSet={`${base} 1x, ${retina} 2x`} h={414} />
      </Flex>
    </Flex>
  )
}

export default HomeSlider
