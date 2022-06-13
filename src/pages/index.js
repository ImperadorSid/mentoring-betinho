import AllProviders from '../providers/AllProviders'
import Head from 'next/head'
import { Home } from '../components'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Betinho</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <AllProviders>
        <Home />
      </AllProviders>
    </>
  )
}

export default HomePage
