import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {TermsOfServicePageComponent} from './terms-of-service-page/terms-of-service-page.component';
import {PrivacyPolicyPageComponent} from './privacy-policy-page/privacy-policy-page.component';
import {ImpressComponent} from './impress/impress.component';
import {HomeComponent} from './home/home.component'


const routes: Routes = [
    { path: 'termsofservice', component: TermsOfServicePageComponent},
    { path: 'privacypolicy', component: PrivacyPolicyPageComponent},
    { path: 'impressum', component: ImpressComponent},
    { path: '**', component: HomeComponent },
];
//export const Routing = RouterModule.forRoot(appRoutes);
//export const Routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouting { }

