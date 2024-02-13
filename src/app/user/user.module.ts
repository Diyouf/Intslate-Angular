import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdmissionComponent } from './admission/admission.component';
import { HttpClientModule } from '@angular/common/http';
import { EventsComponent } from './events/events.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AllEventUserEffect } from './events/state/events.effects';
import { _eventUserGetReducer } from './events/state/events.reducer';
import { EventListhomeComponent } from './event-listhome/event-listhome.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component'
import { SharedModule } from '../sharedModule/shared-module/shared-module.module';


@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    AdmissionComponent,
    EventsComponent,
    EventListhomeComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forFeature([AllEventUserEffect]),
    StoreModule.forFeature('AllEventUser', _eventUserGetReducer),
    MatIconModule,
    SharedModule,


  ]
})
export class UserModule { }
