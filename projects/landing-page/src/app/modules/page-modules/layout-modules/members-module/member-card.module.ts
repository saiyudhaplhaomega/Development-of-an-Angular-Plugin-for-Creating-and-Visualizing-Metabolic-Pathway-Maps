import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MemberCardComponent } from './member-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [MemberCardComponent],
    exports: [MemberCardComponent],
    imports: [CommonModule, MatButtonModule, RouterModule, MatTableModule]
})
export class MemberCardModule {}
