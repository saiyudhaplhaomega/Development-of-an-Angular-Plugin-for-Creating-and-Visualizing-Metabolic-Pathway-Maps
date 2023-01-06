import {NgModule} from '@angular/core';
import {Routing} from './app.routing';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {OAuthModule} from 'angular-oauth2-oidc';
import {MaterialModule} from './material-module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';

import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './core/components/login-page/login-page.component';
import {WebserveraddressService} from './core/services/webserveraddress.service';
import {UploadProgressService} from './core/services/upload-progress.service';
import {UploadDialogComponent} from './core/components/dialog/upload-dialog.component';
import {NavigationBarComponent} from './core/components/navigation-bar/navigation-bar.component';
import {FooterComponent} from './core/components/footer/page-footer';
import {AuthGuard} from './core/services/auth-guard.service';
import {TermsOfServicePageComponent} from './core/components/terms-of-service-page/terms-of-service-page.component';
import {PrivacyPolicyPageComponent} from './core/components/privacy-policy-page/privacy-policy-page.component';
import {ImpressumPageComponent} from './core/components/impressum-page/impressum-page.component';
import {PrivacyConsentBannerComponent} from './core/components/privacy-consent-banner/privacy-consent-banner.component';
import {GlobalHttpInterceptorService} from './core/services/global-http-interceptor.service';

import {DbsearchcontentService} from './mpa/components/database-search-page/services/dbsearchcontent.service';
import {DataService2} from './mpa/components/data-navigation-tree/services/data2.service';
import {NavService2} from './mpa/components/data-navigation-tree/services/nav2.service';
import {ProphaneModule} from './prophane/prophane.module';
import {MpaModule} from './mpa/mpa.module';

import {ProphaneAboutComponent} from './prophane/components/prophane-policy-consent/prophane-policy-consent.component';
import {ErrorPageComponent} from './error-page/error-page-component/error-page.component';
import {NgChartsModule} from 'ng2-charts';

@NgModule({
    // components
    declarations: [
        AppComponent,
        LoginPageComponent,
        NavigationBarComponent,
        FooterComponent,
        TermsOfServicePageComponent,
        PrivacyPolicyPageComponent,
        ImpressumPageComponent,
        PrivacyConsentBannerComponent,
        ProphaneAboutComponent,
        UploadDialogComponent,
        ErrorPageComponent,
    ],
    // modules - functionally bundled components, directives, services, etc.
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        Routing,
        HttpClientModule,
        OAuthModule.forRoot(),
        CommonModule,
        FlexLayoutModule,
        HttpClientModule,
        MpaModule,
        ProphaneModule,
        MaterialModule,
        NgChartsModule
    ],
    // services
    providers: [
        HttpClient,
        AuthGuard,
        WebserveraddressService,
        UploadProgressService,
        DbsearchcontentService,
        NavService2,
        DataService2,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalHttpInterceptorService,
            multi: true
        }
    ],
    exports: [],
    // components loaded during bootstrapping
    bootstrap: [AppComponent]
})


export class AppModule {
}
