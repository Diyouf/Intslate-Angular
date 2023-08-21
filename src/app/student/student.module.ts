import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfileDivComponent } from './profile-div/profile-div.component';
import { FeesEnquiryComponent } from './fees-enquiry/fees-enquiry.component';
import { HomeworkComponent } from './homework/homework.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LeaveApplicatoinComponent } from './leave-applicatoin/leave-applicatoin.component';
import { ChatComponent } from './chat/chat.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { EditprofileComponent } from './editprofile/editprofile.component'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { SharedModule } from '../sharedModule/shared-module/shared-module.module';




@NgModule({
  declarations: [
    StudentRegisterComponent,
    StudentLoginComponent,
    HomeComponent,
    NavBarComponent,
    ProfileDivComponent,
    FeesEnquiryComponent,
    HomeworkComponent,
    AttendanceComponent,
    LeaveApplicatoinComponent,
    ChatComponent,
    FooterComponent,
    EditprofileComponent,
    LeaveRequestsComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    SharedModule

  ],
  providers: [
    
  ]
})
export class StudentModule { }
