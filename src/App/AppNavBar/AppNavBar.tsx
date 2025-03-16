import { Flex, Image, Text } from '@chakra-ui/react'
import { CATEGORY } from './constants'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'
import { ConstCategory } from '../../types'

const AppNavBar = () => {
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language

  const sidebarRef = useRef<HTMLDivElement | null>(null)

  const scrollToSection = (categoryName: string) => {
    const sectionId = `${categoryName}`
    const section = document.getElementById(sectionId)

    if (section && sidebarRef.current) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    localStorage.removeItem("setCategory")
  }

  const getNameByTranslate = (category: ConstCategory) => {
    switch (currentLanguage) {
      case 'en':
        return category.nameEn
      case 'ua':
        return category.nameUa
      case 'pl':
        return category.name
      case 'ru':
        return category.nameRu
    }
  }

  useEffect(() => {
    const initialCategory = window.location.hash.slice(1)
    const categoryToScroll = localStorage.getItem("setCategory")
    if(categoryToScroll) {
      setTimeout(() => scrollToSection(categoryToScroll), 100)
      return
    }
    if(initialCategory) {
      setTimeout(() => scrollToSection(initialCategory), 2000)
    }
    console.log(categoryToScroll, 'categoryToScroll')
  }, []);

  return (
    <Flex
      className="asdfafqwefqwefq"
      position="fixed"
      top={{ base: 'unset', xxs: "64px", lg: 77 }}
      bottom={{ base: 0, xxs: "unset", lg: 'unset' }}
      left={{ base: 0, lg: '50%' }}
      transform={{ base: 'none', lg: 'translate( -50%)' }}
      zIndex={10}
      w={{ base: '100%', lg: 800 }}
      p={2}
      bg="white"
      borderRadius={{ base: 'none', lg: 16 }}
      boxShadow={{
        base: 'inset 0px 4px 4px #00000025',
        lg: '0px 4px 20px #00203410',
      }}
      ref={sidebarRef}
      overflow={{ base: 'scroll', lg: 'hidden' }}
    >
      <Flex w={{ base: 'unset', sm: '100%' }} justifyContent="space-evenly">
        {CATEGORY.map((category) => (
          <Flex
            flexDir="column"
            align="center"
            key={category.name}
            w={{ base: 65, lg: 80 }}
            role="group"
            cursor="pointer"
            onClick={() => scrollToSection(category.name)}
          >
            <Image
              src={category.img}
              alt={category.name}
              boxSize="36px"
              sx={{
                '@media screen and (max-device-width: 576px) and (-webkit-min-device-pixel-ratio: 2)': {
                  boxSize: '46px',
                },
              }}
            />
            <Text
              fontSize={{ base: "0.72rem", lg: "0.72rem" }}
              fontWeight={{ base: 700, lg: 500 }}
              color="grey.100"
              _groupHover={{
                color: 'blue.100',
              }}
            >
              {getNameByTranslate(category)}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default AppNavBar
