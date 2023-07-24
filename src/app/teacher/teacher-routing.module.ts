import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherAuthGuard } from './guard/guard.guard';
import { TeacherLoginGuard } from './guard/guard.login';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'',redirectTo:'/teacher/dashboard',pathMatch:'full'},
  { path: 'login', component: TeacherLoginComponent ,canActivate:[TeacherLoginGuard]},
  { path: 'register', component: TeacherRegisterComponent ,canActivate:[TeacherLoginGuard] },
  { path: 'dashboard', component: TeacherDashboardComponent,canActivate:[TeacherAuthGuard] },
  { path: 'profile', component: ProfileComponent,canActivate:[TeacherAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
