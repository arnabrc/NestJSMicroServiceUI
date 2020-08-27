import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ApiService } from './service/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { EmailService } from './service/email.service';
import { LoaderInterceptorService } from './service/loader-interceptor.service';
import { LoaderComponent } from './components/loader/loader.component';
import { AuthInterceptor } from './service/auth-interceptor.service';
import { AuthService } from './service/auth.service';
import { UsernameService } from './service/username.service';
import { CanActivateGuard } from './guards/can-activate.guard';
import { RouteGuard } from './guards/route.guard';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    LoginComponent,
    RegisterComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [
    ApiService,
    CanDeactivateGuard,
    EmailService,
    UsernameService,
    AuthService,
    CanActivateGuard,
    RouteGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
