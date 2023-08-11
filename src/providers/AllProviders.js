import PropTypes from 'prop-types'
import { Provider as ReduxProvider } from 'react-redux'
import store from '../store'

const AllProviders = ({ children }) => <ReduxProvider store={store}>{children}</ReduxProvider>

AllProviders.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AllProviders
