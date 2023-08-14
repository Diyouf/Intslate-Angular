import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { studentData } from '../student/state/student.interface';
import { loadAllStudent } from '../student/state/student.action';
import { selectAllStudentData } from '../student/state/student.selector';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.css'],
})
export class ViewMoreComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ViewMoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private store: Store<studentData[]>
  ) {}

  ngOnInit(): void {
    this.loadStudent();
    console.log(this.data.id);
  }

  fetchData$!: Observable<studentData[]>;

  readonly id: string = this.data.id;

  loadStudent() {
    this.store.dispatch(loadAllStudent());
    this.fetchData$ = this.store.pipe(
      select(selectAllStudentData),
      map((students) => students.filter((student) => student._id === this.id))
    );
    
  }
}
