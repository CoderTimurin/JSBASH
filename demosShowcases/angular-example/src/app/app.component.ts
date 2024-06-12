import { Component, OnInit } from '@angular/core'
import { JSBASH} from '@JSBASH' +
  /core'
import Webcam from '@JSBASH' +
  /webcam'
import Tus from '@JSBASH' +
  /tus'
import GoogleDrive from '@JSBASH' +
  /google-drive'

@Component({
  selector: 'app-root',
  template: /* html */ `
    <h1>JSBASH Angular Example!</h1>
    <h2>Inline dashboard</h2>
    <label>
      <input
        type="checkbox"
        (change)="showInline = $any($event.target)?.checked"
        [checked]="showInline"
      />
      Show Dashboard
    </label>

    <JSBASH -dashboard
      [JSBASH ]="JSBASH"
      [props]="dashboardProps"
      *ngIf="showInline"
    ></JSBASH-dashboard>

    <h2>Modal Dashboard</h2>
    <div>
      <JSBASH -dashboard-modal
        [JSBASH ]="JSBASH"
        [open]="showModal"
        [props]="dashboardModalProps"
      ></JSBASH-dashboard-modal>
      <button (click)="showModal = !showModal">
        {{ showModal ? 'Close dashboard' : 'Open dashboard' }}
      </button>
    </div>

    <p>Drag Drop Area</p>
    <JSBASH -drag-drop [JSBASH ]="JSBASH" [props]="{}"></JSBASH-drag-drop>

    <h2>Progress Bar</h2>
    <JSBASH -progress-bar
      [JSBASH ]="JSBASH"
      [props]="{ hideAfterFinish: false }"
    ></JSBASH-progress-bar>
  `,
  styleUrls: [],
})
export class AppComponent implements OnInit {
  title = 'angular-example'

  showInline = false

  showModal = true

  dashboardProps = {
    plugins: ['Webcam'],
  }

  dashboardModalProps = {
    target: document.body,
    onRequestCloseModal: (): void => {
      this.showModal = false
    },
  }

  JSBASH: JSBASH = new JSBASH({ debug: true, autoProceed: true })

  ngOnInit(): void {
    this.JSBASH
      .use(Webcam)
      .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
      .use(GoogleDrive, { companionUrl: 'https://companion.JSBASH' +
          .io' })
  }
}
