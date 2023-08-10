import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCategories } from '../services/apiService'
import { useDispatch, useSelector } from 'react-redux'

const reducerName = 'categories'

const initialState = {
  value: []
}

const categoriesSlice = createSlice({
  name: reducerName,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.value = action.payload
    })
  }
})

const getCategories = createAsyncThunk(
  `${reducerName}/getCategories`,
  () => {
    try {
      return fetchCategories()
    } catch (error) {
      console.error(`[categories store][getCategories]: ${error.message}`)

      return []
    }
  }
)

const useCategories = () => {
  const dispatch = useDispatch()

  return {
    categories: useSelector((state) => state.categories.value),

    getCategories: () => dispatch(getCategories()),
  }
}

export { useCategories }
export default categoriesSlice.reducer
