// Angular Core Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 3rd Party Vendor Modules
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';

// Application Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './home/home.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesFilterComponent } from './recipes-filter/recipes-filter.component';

// Router Module
import { AppRoutingModule } from './app-routing.module';
import { RecipeCreationComponent } from './recipe-creation/recipe-creation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    HeaderComponent,
    HomeComponent,
    RecipesFilterComponent,
    RecipeCreationComponent,
    RecipeDetailsComponent,
  ],
  imports: [
    // Angular Core Modules
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    // 3rd Party Vendor Modules
    ButtonModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    MenubarModule,
    PanelModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,

    // Router Module
    AppRoutingModule,
     NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
