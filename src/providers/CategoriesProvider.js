import { createContext, useMemo, useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const CategoriesContext = createContext(null)

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([])

  const getCategories = useCallback(async () => {
    try {
      const { data: categories } = await axios.get('http://localhost:3001/categories')

      setCategories(categories)
    } catch (error) {
      console.error(`[CategoriesProvider][getCategories]: ${error.message}`)

      throw error
    }
  }, [setCategories])

  const value = useMemo(
    () => ({
      categories,
      getCategories,
    }),
    [categories, getCategories]
  )

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}

CategoriesProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useCategories = () => {
  const categoriesContext = useContext(CategoriesContext)

  if (!categoriesContext) {
    throw new Error('useCategories was called without being nested in CategoriesProvider')
  }

  return categoriesContext
}

export default CategoriesProvider
