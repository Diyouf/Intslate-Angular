import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClassesService } from '../../../app/admin/class/classes/classes.service';
import { AddHomeWorkService } from './add-homework.service';
import { homeWorkData } from './add-homework.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-homework',
  templateUrl: './add-homework.component.html',
  styleUrls: ['./add-homework.component.css'],
})
export class AddHomeworkComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddHomeworkComponent>,
    private fb: FormBuilder,
    private classService: ClassesService,
    private service: AddHomeWorkService
  ) {}

  classData: any[] = [];
  submit: boolean = false;
  currentDate = new Date();
  dateError: string = '';
  readonly id = localStorage.getItem('teacherId');

  ngOnInit(): void {
    this.loadClasses();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  loadClasses() {
    this.classService.fetchClasses().subscribe((res) => {
      this.classData = res;
    });
  }

  onSubmit() {
    this.submit = true;

    if (this.formData && this.formData.value.dueDate) {
      const dueDate = new Date(this.formData.value.dueDate);

      if (dueDate < this.currentDate) {
        this.dateError = 'Entered Date is not valid..';
        setTimeout(() => {
          this.dateError = '';
        }, 4000);
      } else {
        if (this.formData.valid) {
          const formValues: homeWorkData = {
            class: this.formData.value.class || null,
            homework: this.formData.value.homework || null,
            dueDate: dueDate, // Assign the converted Date object to the dueDate field
          };

          this.service.addHomeWork(this.id, formValues).subscribe((res)=>{
            if(res){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
    
              Toast.fire({
                icon: 'success',
                title: 'Home work added successfully'
              })
    
              this.dialogRef.close();
            }
          });
        }
      }
    }
  }

  formData = this.fb.group({
    class: ['', [Validators.required]],
    homework: ['', [Validators.required]],
    dueDate: ['', [Validators.required]],
  });
}
