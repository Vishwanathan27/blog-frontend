import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Header from '../components/Header/Header'
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return (<div className='App'><Header /><Component {...pageProps} /></div>)
}
