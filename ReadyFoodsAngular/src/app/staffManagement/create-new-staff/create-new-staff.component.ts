import { AccessRightEnum,AccessRightEnumLabelMapping } from './../../models/access-right-enum';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Staff } from '../../models/staff';
import { SessionService } from '../../services/session.service';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-create-new-staff',
  templateUrl: './create-new-staff.component.html',
  styleUrls: ['./create-new-staff.component.css'],
})
export class CreateNewStaffComponent implements OnInit {

  public AccessRightEnumLabelMapping = AccessRightEnumLabelMapping;
  public staffTypes = Object.values(AccessRightEnum);

  newStaff: Staff;

  resultSuccess: boolean;
  submitted: boolean;
  resultError: boolean;
  message: string | undefined;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private staffService: StaffService
  ) {
    this.newStaff = new Staff();
    this.resultError = false;
    this.resultSuccess = false;
    this.submitted = false;

  }

  ngOnInit(): void {
    this.checkAccessRight()

  }

  checkAccessRight()
    {
        if(!this.sessionService.checkAccessRight(this.router.url))
        {
            this.router.navigate(["/accessRightError"]);
        }
  }
  create(createStaffForm:NgForm)
  {
    this.submitted = true;

    if(createStaffForm.valid)
    {
      this.staffService.createNewStaff(this.newStaff).subscribe({
        next:(response)=>{
          let newStaffId: number = response;
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "New staff " + newStaffId + " created successfully!";

          this.newStaff = new Staff();
          createStaffForm.resetForm();
          createStaffForm.reset();
        },
        error:(error)=>{
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while creating new staff: " + error;
          console.log('********** CreateNewStaffComponent.ts: ' + error);
        }
      });
    }
  }
}
