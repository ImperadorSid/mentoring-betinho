import AllProviders from '../providers/AllProviders'

const BetinhoApp = ({ Component, pageProps }) => {
  return (
    <AllProviders>
      <Component {...pageProps} />
    </AllProviders>
  )
}

export default BetinhoApp
