//<reference path="../../../node_modules/@angular/platform-browser/src/browser.d.ts"/>
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafePipe } from './safe.pipe';
import { MaterialModule } from 'projects/mpa/src/app/material-module';

import { LoginModule } from 'shared-lib';
import { ProphaneRoutingModule } from './prophane-routing.module';
import { UploadDialogComponent } from 'projects/mpa/src/app/core/components/dialog/upload-dialog.component';

import { ProphaneJobControlComponent } from './components/prophane-job-control/prophane-job-control.component';
import { ProphaneAboutComponent } from './components/prophane-about/prophane-about.component';
// import {ProphaneJobSubmissionDialogComponent} from '../core/services/prophane-job-submission-dialog';
import { ProphaneResultViewComponent } from './components/prophane-result-view/prophane-result-view.component';
import { SideBarResultsComponent } from './components/side-bar-results/side-bar-results.component';
import { ProphaneJobSubmissionMainComponent } from './components/prophane-job-submission-main/prophane-job-submission-main.component';
import { JobStepperComponent } from './components/job-stepper/job-stepper.component';
import { JobInputComponent } from './components/job-input/job-input.component';
import { JobSampleGroupsComponent } from './components/job-sample-groups/job-sample-groups.component';
import { JobQuantificationComponent } from './components/job-quantification/job-quantification.component';
import { JobTaxonomyComponent } from './components/job-taxonomy/job-taxonomy.component';
import { JobFunctionComponent } from './components/job-function/job-function.component';
import { JobSubmitComponent } from './components/job-submit/job-submit.component';
import { JobAnnotationComponent } from './components/job-annotation/job-annotation.component';
import { FileInputComponent } from 'projects/mpa/src/app/core/components/file-input/file-input.component';
import { UploadProgressService } from 'projects/mpa/src/app/core/services/upload-progress.service';
import { JobLcaComponent } from './components/job-lca/job-lca.component';
import { ProphaneHelpComponent } from './components/prophane-help/prophane-help.component';
import { ProphaneTutorialComponent } from './components/prophane-tutorial/prophane-tutorial.component';
import { JobCustomMapComponent } from './components/job-custom-map/job-custom-map.component';


@NgModule({
  declarations: [
    ProphaneJobControlComponent,
    ProphaneAboutComponent,
    ProphaneJobSubmissionMainComponent,
    ProphaneResultViewComponent,
    SafePipe,
    SideBarResultsComponent,
    ProphaneResultViewComponent,
    //ProphaneJobSubmissionMainComponent,
    JobStepperComponent,
    JobInputComponent,
    JobInputComponent,
    FileInputComponent,
    UploadDialogComponent,
    JobSampleGroupsComponent,
    JobQuantificationComponent,
    JobTaxonomyComponent,
    JobFunctionComponent,
    JobSubmitComponent,
    JobAnnotationComponent,
    JobLcaComponent,
    ProphaneHelpComponent,
    ProphaneTutorialComponent,
    JobCustomMapComponent,
  ],
  providers: [
    UploadProgressService,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ProphaneRoutingModule,
    LoginModule,
    // material module last
    MaterialModule,
  ],
  // entryComponents: [ProphaneJobSubmissionDialogComponent],
  exports: [
    ProphaneAboutComponent,
    UploadDialogComponent,
    ProphaneAboutComponent,
    ProphaneResultViewComponent,
  ],
})
export class ProphaneModule {}
