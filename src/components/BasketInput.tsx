import { Input, useMediaQuery } from '@chakra-ui/react'

interface Props {
  value: string
  setter: React.ChangeEventHandler<HTMLInputElement>
  placeholder: string
  type: string
}

export const BasketInput = ({ value, setter, placeholder, type }: Props) => {
  const [isLessThan768] = useMediaQuery('(max-width: 768px)')

  return (
    <Input
      value={value}
      onChange={setter}
      type={type}
      placeholder={placeholder}
      style={{
        border: '1px solid #B7B7B7',
        borderRadius: '4px',
        padding: isLessThan768 ? '4px' : '6px',
        maxWidth: '297px',
        boxSizing: 'border-box',
        fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: isLessThan768 ? '14px' : '16px',
        lineHeight: isLessThan768 ? '21px' : '24px',
        height: isLessThan768 ? '36px' : '40px',
      }}
    />
  )
}
