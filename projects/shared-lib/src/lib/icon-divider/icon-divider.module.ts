import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IconDividerComponent } from './icon-divider.component';

@NgModule({
  declarations: [IconDividerComponent],
  imports: [CommonModule, MatIconModule],
  exports: [IconDividerComponent],
})
export class IconDividerModule {}
