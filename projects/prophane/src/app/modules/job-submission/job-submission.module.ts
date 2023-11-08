import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { A11yModule } from '@angular/cdk/a11y';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatTreeModule } from '@angular/material/tree';
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
