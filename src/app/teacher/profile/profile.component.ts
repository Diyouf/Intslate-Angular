import { Component, OnInit } from '@angular/core';
import { TeacherProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit{

  teacherData:any

  constructor(private service : TeacherProfileService){}
  readonly id = localStorage.getItem('teacherId')

  ngOnInit(){
    this.loadTeacherProfile()
  }

  loadTeacherProfile(){
    this.service.loadTeacherProfile(this.id).subscribe((res)=>{
      this.teacherData = res
    })
  }

}
