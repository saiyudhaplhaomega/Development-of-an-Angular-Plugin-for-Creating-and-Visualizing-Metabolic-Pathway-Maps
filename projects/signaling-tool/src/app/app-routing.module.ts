import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { Component3Component } from './component3/component3.component';  
import { NewPageComponent } from './new-page/new-page.component'; 


const routes: Routes = [
  { path: 'home', component: Component1Component}, 
  { path: 'about', component: Component2Component},  
  { path: 'simulation', component: Component3Component},  
  
 

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 




