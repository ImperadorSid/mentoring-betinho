import { render } from '@testing-library/react'
import Box from '../Box'

describe('<Box />', () => {
  it('renders component unchanged', () => {
    const { container } = render(<Box />)

    expect(container).toMatchSnapshot()
  })
})
