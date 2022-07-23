import '../styles/globals.css'
import '../context/QuioscoProvider'
import { QuioscoProvider } from '../context/QuioscoProvider'

function MyApp({ Component, pageProps }) {
  return (
    <QuioscoProvider>
      <Component {...pageProps} />
    </QuioscoProvider>
  )
}

export default MyApp
