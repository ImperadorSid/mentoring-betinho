import styled from 'styled-components'
import {
  compose,
  position,
  space,
  color,
  layout,
  border,
  flexbox,
} from 'styled-system'

const Box = styled.div(
  {},
  compose(position, layout, space, color, border, flexbox)
)

export default Box
