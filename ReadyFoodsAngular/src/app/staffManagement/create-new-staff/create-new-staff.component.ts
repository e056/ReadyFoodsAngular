import { AccessRightEnum } from './../../models/access-right-enum';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Message,MessageService} from 'primeng/api';

import { Staff } from '../../models/staff';
import { SessionService } from '../../services/session.service';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-create-new-staff',
  templateUrl: './create-new-staff.component.html',
  styleUrls: ['./create-new-staff.component.css'],
  providers: [MessageService]
})
export class CreateNewStaffComponent implements OnInit {
  // public AccessRightEnumLabelMapping = AccessRightEnumLabelMapping;
  // public staffTypes = Object.keys(AccessRightEnum);

  newStaff: Staff;

  resultSuccess: boolean;
  submitted: boolean;
  resultError: boolean;
  message: string | undefined;
  staffType: string;
  staffTypes: string[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private staffService: StaffService,
    private messageService: MessageService
  ) {
    this.newStaff = new Staff();
    this.resultError = false;
    this.resultSuccess = false;
    this.submitted = false;
    this.staffType = '';
    this.staffTypes = ['admin', 'mod'];
  }

  ngOnInit(): void {
    this.checkAccessRight();
  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(['/accessRightError']);
    }
  }
  create(createStaffForm: NgForm) {
    this.submitted = true;
    console.log('********** CreateNewStaffComponent.ts: ' + this.staffType);
    console.log(
      '********** CreateNewStaffComponent.ts: ' + this.newStaff.firstName
    );
    if (this.staffType == 'admin') {
      this.newStaff.staffType = 'ADMINISTRATOR';
      console.log(
        '********** CreateNewStaffComponent.ts: admin set' +
          this.newStaff.staffType
      );
    } else {
      this.newStaff.staffType = 'MODERATOR';
    }

    if (createStaffForm.valid) {
      this.staffService.createNewStaff(this.newStaff).subscribe({
        next: (response) => {
          let newStaff: Staff = response;
          this.resultSuccess = true;
          this.resultError = false;
          // this.message =
          //   'New staff ' + newStaff.firstName + ' created successfully!';

          this.newStaff = new Staff();
          createStaffForm.resetForm();
          createStaffForm.reset();
          this.messageService.add({severity:'success', summary:'New Staff Created Successfully', detail: "Staff ID: " + newStaff.staffId});
        },
        error: (error) => {
          this.resultError = true;
          this.resultSuccess = false;

          this.messageService.add({severity:'error', summary:'Error occured with creating staff', detail: error});
        },
      });
    }
  }
}
