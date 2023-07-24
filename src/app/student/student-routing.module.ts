import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { HomeComponent } from './home/home.component';
import { StudentAuthGuard } from './guard/guard.guard'
import { StudentLoginGuard } from './guard/guard.login';
import { FeesEnquiryComponent } from './fees-enquiry/fees-enquiry.component';
import { HomeworkComponent } from './homework/homework.component';

const routes: Routes = [

  {path:'',redirectTo:'/student/home',pathMatch:'full'},

  { path: 'login', component: StudentLoginComponent ,canActivate:[StudentLoginGuard]},

  { path: 'register', component: StudentRegisterComponent , canActivate:[StudentLoginGuard] },
  
  { path: 'home', component: HomeComponent,canActivate:[StudentAuthGuard] },

  { path: 'fees', component: FeesEnquiryComponent,canActivate:[StudentAuthGuard] },

  { path: 'homeworks', component: HomeworkComponent,canActivate:[StudentAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
