import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createActiveBet, fetchAccount } from '../services/apiService'
import { useDispatch, useSelector } from 'react-redux'

const sliceName = 'account'

const initialState = {
  balance: { amount: 0 },
  activeBets: [],
}

const accountSlice = createSlice({
  name: sliceName,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAccountThunk.fulfilled, (state, action) => action.payload)
    builder.addCase(addActiveBetThunk.fulfilled, (state, action) => action.payload)
  },
})

const getAccountThunk = createAsyncThunk(`${sliceName}/getAccount`, () => {
  try {
    return fetchAccount()
  } catch (error) {
    console.error(`[${sliceName} store][getAccount]: ${error.message}`)

    throw error
  }
})

const addActiveBetThunk = createAsyncThunk(
  `${sliceName}/addActiveBet`,
  async (bet, { getState }) => {
    try {
      const { account } = getState()
      const newAccount = {
        balance: { amount: account.balance.amount - bet.stake },
        activeBets: [...account.activeBets, bet],
      }

      await createActiveBet(newAccount)

      return newAccount
    } catch (error) {
      console.error(`[${sliceName} store][addActiveBet]: ${error.message}`)

      throw error
    }
  }
)

const useAccount = () => {
  const dispatch = useDispatch()

  const account = useSelector((state) => state.account)
  const getAccount = () => dispatch(getAccountThunk())
  const addActiveBet = (bet) => dispatch(addActiveBetThunk(bet))

  return {
    account,
    getAccount,
    addActiveBet,
  }
}

export { useAccount }
export default accountSlice.reducer
