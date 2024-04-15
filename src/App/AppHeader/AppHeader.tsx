import React, { CSSProperties } from 'react'
import { Box, Container } from '@chakra-ui/react'
import AppHeaderLg from './AppHeaderLg'
import AppHeaderSm from './AppHeaderSm'

const stickyStyle: CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  backgroundColor: 'white',
  borderBottom: '1px solid #b8b9ba',
}

const AppHeader = () => {
  return (
    <Container as="header" maxW="container.xl" style={stickyStyle}>
      <Box display={{ base: 'none', lg: 'block' }}>
        <AppHeaderLg />
      </Box>
      <Box display={{ base: 'block', lg: 'none' }}>
        <AppHeaderSm />
      </Box>
    </Container>
  )
}

export default AppHeader
