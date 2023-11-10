// questionnaire.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MetadataQuestComponent } from './metadata-quest.component';
import { MetadataQuestRoutingModule } from './metadata-quest-routing.module';

@NgModule({
  declarations: [MetadataQuestComponent],
  imports: [CommonModule, ReactiveFormsModule, MetadataQuestRoutingModule],
  exports: [
    MetadataQuestComponent, // Export if it will be used outside the module
  ],
})
export class MetadataQuestModule {} // Make sure this matches the class name exactly
