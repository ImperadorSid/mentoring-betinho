import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCategories } from '../services/apiService'
import { useDispatch, useSelector } from 'react-redux'

const sliceName = 'categories'

const initialState = []

const categoriesSlice = createSlice({
  name: sliceName,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => action.payload)
  }
})

const getCategories = createAsyncThunk(
  `${sliceName}/getCategories`,
  () => {
    try {
      return fetchCategories()
    } catch (error) {
      console.error(`[${sliceName} store][getCategories]: ${error.message}`)

      throw error
    }
  }
)

const useCategories = () => {
  const dispatch = useDispatch()

  const categories = useSelector((state) => state.categories)
  const getCategories = () => dispatch(getCategories())

  return {
    categories,
    getCategories
  }
}

export { useCategories }
export default categoriesSlice.reducer
