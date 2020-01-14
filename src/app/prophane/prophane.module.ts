///<reference path="../../../node_modules/@angular/platform-browser/src/browser.d.ts"/>
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProphaneJobControlComponent} from './components/prophane-job-control/prophane-job-control.component';
import {ProphaneViewerComponent} from './prophane-viewer.component';
import {ProphaneAboutComponent} from './components/prophane-about/prophane-about.component';
import {ProphaneJobSubmissionComponent} from './components/prophane-job-submission/prophane-job-submission.component';
import {MaterialModule} from '../material-module';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {Routing} from '../app.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {prophaneReportStyles} from './objects/prophaneFormData';

@NgModule({
  declarations: [
    ProphaneJobSubmissionComponent,
    ProphaneViewerComponent,
    ProphaneJobControlComponent,
    ProphaneAboutComponent,
  ],
  imports: [
    CommonModule,
    Routing,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    // material module last
    MaterialModule,
  ],
  exports: [
    ProphaneViewerComponent,
  ]
})

export class ProphaneModule { }
