import PropTypes from 'prop-types'
import { Provider as ReduxProvider } from 'react-redux'
import BetProvider from './BetProvider'
import store from '../store'

const AllProviders = ({ children }) => (
  <ReduxProvider store={store}>
    <BetProvider>{children}</BetProvider>
  </ReduxProvider>
)

AllProviders.propTypes = {
  children: PropTypes.node.isRequired
}

export default AllProviders
