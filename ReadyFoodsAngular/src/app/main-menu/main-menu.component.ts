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
        label: "View all customers",
        routerLink: 'customerManagement/viewAllCustomers'
      },
      {
        label: "View all enquiries",
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
        label: 'Create new recipe',
        routerLink: 'contentManagement/CreateNewRecipe'
      },
      {
        label: 'Create new ingredient',
        routerLink: 'contentManagement/CreateNewIngredient'
      },
      {
        label: 'Create new category',
        routerLink: 'contentManagement/CreateNewCategory'
      }]
    },
    {
      label: "Staff Management",
      icon: 'pi pi-user',
      items: [{
        label: "Create new staff",
        routerLink: 'staffManagement/CreateNewStaff'
      },
      {
        label: "View all staffs",
        routerLink: 'staffManagement/viewAllStaff'
      }]
    },
    {
      label: "Customer Management",
      icon: 'pi pi-user-plus',
      items: [{
        label: "View all customers",
        routerLink: 'customerManagement/viewAllCustomers'
      },
      {
        label: "View all enquiries",
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
