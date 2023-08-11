import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import container from '../container'

const ContainerContext = createContext(null)

const ContainerProvider = ({ children }) => {
  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>
}

ContainerProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useContainer = () => useContext(ContainerContext)

export default ContainerProvider
