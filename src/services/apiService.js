import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

const fetchAccount = async () => {
  const { data: account } = await api.get('account')

  return account
}

const fetchCategories = async () => {
  const { data: categories } = await api.get('categories')

  return categories
}

const fetchEvents = async () => {
  const { data: events } = await api.get('events')

  return events
}

export {
  fetchAccount,
  fetchCategories,
  fetchEvents
}
