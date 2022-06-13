import axios from 'axios'

const AccountApiService = () => {
  const getAccount = async () => {
    const { data: account } = await axios.get('http://localhost:3001/account')

    return account
  }

  return {
    getAccount,
  }
}

export default AccountApiService
