import {AuthService} from '../service/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        window.alert('You do not have permission to view this page');
        this.router.navigateByUrl(this.router.url);
        return false;
      }
    // return true;
  }
}
