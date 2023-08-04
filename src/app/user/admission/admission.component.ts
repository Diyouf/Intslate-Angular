import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdmissionRequestService } from './admission.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css'],
})
export class AdmissionComponent {
  submit: boolean = false;
  ageError: string = '';
  dateError: string = '';
  constructor(
    private fb: FormBuilder,
    private service: AdmissionRequestService,
    private router: Router
  ) {}

  data = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    DOB: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    class: ['', [Validators.required]],
    image: ['', [Validators.required]],
    Guardname: ['', [Validators.required]],
    relation: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zip: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    address: ['', [Validators.required]],
  });


  file!: File;

  onFileChange(event: Event) {
    this.file = <File>(event.target as HTMLInputElement)?.files?.[0];
    if (this.file) {
      this.data.value.image = this.file.name;
    }
  }

  get f() {
    return this.data.controls;
  }

  age!: number;

  onSubmit() {
    this.submit = true;
    if (this.data.valid && this.file) {
      const newFile: FormData = new FormData();
      newFile.append('file', this.file, this.file.name);
      Object.keys(this.data.controls).forEach((controlName: string) => {
        const control = this.data.get(controlName);
        if (control && control.valid) {
          const value = control.value;
          newFile.append(controlName, value);
        }
      });
     
      
      this._admissionReq(newFile);
    }
  }

  _admissionReq(data: FormData): void {
    this.service.admissionReq(data).subscribe((res) => {
      this.btnClick();
    });
  }

  btnClick() {
    Swal.fire({
      title:
        '<span style="font-size: 24px">Thanks for applying to our school!</span>',
      html: '<span style="font-size: 18px; padding-top: -30px">The Admission status will be inform throgh Email</span>',
      icon: 'success',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/']);
      }
    });
  }

  dateofbirth(event: Event) {
    const target = event.target as HTMLInputElement;
    const dob = target.value;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const parts = dob.split('-');
    const dobDate = new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2])
    );

    dobDate.setHours(0, 0, 0, 0);

    if (dobDate >= currentDate) {
      // Handle the case when the entered date of birth is in the future or today
      this.dateError = 'Date of birth cannot be in the future or today.';

      setTimeout(() => {
        this.dateError = '';
      }, 4000);

    } else {
      const formattedDob = `${parts[2]}-${parts[1]}-${parts[0]}`;
      this.age = this.calculateAge(formattedDob);

      if (isNaN(this.age)) {
        this.age = 0;
      }

      if (this.age < 5 || this.age > 16) {
        this.ageError =
          'Minimum age for admission is 5 to 15';
      } else if (this.age > 5 &&  this.age < 16) {
        this.ageError = '';
      }
    }
  }

  calculateAge(dateOfBirth: string): number {
    const dob = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    // Check if the birthday has occurred this year
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  }
}
