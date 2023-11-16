import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {CustomFieldWrapperComponent} from './custom-field-wrapper.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CustomFieldWrapperComponent],
  imports: [
    // other imports
    MatTooltipModule,
    MatIconModule,
    // ... other Angular Material modules you might be using
  ],
  // ...
})
export class CustomFieldWrapperModule {}
