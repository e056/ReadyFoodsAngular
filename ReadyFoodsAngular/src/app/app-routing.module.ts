import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';
import { CreateNewIngredientComponent } from './contentManagement/create-new-ingredient/create-new-ingredient.component';
import { CreateNewRecipeComponent } from './contentManagement/create-new-recipe/create-new-recipe.component';
import { UpdateRecipeComponent } from './contentManagement/update-recipe/update-recipe.component';
import { ViewAllIngredientsComponent } from './contentManagement/view-all-ingredients/view-all-ingredients.component';
import { ViewAllRecipesComponent } from './contentManagement/view-all-recipes/view-all-recipes.component';
import { ViewIngredientsDetailsComponent } from './contentManagement/view-ingredients-details/view-ingredients-details.component';
import { ViewRecipeDetailsComponent } from './contentManagement/view-recipe-details/view-recipe-details.component';
import { ViewAllCustomersComponent } from './customerManagement/view-all-customers/view-all-customers.component';
import { ViewCustomerDetailsComponent } from './customerManagement/view-customer-details/view-customer-details.component';
import { IndexComponent } from './index/index.component';
import { CreateNewStaffComponent } from './staffManagement/create-new-staff/create-new-staff.component';
import { ViewAllStaffsComponent } from './staffManagement/view-all-staffs/view-all-staffs.component';
import { ViewAllEnquiriesComponent } from './customerManagement/view-all-enquiries/view-all-enquiries.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'accessRightError', component: AccessRightErrorComponent },
  { path: 'contentManagement/CreateNewIngredient', component: CreateNewIngredientComponent},
  { path: 'contentManagement/CreateNewRecipe', component: CreateNewRecipeComponent},
  { path: 'contentManagement/updateRecipe', component: UpdateRecipeComponent},
  { path: 'contentManagement/viewAllRecipes', component: ViewAllRecipesComponent},
  { path: 'contentManagement/ViewRecipeDetails', component: ViewRecipeDetailsComponent},
  { path: 'contentManagement/viewAllIngredients', component: ViewAllIngredientsComponent},
  { path: 'contentManagement/viewIngredientDetails', component: ViewIngredientsDetailsComponent},
  { path: 'staffManagement/createNewStaff', component: CreateNewStaffComponent},
  { path: 'staffManagement/viewAllStaffs', component: ViewAllStaffsComponent},
  { path: 'customerManagement/viewAllCustomers', component: ViewAllCustomersComponent},
  { path: 'customerManagement/viewCustomerDetails', component: ViewCustomerDetailsComponent},
  { path: 'customerManagement/viewAllEnquiries', component: ViewAllEnquiriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
