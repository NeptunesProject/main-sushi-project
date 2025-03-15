import { Flex, Image, Text } from '@chakra-ui/react'
import point from 'assets/icons/point.svg'
import { useTranslation } from 'react-i18next'

interface Props {
  isLargerScreen?: boolean | undefined
}
const Place = ({isLargerScreen}: Props) => {
  const { t } = useTranslation()

  return (
    <Flex align="center" gap={2} p='6px'>
      <Image display={{ base: 'none', lg: 'block' }} src={point} />
      <Text fontSize={isLargerScreen? 16 :  "0.83rem"} fontWeight={isLargerScreen ? 400 : 200} color="#343330" fontFamily={'Rubik'}>
        {t('place')}
      </Text>
    </Flex>
  )
}

export default Place
