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
    })
  }



}
