import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LeaveRequestService } from './leave-requests.service';
import { LeaveReqData } from './leave-requests.interface';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css'],
})
export class LeaveRequestsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private dialogRef: MatDialogRef<LeaveRequestsComponent>,
    private service: LeaveRequestService
  ) {}
  readonly id: string | null = this.data.id;
  LeaveData!:LeaveReqData[]

  ngOnInit(): void {
    this.loadLeaveReq();
  }

  loadLeaveReq() {
    this.service.loadLeaveReq(this.id).subscribe((res) => {
        this.LeaveData = res
    });
  }

  onNoClick(){
    this.dialogRef.close()
  }

  formatDueDate(date: Date): string {
    return formatDate(date, 'MMM d, y', 'en-US'); // Customize the date format as needed
  }

  approveLeave(id:string){
    this.service.approve(id).subscribe((res)=>{
        console.log("approved")
    })
  }
  rejectLeave(id:string){
    this.service.reject(id).subscribe((res)=>{
        console.log("Rejected")
    })
  }
}
