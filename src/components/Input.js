import css from '@styled-system/css'
import Box from './Box'

const Input = (props) => (
  <Box
    as="input"
    width="100%"
    minHeight="32px"
    px="3"
    py="1"
    bg="black"
    color="white"
    borderWidth="1px"
    borderStyle="solid"
    borderColor="gray.800"
    borderRadius="50vh"
    css={css({
      outline: 'none',
      transition: 'border-color .2 ease',
      ':focus': {
        borderColor: 'white',
      },
    })}
    {...props}
  />
)

export default Input
