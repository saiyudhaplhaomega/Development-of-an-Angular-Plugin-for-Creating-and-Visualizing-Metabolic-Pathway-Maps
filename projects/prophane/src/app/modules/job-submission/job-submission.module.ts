import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StandardPageLayoutModule } from 'shared-lib';
import { JobAnnotationComponent } from './components/job-annotation/job-annotation.component';
import { JobCustomMapComponent } from './components/job-custom-map/job-custom-map.component';
import { JobFunctionComponent } from './components/job-function/job-function.component';
import { JobInputComponent } from './components/job-input/job-input.component';
import { JobLcaComponent } from './components/job-lca/job-lca.component';
import { JobQuantificationComponent } from './components/job-quantification/job-quantification.component';
import { JobSampleGroupsComponent } from './components/job-sample-groups/job-sample-groups.component';
import { JobSubmitComponent } from './components/job-submit/job-submit.component';
import { JobTaxonomyComponent } from './components/job-taxonomy/job-taxonomy.component';
import { ProphaneJobSubmissionMainComponent } from './components/prophane-job-submission-main/prophane-job-submission-main.component';
import { JobStepperComponent } from './job-stepper/job-stepper.component';
import { JobSubmissionRoutingModule } from './job-submission-routing.module';



@NgModule({
  declarations: [
    ProphaneJobSubmissionMainComponent,
    JobAnnotationComponent,
    JobFunctionComponent,
    JobInputComponent,
    JobLcaComponent,
    JobCustomMapComponent,
    JobSubmitComponent,
    JobQuantificationComponent,
    JobStepperComponent,
    JobSampleGroupsComponent,
    JobTaxonomyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    JobSubmissionRoutingModule,
    StandardPageLayoutModule, // replace with specific component (file-input)
    MatStepperModule,
    MatSlideToggleModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    // COMPILES WITHOUT THESE, BUT SOME MAY BE NECESSARY FOR STYLES
    //MatDividerModule,
    //A11yModule,
    //CdkStepperModule,
    //CdkTableModule,
    //CdkTreeModule,
    //CdkAccordionModule,
    //DragDropModule,
    //MatAutocompleteModule,
    //MatBadgeModule,
    //MatBottomSheetModule,
    //MatButtonToggleModule,
    //MatCardModule,
    //MatCheckboxModule,
    //MatChipsModule,
    //MatStepperModule,
    //MatDatepickerModule,
    //MatDialogModule,
    //MatDividerModule,
    //MatExpansionModule,
    //MatGridListModule,
    //MatIconModule,
    //MatInputModule,
    //MatListModule,
    //MatMenuModule,
    //MatNativeDateModule,
    //MatPaginatorModule,
    //MatProgressBarModule,
    //MatProgressSpinnerModule,
    //MatRadioModule,
    //MatRippleModule,
    //MatSidenavModule,
    //MatSliderModule,
    //MatSlideToggleModule,
    //MatSnackBarModule,
    //MatSortModule,
    //MatTableModule,
    //MatTabsModule,
    //MatToolbarModule,
    //MatTooltipModule,
    //MatTreeModule,
    //PortalModule,
    //ScrollingModule,
  ]
})
export class JobSubmissionModule { }
