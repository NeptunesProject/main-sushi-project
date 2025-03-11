import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Image } from '@chakra-ui/image'
import { Box, useMediaQuery } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const images = [
  'https://i.imgur.com/JMp0yO9.jpeg',
  'https://i.imgur.com/JMp0yO9.jpeg',
  'https://i.imgur.com/JMp0yO9.jpeg',
]
interface ArrowProps {
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

function NextArrow(props: ArrowProps) {
  const [isLargerThan430] = useMediaQuery('(min-width: 431px)')

  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        paddingTop: '1.5px',
        scale: isLargerThan430 ? '2' : '1',
        background: 'gray',
        borderRadius: '20px',
        right: isLargerThan430 ? '-40px' : '-25px',
      }}
      onClick={onClick}
    />
  )
}

function PrevArrow(props: ArrowProps) {
  const [isLargerThan430] = useMediaQuery('(min-width: 431px)')
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        paddingTop: '1.5px',
        scale: isLargerThan430 ? '2' : '1',
        background: 'gray',
        borderRadius: '20px',
        left: isLargerThan430 ? '-40px' : '-25px',
      }}
      onClick={onClick}
    />
  )
}

const Carousel = () => {
  const navigate = useNavigate()
  const [isLargerThan430] = useMediaQuery('(min-width: 431px)')
  const [isLargerThan360] = useMediaQuery('(min-width: 361px)')
  const [isLargerThan1440] = useMediaQuery('(min-width: 1441px)')

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    //autoplay: true,
    autoplaySpeed: 3000,
    dotsClass: 'slick-dots slick-dots-custom',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: any) => (
      <div
        style={{
          bottom: '10px',
          borderRadius: '10px',
          padding: '10px',
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
  }

  return (
    <Box
      mt={isLargerThan360 ? '100px' : '10px'}
      w={isLargerThan1440 ? '60vw' : '80vw'}
      mx="auto"
      mb={10}
      sx={{
        '.slick-slide': { padding: '0 10px' },
        '.slick-dots': {
          bottom: '-30px',
          listStyle: 'none',
        },
        '.slick-dots li button': {
          width: isLargerThan430 ? '16px' : '8px',
          height: isLargerThan430 ? '16px' : '8px',
          borderRadius: '50%',
          backgroundColor: 'gray',
          border: 'none',
        },
        '.slick-dots li button::before': {
          content: 'none',
        },
        '.slick-dots li.slick-active button': {
          backgroundColor: '#003E66',
        },
      }}
    >
      <Slider {...settings}>
        {images.map((src, index) => (
          <Box
            key={index}
            w="full"
            // h="400px"
            display="flex"
          >
            <Image
              key={index}
              src={src}
              w="100%"
              h="100%"
              objectFit="cover"
              alt={`Slide ${index}`}
              // fallback
              borderRadius={35}
              onClick={() => navigate(`/news/${index}`)}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  )
}

export default Carousel
