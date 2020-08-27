import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { RouteResolverService } from './resolvers/route-resolver.service';
import { CanActivateGuard } from './guards/can-activate.guard';
import { RouteGuard } from './guards/route.guard';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [RouteGuard]
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [RouteGuard]
  },
  {
    path: 'employee-edit/:id',
    pathMatch: 'full',
    component: EmployeeEditComponent,
    canActivate: [CanActivateGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'employees-list',
    pathMatch: 'full',
    component: EmployeeListComponent,
    resolve: {
      User: RouteResolverService
    },
    canActivate: [CanActivateGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: '*',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
