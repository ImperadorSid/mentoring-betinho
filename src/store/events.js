import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchEvents } from '../services/apiService'
import { useDispatch, useSelector } from 'react-redux'

const reducerName = 'events'

const initialState = {
  value: []
}

const eventsSlice = createSlice({
  name: reducerName,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.value = action.payload
    })
  }
})

const getEvents = createAsyncThunk(
  `${reducerName}/getEvents`,
  () => {
    try {
      return fetchEvents()
    } catch (error) {
      console.error(`[events store][getEvents]: ${error.message}`)

      return []
    }
  }
)

const useEvents = () => {
  const dispatch = useDispatch()

  return {
    events: useSelector((state) => state.events.value),

    getEvents: () => dispatch(getEvents())
  }
}

export { useEvents }
export default eventsSlice.reducer
