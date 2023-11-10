// based of this concept: https://dev.to/sp90/angular-reactive-forms-conditional-validation-4aop
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MetadataQuestComponent } from './metadata-quest.component';
import { MetadataQuestRoutingModule } from './metadata-quest-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [MetadataQuestComponent],
  imports: [
    // base imports
    CommonModule,
    ReactiveFormsModule,

    //material design imports
    MetadataQuestRoutingModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MetadataQuestComponent, // Export if it will be used outside the module
  ],
})
export class MetadataQuestModule {} // Make sure this matches the class name exactly
