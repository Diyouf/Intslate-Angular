import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ErrorInterceptor } from './error-interceptor/global-errorHadling';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environment/environment';
import { AdminAuthInterceptor } from './admin/AdminInterceptor/admin-http-Interceptor';
import { StudentAuthInterceptor } from './student/StudentInterceptor/student-http-interceptor';
import { TeacherAuthInterceptor } from './teacher/TeacherInterceptor/teacher-http-interceptor';
import { SpinnerComponent } from './loading/spinner/spinner.component';
import { LoadingInterceptor } from './loading/loading.interceptor';
import { appNoLeadingSpace } from './directive/trim-input.directive';


const apiUrl = environment.apiUrl
const config: SocketIoConfig = { url: apiUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    FontAwesomeModule,
    MatSnackBarModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AdminAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: StudentAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TeacherAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
