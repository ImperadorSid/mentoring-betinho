import styled from 'styled-components'
import { typography } from 'styled-system'
import Box from './Box'

const Text = styled(Box)`
  ${typography}

  &&& {
    text-transform: ${(props) => props.textTransform};
  }
`

Text.defaultProps = {
  as: 'p',
  mt: 0,
  mb: 0,
}

export default Text
