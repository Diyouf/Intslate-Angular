import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSubjectComponent } from '../add-subject/add-subject.component';
import { SubjectService } from '../service/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  constructor(private dialog: MatDialog, private service: SubjectService) {}

  ngOnInit(): void {
    this.loadSubject();
  }
  subjectData!: any[];

  addSubject() {
    const dialogRef = this.dialog.open(AddSubjectComponent, {
      height: '300px',
      width: '472px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadSubject();
    });
  }
  loadSubject() {
    this.service.fetchSubject().subscribe((res) => {
      this.subjectData = res;
    });
  }
}
