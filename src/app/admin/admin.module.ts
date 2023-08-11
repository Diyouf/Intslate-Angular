import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { _teacherGetReducer } from './teacherFile/teacher/state/teacher.reducer'
import { AllteacherEffect } from './teacherFile/teacher/state/teacher.effect'
import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentComponent } from './studentFile/student/student.component';
import { TeacherComponent } from './teacherFile/teacher/teacher.component';
import { AddTeacherComponent } from './teacherFile/add-teacher/add-teacher.component'
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdmissionEnquiryComponent } from './admission/admission-enquiry/admission-enquiry.component';
import { AlladmissionEffect } from './admission/admission-enquiry/state/admission.effect'
import { _admissionGetReducer } from './admission/admission-enquiry/state/admission.reducer'
import { _studentGetReducer } from './studentFile/student/state/student.reducer';
import { AllStudentEffect } from './studentFile/student/state/student.effect';
import { SubjectComponent } from './subjectFile/subject/subject.component';
import { ClassesComponent } from './class/classes/classes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddClassComponent } from './class/add-class/add-class.component';
import { ApproveAdmissionComponent } from './admission/approve-admission/approve-admission.component';
import { RejectAdmissionComponent } from './admission/reject-admission/reject-admission.component';
import { FeeStructureComponent } from './fee/fee-structure/fee-structure.component';
import { AddFeeComponent } from './fee/add-fee/add-fee.component';
import { EditFeeComponent } from './fee/edit-fee/edit-fee.component';
import { EditClassComponent } from './class/edit-class/edit-class.component';
import { DeleteTeacherComponent } from './teacherFile/delete-teacher/delete-teacher.component'
import { AdminAuthInterceptor } from './AdminInterceptor/admin-http-Interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddSubjectComponent } from './subjectFile/add-subject/add-subject.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { AddEventComponent } from './event/add-event/add-event.component'
import { _eventGetReducer } from './event/event-list/state/event.reducer';
import { AllEventEffect } from './event/event-list/state/event.effect';
import { ViewMoreComponent } from './studentFile/view-more/view-more.component';



@NgModule({
  declarations: [
    LoginComponent,
    SideNavComponent,
    DashboardComponent,
    StudentComponent,
    TeacherComponent,
    AddTeacherComponent,
    AdmissionEnquiryComponent,
    SubjectComponent,
    ClassesComponent,
    AddClassComponent,
    ApproveAdmissionComponent,
    RejectAdmissionComponent,
    FeeStructureComponent,
    AddFeeComponent,
    EditFeeComponent,
    EditClassComponent,
    DeleteTeacherComponent,
    AddSubjectComponent,
    EventListComponent,
    AddEventComponent,
    ViewMoreComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    StoreModule.forFeature('Allteacher', _teacherGetReducer),
    StoreModule.forFeature('Alladmission', _admissionGetReducer),
    StoreModule.forFeature('Allstudent', _studentGetReducer),
    StoreModule.forFeature('AllEvent', _eventGetReducer),
    EffectsModule.forFeature([AllteacherEffect, AlladmissionEffect, AllStudentEffect,AllEventEffect]),
    MatDialogModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminAuthInterceptor,
      multi: true
    }
  ]
})
export class AdminModule { }
