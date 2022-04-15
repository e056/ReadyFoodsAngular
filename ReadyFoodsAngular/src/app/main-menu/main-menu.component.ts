import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from '../services/session.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  itemsAdmin: MenuItem[] = [];
  itemsMod: MenuItem[] = [];
  itemsNotLoggedIn: MenuItem[] = [];

  constructor(private router: Router,
    public sessionService: SessionService,
  ) {
  }

  ngOnInit(): void {

    this.itemsNotLoggedIn = [{
      label: 'Home',
      items: [{
        label: 'Home Page',
        icon: 'pi pi-home',
        routerLink: 'index'
      }
      ]
    }];

    this.itemsMod = [{
      label: 'Home',
      items: [{
        label: 'Home Page',
        icon: 'pi pi-home',
        routerLink: 'index'
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: (event: any) => { this.staffLogout() }
      }]
    },
    {
      label: "Customer Management",
      icon: 'pi pi-user-plus',
      items: [{
        label: "View All Customers",
        routerLink: 'customerManagement/viewAllCustomers'
      },
      {
        label: "View All Enquiries",
        routerLink: 'customerManagement/viewAllEnquiries'
      }]
    }];


    this.itemsAdmin = [{
      label: 'Home',
      items: [{
        label: 'Home Page',
        icon: 'pi pi-home',
        routerLink: 'index'
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: (event: any) => { this.staffLogout() }
      }]
    },
    {
      label: "Content Management",
      icon: 'pi pi-folder',
      items: [{
        label: 'Create New Recipe',
        routerLink: 'contentManagement/CreateNewRecipe'
      },
      {
        label: 'Create New Ingredient',
        routerLink: 'contentManagement/CreateNewIngredient'
      },
      {
        label: 'Create New Category',
        routerLink: 'contentManagement/CreateNewCategory'
      }]
    },
    {
      label: "Staff Management",
      icon: 'pi pi-user',
      items: [{
        label: "Create New Staff",
        routerLink: 'staffManagement/createNewStaff'
      },
      {
        label: "View All Staffs",
        routerLink: 'staffManagement/viewAllStaff'
      }]
    },
    {
      label: "Customer Management",
      icon: 'pi pi-user-plus',
      items: [{
        label: "View All Customers",
        routerLink: 'customerManagement/viewAllCustomers'
      },
      {
        label: "View All Enquiries",
        routerLink: 'customerManagement/viewAllEnquiries'
      }]
    }];

  }

  staffLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentStaff(null);

    this.router.navigate(["/index"]);
  }
}
