///<reference path="../../../node_modules/@angular/platform-browser/src/browser.d.ts"/>
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProphaneJobControlComponent} from './components/prophane-job-control/prophane-job-control.component';
import {ProphaneAboutComponent} from './components/prophane-about/prophane-about.component';
import {REFACTORING_prophaneJobSubmissionComponent} from './components/REFACTORING_prophane_job_submission/REFACTORING_prophane-job-submission.component';
import {MaterialModule} from '../material-module';
import {FormsModule} from '@angular/forms';
import {Routing} from '../app.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
// import {ProphaneJobSubmissionDialogComponent} from '../core/services/prophane-job-submission-dialog';
import { ProphaneResultViewComponent } from './components/prophane-result-view/prophane-result-view.component';
import { SafePipe } from './safe.pipe';
import { SideBarResultsComponent } from './components/side-bar-results/side-bar-results.component';
import { ProphaneJobSubmissionMainComponent } from './components/prophane-job-submission-main/prophane-job-submission-main.component';

@NgModule({
  declarations: [
    REFACTORING_prophaneJobSubmissionComponent,
    ProphaneJobControlComponent,
    ProphaneAboutComponent,
    // ProphaneJobSubmissionDialogComponent,
    ProphaneResultViewComponent,
    SafePipe,
    SideBarResultsComponent,
    ProphaneJobSubmissionMainComponent,
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
  // entryComponents: [ProphaneJobSubmissionDialogComponent],
  exports: []
})

export class ProphaneModule { }
