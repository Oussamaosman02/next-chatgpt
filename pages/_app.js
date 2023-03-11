import '@/styles/globals.css'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'

export default function App ({ Component, pageProps }) {
  return (
    <>
      <Script id='matomo' strategy='afterInteractive'>
        {`
  var _paq = window._paq = window._paq || []
  _paq.push(['trackPageView'])
  _paq.push(['enableLinkTracking'])
  (function() {
    var u='https://creal.matomo.cloud/'
    _paq.push(['setTrackerUrl', u+'matomo.php'])
    _paq.push(['setSiteId', '1'])
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]
    g.async=true g.src='//cdn.matomo.cloud/creal.matomo.cloud/matomo.js' s.parentNode.insertBefore(g,s)
  })()
    `}
      </Script>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
