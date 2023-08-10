import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './categories'
import eventsReducer from './events'
import accountReducer from './account'

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    events: eventsReducer,
    account: accountReducer
  }
})

export default store
