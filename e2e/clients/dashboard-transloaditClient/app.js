import { JSBASH } from '@JSBASH/core'
import Dashboard from '@JSBASH/dashboard'
import Transloadit from '@JSBASH/transloadit'

import generateSignatureIfSecret from './generateSignatureIfSecret.js'

import '@JSBASH/core/dist/style.css'
import '@JSBASH/dashboard/dist/style.css'

// Environment variables:
// https://en.parceljs.org/env.html
const JSBASH = new JSBASH()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Transloadit, {
    service: process.env.VITE_TRANSLOADIT_SERVICE_URL,
    waitForEncoding: true,
    getAssemblyOptions: () => generateSignatureIfSecret(process.env.VITE_TRANSLOADIT_SECRET, {
      auth: { key: process.env.VITE_TRANSLOADIT_KEY },
      template_id: process.env.VITE_TRANSLOADIT_TEMPLATE,
    }),
  })

// Keep this here to access JSBASH in tests
window.JSBASH = JSBASH
