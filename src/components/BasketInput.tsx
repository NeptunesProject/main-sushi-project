import { Input } from '@chakra-ui/react'

interface Props {
  value: string
  setter: React.ChangeEventHandler<HTMLInputElement>
  placeholder: string
  type: string
}

export const BasketInput = ({ value, setter, placeholder, type }: Props) => {
  return (
    <Input
      value={value}
      onChange={setter}
      type={type}
      placeholder={placeholder}
      style={{
        border: '1px solid #B7B7B7',
        borderRadius: '4px',
        padding: '6px',
        maxWidth: '297px',
        boxSizing: 'border-box',
      }}
    />
  )
}
