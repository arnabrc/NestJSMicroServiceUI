import { Injectable } from '@angular/core';
import { ApiService } from './../service/api.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor(private apiService: ApiService) { }

  checkUsernameNotTaken(username: string) {
    const resp = this.apiService
      .getUsers()
      .pipe(delay(1000))
      .pipe(map(res => res))
      .pipe(map((usernames: Array<any>) => usernames.filter(uname => uname.username === username)))
      .pipe(map(usernames => !usernames.length));
    return resp;
  }
}
