import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';
import { TeacherAuthGuard } from './guard/guard.guard';
import { TeacherLoginGuard } from './guard/guard.login';
import { ProfileComponent } from './profile/profile.component';
import { StudentsComponent } from './students/students.component';
import { HomeworkComponent } from './homework/homework.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: '/teacher/students', pathMatch: 'full' },
  {
    path: 'login',
    component: TeacherLoginComponent,
    canActivate: [TeacherLoginGuard],
  },
  {
    path: 'register',
    component: TeacherRegisterComponent,
    canActivate: [TeacherLoginGuard],
  },
 
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [TeacherAuthGuard],
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [TeacherAuthGuard],
  },
  {
    path: 'homeWork',
    component: HomeworkComponent,
    canActivate: [TeacherAuthGuard],
  },
  {
    path: 'attendance',
    component: AttendanceComponent,
    canActivate: [TeacherAuthGuard],
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [TeacherAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
