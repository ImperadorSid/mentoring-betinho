import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './categories'
import eventsReducer from './events'

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    events: eventsReducer,
  }
})

export default store
