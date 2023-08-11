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
    builder.addCase(getAccount.fulfilled, (state, action) => action.payload)
    builder.addCase(addActiveBet.fulfilled, (state, action) => action.payload)
  },
})

const getAccount = createAsyncThunk(`${sliceName}/getAccount`, () => {
  try {
    return fetchAccount()
  } catch (error) {
    console.error(`[${sliceName} store][getAccount]: ${error.message}`)

    throw error
  }
})

const addActiveBet = createAsyncThunk(`${sliceName}/addActiveBet`, async (bet, { getState }) => {
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
})

const useAccount = () => {
  const dispatch = useDispatch()

  const account = useSelector((state) => state.account)
  const getAccount = () => dispatch(getAccount())
  const addActiveBet = (bet) => dispatch(addActiveBet(bet))

  return {
    account,
    getAccount,
    addActiveBet,
  }
}

export { useAccount }
export default accountSlice.reducer
