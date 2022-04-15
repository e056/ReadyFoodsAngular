import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';

import { Staff } from '../../models/staff';
import { SessionService } from '../../services/session.service';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-view-all-staffs',
  templateUrl: './view-all-staffs.component.html',
  styleUrls: ['./view-all-staffs.component.css'],
  providers: [MessageService]
})
export class ViewAllStaffsComponent implements OnInit {

  allStaffs: Staff[];

  staffToView: Staff;


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private staffService: StaffService,
    private messageService: MessageService) {
    this.allStaffs = new Array();
    this.staffToView = new Staff();
  }

  ngOnInit(): void {
    console.log('********** ViewAllStaffComponent.ts: ' + "init");
    this.staffService.getAllStaff().subscribe({
      next: (response) => {
        this.allStaffs = response;
        console.log('********** ViewAllStaffComponent.ts: ' + this.allStaffs)
      },
      error: (error) => {
        console.log('********** ViewAllStaffComponent.ts: ' + error);
      }
    });
  }

  deleteStaff(staff:Staff) {
    console.log('********** running viewAllStaffForm: Delete Staff')

    console.log('********** Form is valid')
    this.staffToView = staff
    // this.staffService.deleteStaff(staff.staffId).subscribe({
    //   next: (response) => {
    //     this.messageService.add({ severity: 'success', summary: 'Staff Deleted Successfully!', detail: "Staff Id: " + this.staffToView.staffId });
    //   },
    //   error: (error) => {
    //     this.messageService.add({ severity: 'error', summary: 'Error occured with deleting staff', detail: error });

    //     console.log('********** ViewAllStaffsComponent.ts: ' + error);
    //   }
    // });

  }



}
