import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

import { Staff } from '../../models/staff';
import { SessionService } from '../../services/session.service';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-view-all-staffs',
  templateUrl: './view-all-staffs.component.html',
  styleUrls: ['./view-all-staffs.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ViewAllStaffsComponent implements OnInit {

  allStaffs: Staff[];

  staffToView: Staff;

  display: boolean

  currentStaff: Staff;

  


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private staffService: StaffService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.allStaffs = new Array();
    this.staffToView = new Staff();
    this.display = false;
    this.currentStaff = sessionService.getCurrentStaff();

  }

  ngOnInit(): void {
    this.checkAccessRight();
    console.log('********** ViewAllStaffComponent.ts: ' + "init");
    this.staffService.getAllStaff().subscribe({
      next: (response) => {
        this.allStaffs = response;

      },
      error: (error) => {
        console.log('********** ViewAllStaffComponent.ts: ' + error);
      }
    });
  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(['/accessRightError']);
    }
  }

  showDialog(s: Staff) {
    console.log('**********dialog:')
    this.display = true;
    this.staffToView = s;
    console.log(s.staffId)

  }

  closeDialog() {
    this.staffToView = new Staff();
    this.display = false;
  }

  deleteStaff(staff: Staff) {
    console.log('********** running viewAllStaffForm: Delete Staff')

    this.staffService.deleteStaff(staff.staffId).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Staff Deleted Successfully!', detail: "Staff Id: " + staff.staffId });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error occured with deleting staff', detail: error });

        console.log('********** ViewAllStaffsComponent.ts: ' + error);
      }

    })
  }

}








