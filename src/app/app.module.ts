import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { SimpleComponent } from './layouts/simple/simple.component';
import { HomeComponent } from './pages/home/home.component';
import { NumberCardComponent } from './components/number-card/number-card.component';
import { HttpClientModule } from '@angular/common/http';
import { NumberCardsComponent } from './components/number-cards/number-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleComponent,
    HomeComponent,
    NumberCardComponent,
    NumberCardsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
