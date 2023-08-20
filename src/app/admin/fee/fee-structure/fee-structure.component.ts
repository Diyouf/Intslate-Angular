import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFeeComponent } from '../add-fee/add-fee.component';
import { feeService } from '../service/fee.service';
import { EditFeeComponent } from '../edit-fee/edit-fee.component';
import { FeeStructure, StudnetFeeData } from './fee-structure.interface';

@Component({
  selector: 'app-fee-structure',
  templateUrl: './fee-structure.component.html',
  styleUrls: ['./fee-structure.component.css']
})
export class FeeStructureComponent implements OnInit {


  feeData: FeeStructure[] = []
  studentData :StudnetFeeData[] = []
  currentPage: number = 1; 
  itemsPerPage: number = 6; 
  totalFeesPaid !: number
  term1Total !: number
  term2Total !: number
  term3Total !: number

  constructor(
    private dialog: MatDialog,
    private service: feeService
  ) { }

  ngOnInit(): void {
    this.loadFeeStructure()
    this.loadStudent()
  }

  addfee() {
    const dialogRef = this.dialog.open(AddFeeComponent, {
      height: '380px',
      width: '600px',
    })
    dialogRef.afterClosed().subscribe(() => {

      this.loadFeeStructure()

    })
  }

  loadFeeStructure() {
    this.service.fetchAllFee().subscribe((res) => {
      this.feeData = res
    })
  }

  editfee(id:string){
    const dialogRef = this.dialog.open(EditFeeComponent,{
      height:'380px',
      width :'500px',
      data:{id :id}
    })
    dialogRef.afterClosed().subscribe(() => {

      this.loadFeeStructure()

    })
  }

  loadStudent(){
    this.service.studentFee().subscribe((res)=>{
      this.studentData = res
      this.totalFeesPaid = this.calculateTotalFeesPaidForAllStudents(this.studentData);
      
    })
  }

 

  calculateTotalFeesPaidForAllStudents(students: StudnetFeeData[]): number {
    let totalFeesPaid = 0;

    students.forEach((student) => {
      const term1Amount = student.term1.amount || 0;
      const term2Amount = student.term2.amount || 0;
      const term3Amount = student.term3.amount || 0;

      totalFeesPaid += term1Amount + term2Amount + term3Amount;
      this.term1Total = students.reduce((acc, student) => {
        return acc + (student.term1.amount || 0);
      }, 0);
    
      this. term2Total = students.reduce((acc, student) => {
        return acc + (student.term2.amount || 0);
      }, 0);
    
      this. term3Total = students.reduce((acc, student) => {
        return acc + (student.term3.amount || 0);
      }, 0);
    
    });

    return totalFeesPaid;
  }




}
