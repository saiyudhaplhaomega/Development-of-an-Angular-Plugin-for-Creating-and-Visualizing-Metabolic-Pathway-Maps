import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard, LoginPageComponent } from 'dist/shared-lib';
import { ErrorPageComponent } from './components/error-page-component/error-page.component';
import { ImpressumPageComponent } from './components/impressum-page/impressum-page.component';
import { PrivacyPolicyPageComponent } from './components/privacy-policy-page/privacy-policy-page.component';
import { TermsOfServicePageComponent } from './components/terms-of-service-page/terms-of-service-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'mpa',
    canLoad: [AuthGuard], // loads module only if route guard allows it
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/mpa/mpa.module').then((m) => m.MpaModule),
  },
  { path: 'error', component: ErrorPageComponent }, // what is this used for??
  { path: 'termsofservice', component: TermsOfServicePageComponent },
  { path: 'privacypolicy', component: PrivacyPolicyPageComponent },
  { path: 'impressum', component: ImpressumPageComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
