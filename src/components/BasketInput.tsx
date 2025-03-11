import { Input, useMediaQuery } from '@chakra-ui/react'

interface Props {
  value: string
  setter: React.ChangeEventHandler<HTMLInputElement>
  placeholder: string
  type: string
  required?: boolean
}

export const BasketInput = ({ value, setter, placeholder, type, required=false }: Props) => {
  const [isLessThan768] = useMediaQuery('(max-width: 768px)')
  const [isLessThan700] = useMediaQuery('(max-height: 700px)')

  return (
    <Input
      value={value}
      onChange={setter}
      type={type}
      placeholder={placeholder}
      _invalid={{ borderColor: "red.500" }}
      _focus={{ borderColor: "#B7B7B7" }}
      isInvalid={value.trim() === "" && required}
      border="1px solid"
      style={{
        borderRadius: '4px',
        padding: isLessThan768 ? '4px' : '6px',
        maxWidth: '297px',
        boxSizing: 'border-box',
        fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: isLessThan768 ? '14px' : '16px',
        lineHeight: isLessThan768 ? '21px' : '24px',
        height: isLessThan700
          ? isLessThan768
            ? '28px'
            : '28px'
          : isLessThan768
            ? '36px'
            : '40px',
      }}
    />
  )
}
