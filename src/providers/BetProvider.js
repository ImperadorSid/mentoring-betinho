import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import PropTypes from 'prop-types'
import { useAccount } from './AccountProvider'
import { useEvents } from './EventsProvider'
import { nanoid } from 'nanoid'

const BetContext = createContext(null)

const BetProvider = ({ children }) => {
  const [bet, setBet] = useState(null)

  const { events } = useEvents()
  const { account, addActiveBet } = useAccount()

  const selectBet = useCallback(
    ({ eventId, competitorId }) => {
      const event = events.find((e) => e.id === eventId)
      const competitor = event.competitors.find((c) => c.id === competitorId)
      const odd = event.odds[competitor.type]

      setBet({
        id: nanoid(),
        stake: 0,
        events: [
          ...((bet && bet.events.filter((event) => event.id !== eventId)) || []),
          {
            id: eventId,
            competitorId,
            odd,
            categoryId: event.categoryId,
          },
        ],
      })
    },
    [events, setBet, bet]
  )

  const changeBetStake = useCallback(
    (stake) => {
      setBet((prevBet) => ({
        ...prevBet,
        stake: parseFloat(stake) || 0,
      }))
    },
    [setBet]
  )

  const removeSelectedBet = useCallback(() => setBet(null), [setBet])
  const removeSelectedBetEvent = useCallback(
    (param) => {
      if (bet.events.length === 1) {
        setBet(null)
      } else {
        setBet({
          ...bet,
          events: bet.events.filter((event) => event.id !== param.id),
        })
      }
    },
    [setBet, bet]
  )

  const placeBet = useCallback(async () => {
    if (bet.stake <= 0) {
      return
    }

    if (bet.stake > account.balance.amount) {
      alert('You do not have enough coins.')

      changeBetStake(account.balance.amount)

      return
    }

    try {
      await addActiveBet(bet)

      removeSelectedBet()
    } catch (error) {
      console.error(`[BetProvider][placeBet]: ${error.message}`)

      throw error
    }
  }, [bet, addActiveBet, changeBetStake, removeSelectedBet])

  const value = useMemo(
    () => ({
      bet,
      selectBet,
      changeBetStake,
      removeSelectedBet,
      removeSelectedBetEvent,
      placeBet,
    }),
    [bet, selectBet, changeBetStake, removeSelectedBet, placeBet, removeSelectedBetEvent]
  )

  return <BetContext.Provider value={value}>{children}</BetContext.Provider>
}

BetProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useBet = () => {
  const betContext = useContext(BetContext)

  if (!betContext) {
    throw new Error('useBet was called without being nested in BetProvider')
  }

  return betContext
}

export default BetProvider
