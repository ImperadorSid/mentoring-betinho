import PropTypes from 'prop-types'
import ContainerProvider from './ContainerProvider'
import AccountProvider from './AccountProvider'
import EventsProvider from './EventsProvider'
import CategoriesProvider from './CategoriesProvider'
import BetProvider from './BetProvider'

const AllProviders = ({ children }) => (
  <ContainerProvider>
    <AccountProvider>
      <EventsProvider>
        <CategoriesProvider>
          <BetProvider>{children}</BetProvider>
        </CategoriesProvider>
      </EventsProvider>
    </AccountProvider>
  </ContainerProvider>
)

AllProviders.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AllProviders
