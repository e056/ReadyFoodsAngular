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

  items: MenuItem[] = [];
  itemsNotLoggedIn: MenuItem[] = [];

  constructor(private router: Router,
    public sessionService: SessionService,
  ) {
  }

  ngOnInit(): void {

    this.items = [{
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
        label: 'Create Recipe',
        routerLink: 'contentManagement/CreateNewRecipe'
      },
      {
        label: 'Create Ingredient',
        routerLink: 'contentManagement/CreateNewIngredient'
      }]
    }
    ];

    this.itemsNotLoggedIn = [{
      label: 'Home',
      items: [{
        label: 'Home Page',
        icon: 'pi pi-home',
        routerLink: 'index'
      }
      ]
    }];
  }

  staffLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentStaff(null);

    this.router.navigate(["/index"]);
  }
}
