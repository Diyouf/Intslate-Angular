import { Component, OnInit } from '@angular/core';
import { selectAlladmissionData } from './state/admission.selector'
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs'
import { admissionData } from './state/admission.interface'
import { loadAllAdmission } from './state/admission.action'
import { MatDialog } from '@angular/material/dialog';
import { ApproveAdmissionComponent } from '../approve-admission/approve-admission.component';
import { RejectAdmissionComponent } from '../reject-admission/reject-admission.component';

@Component({
  selector: 'app-admission-enquiry',
  templateUrl: './admission-enquiry.component.html',
  styleUrls: ['./admission-enquiry.component.css']
})
export class AdmissionEnquiryComponent implements OnInit {


  fetchData$!: Observable<admissionData[]>;


  constructor(
   
    private store: Store<admissionData[]>,
    private dialog: MatDialog
  ) { }

  currentPage: number = 1; 
  itemsPerPage: number = 6; 
  searchTerm:string  = ''

  approve(id: any, StudnetClass: string) {
    const dialogRef = this.dialog.open(ApproveAdmissionComponent, {
      height: '440px',
      width: '650px',
      data: { id: id, ReqClass: StudnetClass }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.loadAdmissionData()
    })
  }

  reject(id: any) {
    const dialogRef = this.dialog.open(RejectAdmissionComponent, {
      height: '280px',
      width: '490px',
      data: { id: id }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.loadAdmissionData()
    })
  }

  ngOnInit(): void {
    this.loadAdmissionData()
  }

  loadAdmissionData() {
    this.store.dispatch((loadAllAdmission()))
    this.fetchData$ = this.store.pipe(select(selectAlladmissionData))
  }

  updateFilteredData() {
    this.fetchData$ = this.store.pipe(
      select(selectAlladmissionData),
      map((admissions: admissionData[]) => {
        return admissions.filter(admission =>
          admission.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          admission.email.toLowerCase().includes(this.searchTerm.toLowerCase()) 
        );
      })
    );
  }
  






}
