import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './categories'
import eventsReducer from './events'
import accountReducer from './account'
import betReducer from './bet'

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    events: eventsReducer,
    account: accountReducer,
    bet: betReducer,
  },
})

export default store
