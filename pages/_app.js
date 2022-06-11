import '../styles/globals.css'
import Footer from '../components/footer'

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen">
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default MyApp
