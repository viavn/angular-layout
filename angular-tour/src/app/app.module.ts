import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { FilterComponent } from './filter/filter.component';
import { MenuComponent } from './home/menu/menu.component';
import { ShellComponent } from './home/shell/shell.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';
import { StoreModule } from '@ngrx/store';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    MenuComponent,
    ShellComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ProductData),
    StoreModule.forRoot({}, {}),
    // MatTabsModule,
    // MatAutocompleteModule,
    // MatGridListModule,
    // ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
