import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../service/student.service';


@Component({
  selector: 'app-profile-div',
  templateUrl: './profile-div.component.html',
  styleUrls: ['./profile-div.component.css']
})
export class ProfileDivComponent implements OnInit {

  constructor(private service: StudentServiceService) { }
  private readonly studentId = localStorage.getItem('studentId')

  studentdata!: any;

  ngOnInit(): void {
    this.loadStudentdata()
  }

  loadStudentdata() {
    this.service.fetchStudent(this.studentId).subscribe((res) => {
      this.studentdata = res
    })
  }





}
