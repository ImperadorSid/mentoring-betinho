import PropTypes from 'prop-types'
import ReduxProvider from './ReduxProvider'
import ThemeProvider from './ThemeProvider'

const AllProviders = ({ children }) => (
  <ReduxProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </ReduxProvider>
)

AllProviders.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AllProviders
