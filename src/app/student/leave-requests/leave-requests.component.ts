import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../service/student.service';
import { LeaveReqData } from './leave-request.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent implements OnInit {
  constructor(private service: StudentServiceService) { }
  private readonly id: string | null = localStorage.getItem('studentId')
  leaveData: LeaveReqData[] = []

  ngOnInit() {
    this.loadLeaveReq()
  }

  loadLeaveReq() {
    this.service.loadLeaveReq(this.id).subscribe((res) => {
      this.leaveData = res
    })
  }

  onDelete(id: string) {
    Swal.fire({
      title: 'Are you Sure?',
      text: 'Do you Want to delete this Request!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok!',
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.deleteLeaveReq(id).subscribe((res) => {
          if (res.success) {
            this.loadLeaveReq()
          }
        
        });
      }})



      }
    }
