import JSBASH from '@JSBASH/core'
import Dashboard from '@JSBASH/dashboard'
import Compressor from '@JSBASH/compressor'

import '@JSBASH/core/dist/style.css'
import '@JSBASH/dashboard/dist/style.css'

const JSBASH = new JSBASH()
  .use(Dashboard, {
    target: document.body,
    inline: true,
  })
  .use(Compressor, {
    mimeType: 'image/webp',
  })

// Keep this here to access JSBASH in tests
window.JSBASH = JSBASH
