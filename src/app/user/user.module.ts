import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdmissionComponent } from './admission/admission.component';
import { HttpClientModule } from '@angular/common/http';
import { EventsComponent } from './events/events.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    AdmissionComponent,
    EventsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class UserModule { }
