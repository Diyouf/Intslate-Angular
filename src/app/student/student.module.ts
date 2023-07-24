import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfileDivComponent } from './profile-div/profile-div.component';
import { FeesEnquiryComponent } from './fees-enquiry/fees-enquiry.component'; 
import { StudentAuthInterceptor } from './StudentInterceptor/student-http-interceptor';
import { HomeworkComponent } from './homework/homework.component';



@NgModule({
  declarations: [
    StudentRegisterComponent,
    StudentLoginComponent,
    HomeComponent,
    NavBarComponent,
    ProfileDivComponent,
    FeesEnquiryComponent,
    HomeworkComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StudentAuthInterceptor,
      multi: true
    }
  ]
})
export class StudentModule { }
