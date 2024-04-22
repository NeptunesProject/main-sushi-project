import { Flex, Image, Text } from '@chakra-ui/react'
import { CATEGORY } from './constants'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
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
      top={{ base: 'unset', lg: 77 }}
      bottom={{ base: 0, lg: 'unset' }}
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
            <Image src={category.img} alt={category.name} boxSize="36px" />
            <Text
              fontSize={{ base: 10, lg: 14 }}
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
