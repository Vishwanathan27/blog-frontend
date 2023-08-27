import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Header from '../components/Header/Header'
import "bootstrap/dist/css/bootstrap.min.css";
import BlogProvider from '../provider/BlogProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (<div className='App'><Header /><BlogProvider><Component {...pageProps} /></BlogProvider></div>)
}
