import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from 'ng-custom-select';
import { NgxMaskModule } from 'ngx-mask';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { HomeComponent } from './pages/home/home.component';
import { EstablishmentDetailsComponent } from './pages/establishment-details/establishment-details.component';

import { EstablishmentCardComponent } from './components/establishment-card/establishment-card.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { RoundButtonComponent } from './components/round-button/round-button.component';
import { AppConfigModule } from './appconfig.module';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EstablishmentDetailsComponent,
    EstablishmentCardComponent,
    FormInputComponent,
    RoundButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FontAwesomeModule,
    NgxMaskModule.forRoot(),
    AppConfigModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faArrowLeft);
  }
}
