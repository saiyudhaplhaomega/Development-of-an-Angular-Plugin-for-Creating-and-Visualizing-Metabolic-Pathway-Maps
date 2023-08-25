import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavToolbarModule } from "../../../shared-lib/src/lib/nav-toolbar/nav-toolbar.module";
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from 'shared-lib';


@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NavToolbarModule,
        HttpClientModule,
        LoginModule,
    ]
})
export class AppModule { }
