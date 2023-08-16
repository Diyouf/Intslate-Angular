import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../service/student.service';
import { studentProfileData } from './profile-div.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditprofileComponent } from '../editprofile/editprofile.component';


@Component({
  selector: 'app-profile-div',
  templateUrl: './profile-div.component.html',
  styleUrls: ['./profile-div.component.css']
})
export class ProfileDivComponent implements OnInit {

  constructor(private service: StudentServiceService,private dialog:MatDialog) { }
  private readonly studentId  = localStorage.getItem('studentId')

  studentdata!: studentProfileData | undefined;

  ngOnInit(): void {
    this.loadStudentdata()
  }

  async loadStudentdata() {
    try {
      const res = await this.service.fetchStudent(this.studentId).toPromise();
      this.studentdata = res;
    } catch (error) {
      // Handle error here
      console.error("An error occurred while fetching student data:", error);
    }
  }
  

  editStudentProfile(){
    const dialogRef = this.dialog.open(EditprofileComponent,{
      width:'40%'
    })
  }





}
