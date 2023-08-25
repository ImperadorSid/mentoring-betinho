import { createSlice, nanoid } from '@reduxjs/toolkit'
import { useEvents } from './events'
import { useAccount } from './account'
import { useDispatch, useSelector } from 'react-redux'

const sliceName = 'bet'

const initialState = null

const betSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setBet: (state, action) => {
      const { event, competitor } = action.payload

      const newEvent = {
        id: event.id,
        competitorId: competitor.id,
        odd: event.odds[competitor.type],
        categoryId: event.categoryId,
      }

      const currentSelectedEvents = state ? state.events.filter((e) => e.id !== event.id) : []

      return {
        id: nanoid(),
        stake: 0,
        events: [...currentSelectedEvents, newEvent],
      }
    },

    changeBetStake: (state, action) => {
      state.stake = parseFloat(action.payload) || 0
    },

    removeSelectedBet: () => null,

    removeSelectedBetEvent: (state, action) => {
      const { id } = action.payload

      if (state.events.length === 1) return initialState

      state.events = state.events.filter((e) => e.id !== id)
    },
  },
})

const useBet = () => {
  const dispatch = useDispatch()
  const { events } = useEvents()
  const { account, addActiveBet } = useAccount()

  const bet = useSelector((state) => state.bet)
  const selectBetAction = (betData) => dispatch(betSlice.actions.setBet(betData))
  const changeBetStake = (stake) => dispatch(betSlice.actions.changeBetStake(stake))
  const removeSelectedBet = () => dispatch(betSlice.actions.removeSelectedBet())
  const removeSelectedBetEvent = (event) => dispatch(betSlice.actions.removeSelectedBetEvent(event))

  const selectBet = ({ eventId, competitorId }) => {
    const event = events.find((e) => e.id === eventId)
    const competitor = event.competitors.find((c) => c.id === competitorId)

    selectBetAction({ event, competitor })
  }

  const placeBet = async () => {
    if (bet.stake > account.balance.amount) {
      alert('You do not have enough coins.')

      changeBetStake(account.balance.amount)
      return
    }

    try {
      await addActiveBet(bet)

      removeSelectedBet()
    } catch (error) {
      console.error(`[${sliceName} store][placeBet]: ${error.message}`)

      throw error
    }
  }

  return {
    bet,
    selectBet,
    changeBetStake,
    removeSelectedBet,
    removeSelectedBetEvent,
    placeBet,
  }
}

export { useBet }
export default betSlice.reducer
