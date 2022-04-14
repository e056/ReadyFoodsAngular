import { Injectable } from '@angular/core';
import { AccessRightEnum } from '../models/access-right-enum';
import { Staff } from '../models/staff';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getIsLogin(): boolean {
    if (sessionStorage['isLogin'] == "true") {
      return true;
    }
    else {
      return false;
    }
  }

  setIsLogin(isLogin: boolean) {
    sessionStorage['isLogin'] = isLogin;
  }

  getCurrentStaff(): Staff {
    return JSON.parse(sessionStorage['currentStaff']);
  }



  setCurrentStaff(currentStaff: Staff | null): void {
    sessionStorage['currentStaff'] = JSON.stringify(currentStaff);
  }



  getUsername(): string {
    return sessionStorage['username'];
  }



  setUsername(username: string | undefined): void {
    sessionStorage['username'] = username;
  }



  getPassword(): string {
    return sessionStorage['password'];
  }



  setPassword(password: string | undefined): void {
    sessionStorage['password'] = password;
  }

  checkAccessRight(path: string): boolean {
    console.log("********** path: " + path);

    if (this.getIsLogin()) {
      let staff: Staff = this.getCurrentStaff();

      if (staff.staffType == AccessRightEnum.MODERATOR) {
        if (path == "/customerManagement/viewAllCustomers" ||
          path == "/customerManagement/viewCustomerDetails" ||
          path == "/contentManagement/viewAllRecipes" ||
          path == "/contentManagement/ViewRecipeDetails") {
          return true;
        }
        else {
          return false;
        }
      }
      else if (staff.staffType == AccessRightEnum.ADMINISTRATOR) {
        if (path == "/customerManagement/viewAllCustomers" ||
          path == "/customerManagement/viewCustomerDetails" ||
          path == "/contentManagement/CreateNewIngredient" ||
          path == "/contentManagement/CreateNewRecipe" ||
          path == "/contentManagement/updateRecipe" ||
          path == "/contentManagement/viewAllRecipes" ||
          path == "/contentManagement/ViewRecipeDetails" ||
          path == "/contentManagement/viewAllIngredients" ||
          path == "/contentManagement/viewIngredientDetails" ||
          path == "/staffManagement/createNewStaff" ||
          path == "/staffManagement/viewAllStaffs" ) {
          return true;
        }
        else {
          return false;
        }
      }

      return false;
    }
    else {
      return false;
    }
  }

}
