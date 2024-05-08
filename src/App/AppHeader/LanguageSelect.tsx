import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDownIcon } from '@chakra-ui/icons'

interface Props {
  text?: string
}

const LANGUAGES = ['en', 'ua', 'pl', 'ru']

const LanguageSelect = ({ text }: Props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const selectedLanguage = i18n.language
  const languageCodeFromPath = location.pathname.split('/')[1]

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
    // navigate(`/${languageCode}${location.pathname.substring(3)}`)
  }

  return (
    <Menu>
      <MenuButton>
        <Flex align="center" gap={0.5} color="#343330">
          <Text
            textTransform={text ? undefined : 'uppercase'}
            fontSize={16}
            fontWeight={400}
            fontFamily={'Rubik'}
          >
            {text ? text : selectedLanguage}
          </Text>
          {!text && <ChevronDownIcon />}
        </Flex>
      </MenuButton>

      <MenuList ml={text ? 16 : -2}>
        {LANGUAGES.filter((lang) => lang !== selectedLanguage).map(
          (language) => (
            <MenuItem
              key={language}
              onClick={() => handleLanguageChange(language)}
              textTransform="uppercase"
              fontFamily={'Rubik'}
            >
              {language}
            </MenuItem>
          ),
        )}
      </MenuList>
    </Menu>
  )
}

export default LanguageSelect
