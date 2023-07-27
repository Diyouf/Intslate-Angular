import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacherFile/teacher/teacher.component';
import { AddTeacherComponent } from './teacherFile/add-teacher/add-teacher.component';
import { AdmissionEnquiryComponent } from './admission/admission-enquiry/admission-enquiry.component';
import { AdminAuthGuard } from './guard/guard.guard';
import { AdminLoginGuard } from './guard/gurad.login';
import { SubjectComponent } from './subjectFile/subject/subject.component';
import { ClassesComponent } from './class/classes/classes.component';
import { FeeStructureComponent } from './fee/fee-structure/fee-structure.component';
import { EventListComponent } from './event/event-list/event-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },

  { path: 'admin-login', component: LoginComponent, canActivate: [AdminLoginGuard] },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminAuthGuard] },

  { path: 'student', component: StudentComponent, canActivate: [AdminAuthGuard] },

  { path: 'teacher', component: TeacherComponent, canActivate: [AdminAuthGuard] },

  { path: 'add-teacher', component: AddTeacherComponent, canActivate: [AdminAuthGuard] },

  { path: 'subject', component: SubjectComponent, canActivate: [AdminAuthGuard] },
  
  { path: 'admissionEnquiry', component: AdmissionEnquiryComponent, canActivate: [AdminAuthGuard] },

  { path: 'classes', component: ClassesComponent, canActivate: [AdminAuthGuard] },

  { path: 'fees', component: FeeStructureComponent, canActivate: [AdminAuthGuard] },

  { path: 'event', component: EventListComponent, canActivate: [AdminAuthGuard] }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
