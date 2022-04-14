import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {RatingModule} from 'primeng/rating';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';
import { CreateNewIngredientComponent } from './contentManagement/create-new-ingredient/create-new-ingredient.component';
import { CreateNewRecipeComponent } from './contentManagement/create-new-recipe/create-new-recipe.component';
import { UpdateRecipeComponent } from './contentManagement/update-recipe/update-recipe.component';
import { ViewAllRecipesComponent } from './contentManagement/view-all-recipes/view-all-recipes.component';
import { ViewRecipeDetailsComponent } from './contentManagement/view-recipe-details/view-recipe-details.component';
import { ViewAllIngredientsComponent } from './contentManagement/view-all-ingredients/view-all-ingredients.component';
import { ViewIngredientsDetailsComponent } from './contentManagement/view-ingredients-details/view-ingredients-details.component';
import { CreateNewStaffComponent } from './staffManagement/create-new-staff/create-new-staff.component';
import { ViewAllStaffsComponent } from './staffManagement/view-all-staffs/view-all-staffs.component';
import { ViewStaffDetailsComponent } from './staffManagement/view-staff-details/view-staff-details.component';
import { ViewAllCustomersComponent } from './customerManagement/view-all-customers/view-all-customers.component';
import { ViewCustomerDetailsComponent } from './customerManagement/view-customer-details/view-customer-details.component';
import { ViewAllEnquiriesComponent } from './customerManagement/view-all-enquiries/view-all-enquiries.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    MainMenuComponent,
    SidebarComponent,
    BreadcrumbComponent,
    AccessRightErrorComponent,
    CreateNewIngredientComponent,
    CreateNewRecipeComponent,
    UpdateRecipeComponent,
    ViewAllRecipesComponent,
    ViewRecipeDetailsComponent,
    ViewAllIngredientsComponent,
    ViewIngredientsDetailsComponent,
    CreateNewStaffComponent,
    ViewAllStaffsComponent,
    ViewStaffDetailsComponent,
    ViewAllCustomersComponent,
    ViewCustomerDetailsComponent,
    ViewAllEnquiriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    InputTextModule,
    PanelModule,
    DropdownModule,
    BrowserAnimationsModule,
    TableModule,
    PanelModule,
    ButtonModule,
    DialogModule,
    RatingModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
