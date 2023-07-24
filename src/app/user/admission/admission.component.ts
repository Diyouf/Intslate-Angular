import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdmissionRequestService } from './admission.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent {
  submit: boolean = false
  constructor(
    private fb: FormBuilder, 
    private service: AdmissionRequestService,
    private router :Router,
    
    ) { }

  data = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    DOB: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    class: ['', [Validators.required]],
    image: new FormControl(null, [Validators.required]),
    Guardname: ['', [Validators.required]],
    relation: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zip: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    address: ['', [Validators.required]],

  })

  classData!:any[]

  file!: File;

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
      this.data.value.image = file.name;
    }
  }

  get f() {
    return this.data.controls;
  }


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

  _admissionReq(data: any): void {
    this.service.admissionReq(data).subscribe((res) => {
      this.btnClick()
    })
  }


  btnClick() {
    Swal.fire({
      title: '<span style="font-size: 24px">Thanks for applying to our school!</span>',
      html: '<span style="font-size: 18px; padding-top: -30px">The Admission status will be inform throgh Email</span>',
      icon: 'success'
    }).then((result)=>{
      if(result.isConfirmed){
        this.router.navigate(['/'])
      }
    });
  }





}
