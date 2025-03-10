import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Image } from '@chakra-ui/image'
import { Box } from '@chakra-ui/react'
const images = [
  'https://thumbs.dreamstime.com/b/delicious-sushi-banner-smoke-rustic-wooden-table-328197567.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqykL_mbBwt8vGSL05wULjUGkd6MlNXMvh3GVR18aAcOw8xQ8zFWZV5OX83DLFXnJh6jU&usqp=CAU',
  'https://static.vecteezy.com/system/resources/thumbnails/030/033/454/small/sushi-rolls-banner-free-space-text-mockup-fast-food-top-view-empty-professional-phonography-photo.jpg',
]

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dotsClass: 'slick-dots slick-dots-custom',
  }

  return (
    <Box mt={10} w="80vw" mx="auto" mb={10} sx={{
      '.slick-slide': { padding: '0 10px' }, // Отступы между слайдами
    }} >
      <Slider {...settings}>
        {images.map((src, index) => (
          <Box
            key={index}
            w="full"
            h="400px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              key={index}
              src={src}
              w="100%"
              h="100%"
              objectFit="cover"
              alt={`Slide ${index}`}
              // fallback
              borderRadius={20}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  )
}

export default Carousel
