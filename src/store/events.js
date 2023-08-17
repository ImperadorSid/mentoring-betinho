import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchEvents } from '../services/apiService'
import { useDispatch, useSelector } from 'react-redux'

const sliceName = 'events'

const initialState = []

const eventsSlice = createSlice({
  name: sliceName,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getEventsThunk.fulfilled, (state, action) => action.payload)
  },
})

const getEventsThunk = createAsyncThunk(`${sliceName}/getEvents`, () => {
  try {
    return fetchEvents()
  } catch (error) {
    console.error(`[${sliceName} store][getEvents]: ${error.message}`)

    throw error
  }
})

const useEvents = () => {
  const dispatch = useDispatch()

  const events = useSelector((state) => state.events)
  const getEvents = () => dispatch(getEventsThunk())

  return {
    events,
    getEvents,
  }
}

export { useEvents }
export default eventsSlice.reducer
