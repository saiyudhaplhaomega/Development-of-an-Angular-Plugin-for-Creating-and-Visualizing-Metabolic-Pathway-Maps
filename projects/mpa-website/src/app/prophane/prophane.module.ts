//<reference path="../../../node_modules/@angular/platform-browser/src/browser.d.ts"/>
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProphaneJobControlComponent } from './components/prophane-job-control/prophane-job-control.component';
import { ProphaneAboutComponent } from './components/prophane-about/prophane-about.component';
import { MaterialModule } from '../material-module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {ProphaneJobSubmissionDialogComponent} from '../core/services/prophane-job-submission-dialog';
import { ProphaneResultViewComponent } from './components/prophane-result-view/prophane-result-view.component';
import { SafePipe } from './safe.pipe';
import { SideBarResultsComponent } from './components/side-bar-results/side-bar-results.component';
import { ProphaneJobSubmissionMainComponent } from './components/prophane-job-submission-main/prophane-job-submission-main.component';
import { JobStepperComponent } from './components/job-stepper/job-stepper.component';
import { JobInputComponent } from './components/job-input/job-input.component';
import { FileInputComponent } from '../core/components/file-input/file-input.component';
import { JobSampleGroupsComponent } from './components/job-sample-groups/job-sample-groups.component';
import { JobQuantificationComponent } from './components/job-quantification/job-quantification.component';
import { JobTaxonomyComponent } from './components/job-taxonomy/job-taxonomy.component';
import { JobFunctionComponent } from './components/job-function/job-function.component';
import { JobSubmitComponent } from './components/job-submit/job-submit.component';
import { JobAnnotationComponent } from './components/job-annotation/job-annotation.component';
import { ProphaneRoutingModule } from './prophane-routing.module';

@NgModule({
  declarations: [
    ProphaneJobControlComponent,
    ProphaneAboutComponent,
    // ProphaneJobSubmissionDialogComponent,
    ProphaneResultViewComponent,
    SafePipe,
    SideBarResultsComponent,
    ProphaneJobSubmissionMainComponent,
    JobStepperComponent,
    JobInputComponent,
    FileInputComponent,
    JobSampleGroupsComponent,
    JobQuantificationComponent,
    JobTaxonomyComponent,
    JobFunctionComponent,
    JobSubmitComponent,
    JobAnnotationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ProphaneRoutingModule,
    // material module last
    MaterialModule,
  ],
  // entryComponents: [ProphaneJobSubmissionDialogComponent],
  exports: [],
})
export class ProphaneModule {}
