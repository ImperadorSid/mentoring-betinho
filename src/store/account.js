import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createActiveBet, fetchAccount } from '../services/apiService'
import { useDispatch, useSelector } from 'react-redux'

const sliceName = 'account'

const initialState = {
  balance: { amount: 0 },
  activeBets: []
}

const accountSlice = createSlice({
  name: sliceName,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAccount.fulfilled, (state, action) => action.payload)

    builder.addCase(addActiveBet.fulfilled, (state, { payload }) => {
      state.balance.amount -= payload.stake
      state.activeBets.push(payload)
    })
  }
})

const getAccount = createAsyncThunk(
  `${sliceName}/getAccount`,
  () => {
    try {
      return fetchAccount()
    } catch (error) {
      console.error(`[${sliceName} store][getAccount]: ${error.message}`)

      throw error
    }
  }
)

const addActiveBet = createAsyncThunk(
  `${sliceName}/addActiveBet`,
  async (bet) => {
    try {
      await createActiveBet(bet)

      return bet
    } catch (error) {
      console.error(`[${sliceName} store][addActiveBet]: ${error.message}`)

      throw error
    }
  }
)

const useAccount = () => {
  const dispatch = useDispatch()

  return {
    account: useSelector((state) => state.account),

    getAccount: () => dispatch(getAccount()),
    addActiveBet: (bet) => dispatch(addActiveBet(bet)),
  }
}

export { useAccount }
export default accountSlice.reducer
