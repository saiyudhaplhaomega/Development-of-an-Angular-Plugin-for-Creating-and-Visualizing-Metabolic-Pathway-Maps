import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { MatButtonModule } from '@angular/material/button';

import { JobControlRoutingModule } from './job-control-routing.module';
import { ProphaneJobControlComponent } from './prophane-job-control/prophane-job-control.component';
//import { SideBarResultsComponent } from '../../components/side-bar-results/side-bar-results.component';



@NgModule({
  declarations: [
    ProphaneJobControlComponent,


  ],
  imports: [
    CommonModule,
    JobControlRoutingModule,
    MatButtonModule,
    // COMPILES WITHOUT THESE, BUT SOME MAY BE NECESSARY FOR STYLES
    // MatDividerModule,
    // MatStepperModule,
    // MatSlideToggleModule,
    // MatListModule,
    // A11yModule,
    // CdkStepperModule,
    // CdkTableModule,
    // CdkTreeModule,
    // CdkAccordionModule,
    // DragDropModule,
    // MatAutocompleteModule,
    // MatBadgeModule,
    // MatBottomSheetModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    // MatCardModule,
    // MatCheckboxModule,
    // MatChipsModule,
    //MatStepperModule,
    // MatDatepickerModule,
    // MatDialogModule,
    //MatDividerModule,
    // MatExpansionModule,
    // MatGridListModule,
    // MatIconModule,
    // MatInputModule,
    //MatListModule,
    // MatMenuModule,
    // MatNativeDateModule,
    // MatPaginatorModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatRippleModule,
    // MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    //MatSlideToggleModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatTableModule,
    // MatTabsModule,
    // MatToolbarModule,
    // MatTooltipModule,
    // MatTreeModule,
    // PortalModule,
    //ScrollingModule,
  ]
})
export class JobControlModule { }
