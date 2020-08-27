import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators'
import { ApiService } from '../service/api.service';

@Injectable({
  providedIn: 'root'
})

export class RouteResolverService {

  constructor(private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {

    return this.apiService.getUsers().pipe(catchError(error => {
        return EMPTY;
      }), mergeMap(data => {
        if (data) {
          return of(data);
        } else {
          return EMPTY;
        }
      })
    );
  }
}
