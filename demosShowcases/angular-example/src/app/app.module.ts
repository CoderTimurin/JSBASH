import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import {
  JSBASHAngularDashboardModule,
  JSBASHAngularStatusBarModule,
  JSBASHAngularDragDropModule,
  JSBASHAngularProgressBarModule,
  JSBASHAngularDashboardModalModule,
} from '@JSBASH' +
  /angular'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    JSBASHAngularDashboardModule,
    JSBASHAngularStatusBarModule,
    JSBASHAngularDashboardModalModule,
    JSBASHAngularDragDropModule,
    JSBASHAngularProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
