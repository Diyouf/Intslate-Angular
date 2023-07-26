import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddClassComponent } from '../add-class/add-class.component';
import { ClassesService } from './classes.service';
import { EditClassComponent } from '../edit-class/edit-class.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private service: ClassesService,
  ) { }
  classData!: any[]
  searchTerm!: string | number
  currentPage: number = 1; 
  itemsPerPage: number = 6; 

  addClass() {
    const dialogRef = this.dialog.open(AddClassComponent, {
      height: '394px',
      width: '672px',
      data: {}
    })
    dialogRef.afterClosed().subscribe(() => {
      this.loadClassData()
    })
  }

  editClass(id:string ) {
    const dialogRef = this.dialog.open(EditClassComponent, {
      height: '420px',
      width: '672px',
      data: { id: id }
    })
    dialogRef.afterClosed().subscribe(() => {

      this.loadClassData()

    })
  }

  ngOnInit() {
    this.loadClassData()
  }

  loadClassData() {
    this.service.fetchClasses().subscribe((res) => {
      if (res) {
        this.classData = res
      }
    })
  }

  updateFilteredData() {
    if (this.searchTerm == '') {

      this.loadClassData()

    } else {

      this.classData = this.classData.filter(classItem =>
        classItem.className.toString().includes(this.searchTerm.toString()) ||
        classItem.division.toLowerCase().includes(this.searchTerm.toString().toLowerCase())||
        classItem.classTeacher.name.toLowerCase().includes(this.searchTerm.toString().toLowerCase())
      )

    }

  }

}
