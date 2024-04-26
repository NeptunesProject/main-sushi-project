import { Flex, Image, Text, Button, useMediaQuery } from '@chakra-ui/react'
import base from 'assets/img/hero@1x.webp'
import retina from 'assets/img/hero@2x.webp'
import gift from 'assets/icons/promotions/gift.svg'

const HomeSlider = () => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')

  return (
    <Flex justify="center" py={isLargerThan768 ? 19 : 0}>
      <Flex
        align="center"
        direction={isLargerThan768 ? 'row' : 'column'}
        maxW={1070}
      >
        {!isLargerThan768 && (
          <Image
            srcSet={`${base} 1x, ${retina} 2x`}
            h={isLargerThan768 ? 414 : 226}
            ml={isLargerThan768 ? 6 : 0}
          />
        )}
        <Flex
          flexDir="column"
          gap={6}
          w={isLargerThan768 ? 520 : '100%'}
          color="gray.800"
          textAlign={'left'}
          pb={3}
        >
          <Text fontSize={isLargerThan768 ? 48 : 24} fontWeight={500}>
            Savor the Moment: Introducing our new menu
          </Text>
          <Text>
            Where Every Bite Tells a Story of Tradition and Innovation
          </Text>
          <Button
            minWidth={isLargerThan768 ? 'max-content' : 'fit-content'}
            py={2}
            px={isLargerThan768 ? '4' : '2,5'}
            fontWeight={400}
            color="white"
            bgColor="cyanBlue.800"
          >
            <Flex gap="10px" alignItems="center">
              <Image src={gift} />
              <Text as="p" whiteSpace={'break-spaces'}>
                Get 10% off when you pick up in person!
              </Text>
            </Flex>
          </Button>
        </Flex>
        {isLargerThan768 && (
          <Image
            srcSet={`${base} 1x, ${retina} 2x`}
            h={isLargerThan768 ? 414 : 226}
            ml={isLargerThan768 ? 6 : 0}
          />
        )}
      </Flex>
    </Flex>
  )
}

export default HomeSlider
