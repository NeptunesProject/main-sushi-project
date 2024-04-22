import { ListItem as ListElement, Text } from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
}

const ListItem = ({ children }: Props) => {
  return (
    <ListElement>
      <Text color="cyanBlue.800">{children}</Text>
    </ListElement>
  )
}

export default ListItem
