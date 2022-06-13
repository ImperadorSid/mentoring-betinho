import {
  createContext,
  useMemo,
  useState,
  useContext,
  useCallback,
} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useContainer } from './ContainerProvider'

const AccountContext = createContext(null)

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState({
    balance: { amount: 0 },
    activeBets: [],
  })

  const { accountApiService } = useContainer()

  const getAccount = useCallback(async () => {
    try {
      const payload = await accountApiService.getAccount()

      setAccount(payload)
    } catch (error) {
      console.error(`[AccountProvider][getAccount]: ${error.message}`)

      throw error
    }
  }, [setAccount, accountApiService])

  const addActiveBet = useCallback(
    async (bet) => {
      const newAccount = {
        balance: { amount: account.balance.amount - bet.stake },
        activeBets: [...account.activeBets, bet],
      }

      try {
        await axios.post('http://localhost:3001/account', newAccount)

        setAccount(newAccount)
      } catch (error) {
        console.error(`[AccountProvider][addActiveBet]: ${error.message}`)

        throw error
      }
    },
    [account, setAccount]
  )

  const value = useMemo(
    () => ({
      account,
      getAccount,
      addActiveBet,
    }),
    [account, getAccount, addActiveBet]
  )

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  )
}

AccountProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useAccount = () => {
  const accountContext = useContext(AccountContext)

  if (!accountContext) {
    throw new Error(
      'useAccount was called without being nested in AccountProvider'
    )
  }

  return accountContext
}

export default AccountProvider
