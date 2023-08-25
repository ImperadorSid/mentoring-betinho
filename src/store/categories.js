import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCategories } from '../services/apiService'
import { useDispatch, useSelector } from 'react-redux'

const sliceName = 'categories'

const initialState = []

const categoriesSlice = createSlice({
  name: sliceName,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => action.payload)
  },
})

const getCategoriesThunk = createAsyncThunk(`${sliceName}/getCategories`, () => {
  try {
    return fetchCategories()
  } catch (error) {
    console.error(`[${sliceName} store][getCategories]: ${error.message}`)

    throw error
  }
})

const useCategories = () => {
  const dispatch = useDispatch()

  const categories = useSelector((state) => state.categories)
  const getCategories = () => dispatch(getCategoriesThunk())

  return {
    categories,
    getCategories,
  }
}

export { useCategories }
export default categoriesSlice.reducer
