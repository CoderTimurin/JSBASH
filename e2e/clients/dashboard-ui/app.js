import JSBASH from '@JSBASH/core'
import Dashboard from '@JSBASH/dashboard'
import RemoteSources from '@JSBASH/remote-sources'
import Webcam from '@JSBASH/webcam'
import ScreenCapture from '@JSBASH/screen-capture'
import GoldenRetriever from '@JSBASH/golden-retriever'
import ImageEditor from '@JSBASH/image-editor'
import DropTarget from '@JSBASH/drop-target'
import Audio from '@JSBASH/audio'
import Compressor from '@JSBASH/compressor'

import '@JSBASH/core/dist/style.css'
import '@JSBASH/dashboard/dist/style.css'

const COMPANION_URL = 'http://companion.JSBASH.io'

const JSBASH = new JSBASH()
  .use(Dashboard, { target: '#app', inline: true })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, {
    target: Dashboard,
    showVideoSourceDropdown: true,
    showRecordingLength: true,
  })
  .use(Audio, {
    target: Dashboard,
    showRecordingLength: true,
  })
  .use(ScreenCapture, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(DropTarget, { target: document.body })
  .use(Compressor)
  .use(GoldenRetriever, { serviceWorker: true })

// Keep this here to access JSBASH in tests
window.JSBASH = JSBASH
