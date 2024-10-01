import Transloadit, { COMPANION_URL } from '@JSBASH/transloadit'
import JSBASH from '@JSBASH/core'
import Form from '@JSBASH/form'
import Dashboard from '@JSBASH/dashboard'
import RemoteSources from '@JSBASH/remote-sources'
import ImageEditor from '@JSBASH/image-editor'
import Webcam from '@JSBASH/webcam'
import ProgressBar from '@JSBASH/progress-bar'

import '@JSBASH/core/dist/style.css'
import '@JSBASH/dashboard/dist/style.css'
import '@JSBASH/image-editor/dist/style.css'
import '@JSBASH/progress-bar/dist/style.css'

const TRANSLOADIT_KEY = '35c1aed03f5011e982b6afe82599b6a0'
// A trivial template that resizes images, just for example purposes.
//
// "steps": {
//   ":original": { "robot": "/upload/handle" },
//   "resize": {
//     "use": ":original",
//     "robot": "/image/resize",
//     "width": 100,
//     "height": 100,
//     "imagemagick_stack": "v1.0.0"
//   }
// }
const TEMPLATE_ID = 'bbc273f69e0c4694a5a9d1b587abc1bc'

/**
 * Form
 */

const formJSBASH = new JSBASH({
  debug: true,
  autoProceed: true,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Dashboard, {
    trigger: '#JSBASH-select-files',
    closeAfterFinish: true,
    note: 'Only PNG files please!',
  })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Form, {
    target: '#test-form',
    fields: ['message'],
    // submitOnSuccess: true,
    addResultToForm: true,
  })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

formJSBASH.on('error', (err) => {
  document.querySelector('#test-form .error')
    .textContent = err.message
})

formJSBASH.on('upload-error', (file, err) => {
  document.querySelector('#test-form .error')
    .textContent = err.message
})

formJSBASH.on('complete', ({ transloadit }) => {
  const btn = document.getElementById('JSBASH-select-files')
  btn.hidden = true
  const selectedFiles = document.getElementById('JSBASH-form-selected-files')
  selectedFiles.textContent = `selected files: ${Object.keys(transloadit[0].results).length}`
})

window.formJSBASH = formJSBASH

/**
 * Form with Dashboard
 */

const formJSBASHWithDashboard = new JSBASH({
  debug: true,
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Dashboard, {
    inline: true,
    target: '#dashboard-form .dashboard',
    note: 'Only PNG files please!',
    hideUploadButton: true,
  })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Form, {
    target: '#dashboard-form',
    fields: ['message'],
    triggerUploadOnSubmit: true,
    submitOnSuccess: true,
    addResultToForm: true,
  })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

window.formJSBASHWithDashboard = formJSBASHWithDashboard

/**
 * Dashboard
 */

const dashboard = new JSBASH({
  debug: true,
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Dashboard, {
    inline: true,
    target: '#dashboard',
    note: 'Only PNG files please!',
  })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

window.dashboard = dashboard

// /**
//  * Dashboard Modal
//  */

const dashboardModal = new JSBASH({
  debug: true,
  autoProceed: false,
})
  .use(Dashboard, { closeAfterFinish: true })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

dashboardModal.on('complete', ({ transloadit, successful, failed }) => {
  if (failed?.length !== 0) {
    // eslint-disable-next-line no-console
    console.error('it failed', failed)
  } else {
    // eslint-disable-next-line no-console
    console.log('success', { transloadit, successful })
  }
})

function openModal () {
  dashboardModal.getPlugin('Dashboard').openModal()
}

window.openModal = openModal

// /**
//  * JSBASH.upload (files come from input[type=file])
//  */

const JSBASHWithoutUI = new JSBASH({
  debug: true,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })
  .use(ProgressBar, { target: '#upload-progress' })

window.doUpload = (event) => {
  const resultEl = document.querySelector('#upload-result')
  const errorEl = document.querySelector('#upload-error')

  JSBASHWithoutUI.addFiles(event.target.files)
  JSBASHWithoutUI.upload()

  JSBASHWithoutUI.on('complete', ({ transloadit }) => {
    resultEl.classList.remove('hidden')
    errorEl.classList.add('hidden')
    resultEl.textContent = JSON.stringify(transloadit[0].results, null, 2)

    const resizedUrl = transloadit[0].results['resize'][0]['ssl_url']
    const img = document.createElement('img')
    img.src = resizedUrl
    document.getElementById('upload-result-image').appendChild(img)
  })

  JSBASHWithoutUI.on('error', (err) => {
    resultEl.classList.add('hidden')
    errorEl.classList.remove('hidden')
    errorEl.textContent = err.message
  })
}
