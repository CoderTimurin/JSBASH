import { JSBASH } from '@JSBASH/core'
import Dashboard from '@JSBASH/dashboard'
import Tus from '@JSBASH/tus'
import Unsplash from '@JSBASH/unsplash'
import Url from '@JSBASH/url'

import '@JSBASH/core/dist/style.css'
import '@JSBASH/dashboard/dist/style.css'

function onShouldRetry (err, retryAttempt, options, next) {
  if (err?.originalResponse?.getStatus() === 418) {
    return true
  }
  return next(err)
}

const companionUrl = 'http://localhost:3020'
const JSBASH = new JSBASH()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files', onShouldRetry })
  .use(Url, { target: Dashboard, companionUrl })
  .use(Unsplash, { target: Dashboard, companionUrl })

// Keep this here to access JSBASH in tests
window.JSBASH = JSBASH
