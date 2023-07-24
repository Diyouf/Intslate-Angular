import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddClassService } from './add-class.service';
import { teacherData } from '../../teacherFile/teacher/state/teacher.interface';
import { Store, select } from '@ngrx/store';
import { loadAllTeacher } from '../../teacherFile/teacher/state/teacher.action';
import { Observable } from 'rxjs';
import { selectAllteacherData } from '../../teacherFile/teacher/state/teacher.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddClassComponent>,
    private service: AddClassService,
    private store: Store<teacherData[]>,
  ) { }


  classForm!: FormGroup
  breadcrumbName = "Classes"
  classOptions: number[] = Array.from({ length: 10 }, (_, index) => index + 1);
  divison: string = ''
  classList!: any[]
  fetchData$!: Observable<any>
  submit: boolean = false
  fieldsError!: string;

  ngOnInit() {
    this.loadTeacher()
    this.classForm = this.fb.group({
      classNumber: ['', [Validators.required]],
      maxStudents: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      classTeacher: ['', [Validators.required]],
    })
  }

  loadTeacher() {
    this.store.dispatch((loadAllTeacher()))
    this.fetchData$ = this.store.pipe(select(selectAllteacherData))
  }


  onClass(classNumber: any) {
    this.service.fetchDivision(Number(classNumber.value)).subscribe((res: any) => {
      if (res.division) {
        this.divison = res.division;
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submit = true
    if (this.classForm.valid) {
      const classNumber = parseInt(this.classForm.get('classNumber')?.value as string)
      const maxStudents = this.classForm.value.maxStudents
      const classTeacher = this.classForm.value.classTeacher
      const division: string = this.divison
      const classForm = {
        classNumber,
        maxStudents,
        division,
        classTeacher
      }

      this.service.addClass(classForm).subscribe((res) => {

        if (res.success) {
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
            title: 'Class Added successfully'
          })

          this.dialogRef.close();

        } else {
          this.fieldsError = 'Fields are not properly filled..'
        }
      }
      )
    }
  }


}
