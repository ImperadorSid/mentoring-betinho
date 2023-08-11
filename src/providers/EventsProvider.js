import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const EventsContext = createContext(null)

const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([])

  const getEvents = useCallback(async () => {
    try {
      const { data: events } = await axios.get('http://localhost:3001/events')

      setEvents(events)
    } catch (error) {
      console.error(`[EventsProvider][getEvents]: ${error.message}`)

      throw error
    }
  }, [setEvents])

  const value = useMemo(
    () => ({
      events,
      getEvents,
    }),
    [events, getEvents]
  )

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
}

EventsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useEvents = () => {
  const eventsContext = useContext(EventsContext)

  if (!eventsContext) {
    throw new Error('useEvents was called without being nested in EventsProvider')
  }

  return eventsContext
}

export default EventsProvider
