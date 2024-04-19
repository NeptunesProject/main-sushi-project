import { Flex, Image, Text } from '@chakra-ui/react'
import point from 'assets/icons/point.svg'
import { useTranslation } from 'react-i18next'

const Place = () => {
  const { t } = useTranslation()

  return (
    <Flex align="center" gap={2}>
      <Image src={point} />
      <Text fontSize={16} fontWeight={600} color="#343330">
        {t('place')}
      </Text>
    </Flex>
  )
}

export default Place
