import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdmissionComponent } from './admission/admission.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admissionForm', component: AdmissionComponent },
  { path: 'events', component: EventsComponent },
  {
    path: 'student',
    loadChildren: () =>
      import('../student/student.module').then((m) => m.StudentModule),
  },
  {
    path: 'teacher',
    loadChildren: () =>
      import('../teacher/teacher.module').then((m) => m.TeacherModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
