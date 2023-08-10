import PropTypes from 'prop-types'
import { Provider as ReduxProvider } from 'react-redux'
import AccountProvider from './AccountProvider'
import EventsProvider from './EventsProvider'
import BetProvider from './BetProvider'
import store from '../store'

const AllProviders = ({ children }) => (
  <ReduxProvider store={store}>
    <AccountProvider>
      <EventsProvider>
        <BetProvider>{children}</BetProvider>
      </EventsProvider>
    </AccountProvider>
  </ReduxProvider>
)

AllProviders.propTypes = {
  children: PropTypes.node.isRequired
}

export default AllProviders
