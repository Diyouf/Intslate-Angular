import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddHomeworkComponent } from '../add-homework/add-homework.component';
import { homeworkService } from './homework.service';
import { HomeWork } from './homework.interface';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit{

  constructor(private dialog : MatDialog,private service : homeworkService){}
  readonly id = localStorage.getItem('teacherId')
  homeWorkdata: HomeWork[] = []

  ngOnInit(): void {
    this.loadHomework()
  }

  addHomework(){
    const dialogRef = this.dialog.open(AddHomeworkComponent,{
      width:'650px'
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.loadHomework()
    })
  }

  formatDueDate(date: Date): string {
    return formatDate(date, 'MMM d, y', 'en-US'); // Customize the date format as needed
  }

  loadHomework(){
    this.service.fetchHomeWork(this.id).subscribe((res)=>{
       this.homeWorkdata = res
    })
  }

}
