import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from 'ng-custom-select';
import { NgxMaskModule } from 'ngx-mask';

import { HomeComponent } from './pages/home/home.component';
import { EstablishmentDetailsComponent } from './pages/establishment-details/establishment-details.component';

import { EstablishmentCardComponent } from './components/establishment-card/establishment-card.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EstablishmentDetailsComponent,
    EstablishmentCardComponent,
    InputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
