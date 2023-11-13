import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRouting} from './app.routing';
import {AppComponent} from './app.component';
import { ImpressComponent } from './impress/impress.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TaxTableComponent } from './tax-table/tax-table.component';
import { CreateMenubarComponent } from './create-menubar/create-menubar.component';
import { PowerInputComponent } from './power-input/power-input.component';
import { FileInputComponent } from './file-input/file-input.component';
import { ListInputComponent } from './list-input/list-input.component';
import { CreateOptionsComponent } from './create-options/create-options.component';
import { FaqComponent } from './faq/faq.component';
import { ExampleComponent } from './example/example.component';
import {TermsOfServicePageComponent} from './terms-of-service-page/terms-of-service-page.component';
import {PrivacyConsentBannerComponent} from './privacy-consent-banner/privacy-consent-banner.component';
import {PrivacyPolicyPageComponent} from './privacy-policy-page/privacy-policy-page.component';
import {FooterComponent} from './footer/page-footer';
import {UserInputService} from './user-input.service';
import { ResultPageComponent } from './result-page/result-page.component';
import { HomeComponent } from './home/home.component';

// Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {NamesService} from './names.service';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { faUpload} from '@fortawesome/free-solid-svg-icons';



@NgModule({
  declarations: [
    AppComponent,
    ImpressComponent,
    TitleBarComponent,
    NavBarComponent,
    TaxTableComponent,
    CreateMenubarComponent,
    PowerInputComponent,
    FileInputComponent,
    ListInputComponent,
    CreateOptionsComponent,
    FaqComponent,
    ExampleComponent,
    ResultPageComponent,
    TermsOfServicePageComponent,
    PrivacyConsentBannerComponent,
    PrivacyPolicyPageComponent,
    FooterComponent,
    HomeComponent,
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRouting,
        BrowserAnimationsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatStepperModule,
        MatTabsModule,
        MatExpansionModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        FontAwesomeModule,
    ],
  providers: [
      NamesService,
      UserInputService,
      TaxTableComponent,
      ResultPageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        // Add an icon to the library for convenient access in other components
        library.addIcons(faCoffee);
        library.addIcons(faUpload);
        library.addIcons(faFileUpload);
    }
}

