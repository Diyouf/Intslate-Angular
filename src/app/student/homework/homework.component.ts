import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../service/student.service';
import { formatDate } from '@angular/common';
import { Homework } from './homework.interface';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent  implements OnInit{
  constructor(private service:StudentServiceService){}
  readonly id = localStorage.getItem('studentId')

  homeworkData:Homework[]  = []

  ngOnInit(): void {
    this.loadHomeWorks()
  }

  loadHomeWorks(){
    this.service.fetchHomeWorks(this.id).subscribe((res)=>{
      this.homeworkData = res
    })
  }
  formatDueDate(date: Date): string {
    return formatDate(date, 'MMM d, y', 'en-US'); // Customize the date format as needed
  }
}
