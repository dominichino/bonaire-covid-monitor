import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SimpleComponent } from './layouts/simple/simple.component';
import { HomeComponent } from './pages/home/home.component';
import { NumberCardComponent } from './components/number-card/number-card.component';
import { NumberCardsComponent } from './components/number-cards/number-cards.component';
import { CasesOverviewComponent } from './components/cases-overview/cases-overview.component';
import { CasesOverTimeComponent } from './components/cases-over-time/cases-over-time.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleComponent,
    HomeComponent,
    NumberCardComponent,
    NumberCardsComponent,
    CasesOverviewComponent,
    CasesOverTimeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [ {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},],
  bootstrap: [AppComponent],
})
export class AppModule {}
