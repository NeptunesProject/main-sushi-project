import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppContainer from './AppContainer'
import theme from 'theme'
import { storageVersion } from '../constants'

const storedVersion = localStorage.getItem('storageVersion')

if (!storedVersion || (storedVersion && storedVersion !== storageVersion)) {
  localStorage.clear()
  localStorage.setItem('storageVersion', storageVersion)
}

const queryClient = new QueryClient()

const App = () => {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AppContainer />
          {/*<ReactQueryDevtools initialIsOpen={false} />*/}
        </QueryClientProvider>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
