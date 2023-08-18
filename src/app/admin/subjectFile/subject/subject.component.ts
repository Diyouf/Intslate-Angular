import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSubjectComponent } from '../add-subject/add-subject.component';
import { SubjectService } from '../service/subject.service';
import { LoadSubject } from '../interface/subject.interface';

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

  currentPage: number = 1; 
  itemsPerPage: number = 6; 
  subjectData!: LoadSubject[];
  searchText: string = ''; 
  originalSubjectData!: LoadSubject[];

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
      this.originalSubjectData = res; // Store the original data
      this.filterSubjects(); // Filter the data based on the search input
    });
  }

  filterSubjects(): void {
    if (!this.searchText.trim()) {
      // If search input is empty, show all subjects
      this.subjectData = this.originalSubjectData;
    } else {
      // Otherwise, filter subjects based on the search input
      const searchTerm = this.searchText.toLowerCase();
      this.subjectData = this.originalSubjectData.filter(
        (subject) =>
          subject.subjectName.toLowerCase().includes(searchTerm) 
         
      );
    }
  }


}
