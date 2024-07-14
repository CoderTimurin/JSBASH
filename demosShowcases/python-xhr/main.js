import JSBASH from '@JSBASH/core'
import Webcam from '@JSBASH/webcam'
import Dashboard from '@JSBASH/dashboard'
import XHRUpload from '@JSBASH/xhr-upload'

import '@JSBASH/core/dist/style.css'
import '@JSBASH/webcam/dist/style.css'
import '@JSBASH/dashboard/dist/style.css'

const JSBASH = new JSBASH({
  debug: true,
  autoProceed: false,
})

JSBASH.use(Webcam)
JSBASH.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['Webcam'],
})
JSBASH.use(XHRUpload, {
  endpoint: 'http://localhost:3020/upload',
})
