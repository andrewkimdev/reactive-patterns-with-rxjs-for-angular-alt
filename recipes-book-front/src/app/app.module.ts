// Angular Core Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// 3rd Party Vendor Modules
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';

// Application Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './home/home.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';

// Router Module
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    // Angular Core Modules
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,

    // 3rd Party Vendor Modules
    ButtonModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    PanelModule,
    RatingModule,
    RippleModule,

    // Router Module
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
