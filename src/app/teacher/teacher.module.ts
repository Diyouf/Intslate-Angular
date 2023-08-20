import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TeacherAuthInterceptor } from './TeacherInterceptor/teacher-http-interceptor';
import { ProfileComponent } from './profile/profile.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { StudentsComponent } from './students/students.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeworkComponent } from './homework/homework.component';
import { AddHomeworkComponent } from './add-homework/add-homework.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { ChatComponent } from './chat/chat.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    TeacherLoginComponent,
    TeacherRegisterComponent,
    TeacherDashboardComponent,
    NavBarComponent,
    ProfileComponent,
    SideNavComponent,
    StudentsComponent,
    HomeworkComponent,
    AddHomeworkComponent,
    AttendanceComponent,
    LeaveRequestsComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    NgxPaginationModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [
    
  ]
})
export class TeacherModule { }
