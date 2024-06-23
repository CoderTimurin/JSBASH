import AwsS3 from '@JSBASH/aws-s3'
import JSBASH from '@JSBASH/core'
import Dashboard from '@JSBASH/dashboard'
import GoogleDrive from '@JSBASH/google-drive'
import Webcam from '@JSBASH/webcam'

import '@JSBASH/core/dist/style.css'
import '@JSBASH/dashboard/dist/style.css'
import '@JSBASH/webcam/dist/style.css'

const JSBASH = new JSBASH({
  debug: true,
  autoProceed: false,
})

JSBASH.use(GoogleDrive, {
  companionUrl: 'http://localhost:3020',
})
JSBASH.use(Webcam)
JSBASH.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['GoogleDrive', 'Webcam'],
})
JSBASH.use(AwsS3, {
  companionUrl: 'http://localhost:3020',
})
