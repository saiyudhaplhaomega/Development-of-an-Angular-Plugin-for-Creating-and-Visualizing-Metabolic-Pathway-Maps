// workflow.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowComponent } from './workflow.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: WorkflowComponent }
];

@NgModule({
  declarations: [WorkflowComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WorkflowModule { }

