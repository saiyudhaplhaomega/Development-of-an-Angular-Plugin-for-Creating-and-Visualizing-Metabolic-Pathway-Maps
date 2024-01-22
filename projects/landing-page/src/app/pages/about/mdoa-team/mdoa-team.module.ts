import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MdoaTeamRoutingModule } from './mdoa-team-routing-module.component';
import { MdoaTeamComponent } from './mdoa-team.component';

@NgModule({
  declarations: [MdoaTeamComponent],
  imports: [
    CommonModule,
    MdoaTeamRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [MdoaTeamComponent],
})
export class MdoaTeamModule { }
