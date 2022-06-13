import styled from 'styled-components'
import Box from './Box'

const Container = styled(Box)({})

Container.defaultProps = {
  width: 1,
  maxWidth: '1580px',
  m: '0 auto',
  px: ['4', '5'],
}

export default Container
