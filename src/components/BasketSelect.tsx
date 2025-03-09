import {  Select, useMediaQuery } from '@chakra-ui/react'

interface Props {
  setter: React.ChangeEventHandler<HTMLSelectElement>
  value: string
  children: React.ReactNode
}

const BasketSelect = ({  setter, value, children }: Props) => {
  const [isLessThan768] = useMediaQuery('(max-width: 768px)')
  const [isLessThan700] = useMediaQuery('(max-height: 700px)')

  return (
    <Select
      onChange={setter}
      value={value}
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        border: '1px solid #B7B7B7',
        borderRadius: '4px',
        padding: isLessThan768 ? '3px' : '6px',
        maxWidth: '297px',
        boxSizing: 'border-box',
        fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: isLessThan768 ? '12px' : '16px',
        lineHeight: '12px',
        height: isLessThan700
          ? isLessThan768
            ? '28px'
            : '28px'
          : isLessThan768
            ? '36px'
            : '40px',
      }}
    >{children}</Select>
  )
}
export default BasketSelect
