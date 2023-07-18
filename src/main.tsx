import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { HomeProvider } from './context/homeContext.tsx'
import theme from './styles/theme.ts'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <HomeProvider>
          <App />
        </HomeProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
