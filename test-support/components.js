import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import AllProviders from '../src/providers/AllProviders'

const customRender = (ui, options) => render(ui, { wrapper: AllProviders, ...options })
const customRenderHook = (hook, options) => renderHook(hook, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as render, customRenderHook as renderHook, userEvent }
