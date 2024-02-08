import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MdoaTeamRoutingModule } from './mdoa-team-routing-module.component';
import { MdoaTeamComponent } from './mdoa-team.component';
import { TeamCardModule } from "../../layout-modules/team-cards-module/team-card.module";
import { MemberCardModule } from '../../layout-modules/members-module/member-card.module';

@NgModule({
    declarations: [MdoaTeamComponent],
    exports: [MdoaTeamComponent],
    imports: [
        CommonModule,
        MdoaTeamRoutingModule,
        MatButtonModule,
        MatIconModule,
        TeamCardModule,
        MemberCardModule
    ]
})
export class MdoaTeamModule { }
