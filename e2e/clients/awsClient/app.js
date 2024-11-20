import { JSBASH } from '@JSBASH/core'
import Dashboard from '@JSBASH/dashboard'
import AwsS3 from '@JSBASH/aws-s3'

import '@JSBASH/core/dist/style.css'
import '@JSBASH/dashboard/dist/style.css'

const JSBASH = new JSBASH()
  .use(Dashboard, { target: '#app', inline: true })
  .use(AwsS3, {
    limit: 2,
    companionUrl: process.env.VITE_COMPANION_URL,
  })

window.JSBASH = JSBASH
