import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MetadataQuestComponent } from './metadata-quest.component';

@NgModule({
  declarations: [ MetadataQuestComponent ],
  imports: [
    CommonModule,
    MatIconModule,  
    MatButtonModule,
  ],
  exports: [MetadataQuestComponent]
})
export class MetadataQuestModule { }
