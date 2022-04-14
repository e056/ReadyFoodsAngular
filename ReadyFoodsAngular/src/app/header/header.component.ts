import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessRightEnum } from '../models/access-right-enum';
import { Staff } from '../models/staff';
import { SessionService } from '../services/session.service';
import { StaffService } from '../services/staff.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string | undefined;
  password: string | undefined;
  loginError: boolean;
  errorMessage: string | undefined;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService, private staffService: StaffService) {
    this.loginError = false;
  }

  ngOnInit(): void {
  }

  staffLogin(): void {
    this.sessionService.setUsername(this.username);
    this.sessionService.setPassword(this.password);

    this.staffService.staffLogin(this.username, this.password).subscribe
      ({
        next: (response) => {
          let staff: Staff = response;

          if (response.staffType?.toString() == "ADMINISTRATOR") {
            staff.staffType = "ADMINISTRATOR";
          } else if (response.staffType?.toString() == "MODERATOR") {
            staff.staffType = "MODERATOR";
          }

          if (staff != null) {
            this.sessionService.setIsLogin(true);
            this.sessionService.setCurrentStaff(staff);
            this.loginError = false;
          } else {
            this.loginError = true;
          }
        },
        error: (error) => {
          this.loginError = true;
          this.errorMessage = error
        }
      });
  }

  staffLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentStaff(null);

    this.router.navigate(["/index"]);
  }

}
