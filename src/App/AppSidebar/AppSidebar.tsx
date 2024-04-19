import { Flex, Image, Text } from '@chakra-ui/react'
import { CATEGORY } from './constants'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import { ConstCategory } from '../../types'

const AppSidebar = () => {
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language

  const sidebarRef = useRef<HTMLDivElement | null>(null)

  const scrollToSection = (categoryName: string) => {
    const sectionId = `${categoryName}`
    const section = document.getElementById(sectionId)

    if (section && sidebarRef.current) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
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

  return (
    <Flex
      position="fixed"
      top={142}
      left="25%"
      zIndex={10}
      w={800}
      p={2}
      bg="white"
      borderRadius={16}
      boxShadow="0px 4px 20px #00203410"
      ref={sidebarRef}
    >
      {CATEGORY.map((category) => (
        <Flex
          flexDir="column"
          align="center"
          key={category.name}
          w={80}
          role="group"
          cursor="pointer"
          onClick={() => scrollToSection(category.name)}
        >
          <Image src={category.img} alt={category.name} boxSize="36px" />
          <Text
            fontSize={14}
            fontWeight={500}
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
  )
}

export default AppSidebar
