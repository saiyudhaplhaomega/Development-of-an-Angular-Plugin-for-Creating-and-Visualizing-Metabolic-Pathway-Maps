import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MetadataUploadContainerComponent } from "./metadata-uploadpage.component";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MetadataUploadpageRoutingModule } from "./metadata-uploadpage-routing.module";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { ProgressBarComponent } from "./progress-bar/progress-bar.component";
import { SelectionComponent } from "./pipeline-selection/pipeline-selection.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { MatTableModule } from "@angular/material/table";
import { MatGridListModule } from "@angular/material/grid-list";
import { MetadataQuestFormModule } from "../metadata-quest-form/metadata-quest.module";
import { MatStepperModule } from "@angular/material/stepper";
import { WorkflowModule } from "../../pages/metadata-workflow-page/metadata-workflow.module";
import { MetaDataCheckboxSelectionModule } from "../metadata-checkboxselection/metadata-checkboxselection.module";
import { MetadataDownloadpageModule } from "../../pages/metadata-download-page/metadata-downloadpage.module";

@NgModule({
  declarations: [
    MetadataUploadContainerComponent,
    ProgressBarComponent,
    SelectionComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    MetadataQuestFormModule,

    // material
    MatIconModule,
    MatProgressBarModule,
    MetadataUploadpageRoutingModule,
    MatTooltipModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatGridListModule,
    MatStepperModule,
    WorkflowModule,
    MetaDataCheckboxSelectionModule,
    MetadataDownloadpageModule
  ],
  exports: [
    MetadataUploadContainerComponent,
    ProgressBarComponent,
    SelectionComponent,
    FileUploadComponent
  ]
})
export class MetadataUploadContainerModule {}
