import styled from 'styled-components'
import { variant } from 'styled-system'
import Text from './Text'

const Button = styled(Text)(
  {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '32px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '50vh',
    textDecoration: 'none',
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color .2s ease, border-color .2s ease, opacity .2s ease',
    ':disabled': { opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' },
  },
  variant({
    variants: {
      primary: {
        color: 'white',
        bg: 'green.100',
        borderColor: 'green.100',
        ':hover': {
          bg: 'green.50',
          borderColor: 'green.50',
        },
      },
      secondary: {
        color: 'white',
        bg: 'blue',
        borderColor: 'blue',
        ':hover': {
          borderColor: 'white',
        },
      },
    },
  })
)

Button.defaultProps = {
  as: 'button',
  px: '4',
  py: '1',
  fontFamily: 'inherit',
  fontSize: '5',
}

export default Button
