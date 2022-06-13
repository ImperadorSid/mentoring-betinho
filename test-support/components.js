import React from 'react'
import { render } from '@testing-library/react'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { configureStore } from '../src/store'
import theme from '../src/theme'

const store = configureStore()

const AllTheProviders = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ReduxProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
