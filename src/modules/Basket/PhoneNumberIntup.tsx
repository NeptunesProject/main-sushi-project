import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useMediaQuery } from '@chakra-ui/react' // Стили
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js/max'

interface Props {
  setter: (phoneNumber: string, isValid: boolean) => void
  value: string
}

const checkPhoneNumber = (value: string, countryCode: CountryCode) => {
  try {
    const phoneNumber = parsePhoneNumber('+' + value, countryCode)
    return phoneNumber.isValid()
  } catch (e) {
    return false
  }
}

export const PhoneNumberInput = ({ setter, value }: Props) => {
  const [phoneData, setPhoneData] = useState({
    phone: value,
    countryCode: 'pl',
  })
  const [isLessThan768] = useMediaQuery('(max-width: 768px)')
  const [isLessThan700] = useMediaQuery('(max-height: 700px)')
  const [isValid, setIsValid] = useState<boolean>(() =>
    checkPhoneNumber(
      phoneData.phone,
      phoneData.countryCode.toUpperCase() as CountryCode,
    ),
  )
  const [borderColor, setBorderColor] = useState<string>(
    isValid ? '#468C92' : 'red',
  )
  const handleChange = (value: string, data: any) => {
    setPhoneData({ phone: value, countryCode: data.countryCode })
  }

  useEffect(() => {
    const checkIfValid = checkPhoneNumber(
      phoneData.phone,
      phoneData.countryCode.toUpperCase() as CountryCode,
    )
    setter(phoneData.phone, checkIfValid)
    setIsValid(checkIfValid)
  }, [phoneData])

  return (
    <PhoneInput
      country={phoneData.countryCode}
      value={phoneData.phone}
      onChange={handleChange}
      onFocus={(e) => {
        e.target.style.boxShadow = '0 0 0 0.84px #3182CEd6'
        setBorderColor('#468C92')
      }}
      onBlur={(e) => {
        e.target.style.boxShadow = 'none'
        setBorderColor(isValid ? '#468C92' : 'red')
      }}
      inputStyle={{
        borderColor: borderColor,
        boxShadow: '0 0 0 1px #B7B7B7',
        width:'100%',
        maxWidth: '297px',
        fontSize: '16px',
        borderRadius: '4px',
        height: isLessThan700
          ? isLessThan768
            ? '28px'
            : '28px'
          : isLessThan768
          ? '36px'
          : '40px',
      }}
      buttonStyle={{
        borderRadius: '6px',
      }}
    />
  )
}
