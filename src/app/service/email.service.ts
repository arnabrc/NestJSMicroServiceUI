import { Injectable } from '@angular/core';
import { ApiService } from './../service/api.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  constructor(private apiService: ApiService) { }

  checkEmailNotTaken(email: string) {
    const resp =  this.apiService
      .getUsers()
      .pipe(delay(1000))
      .pipe(map(res => res))
      .pipe(map((emails: Array<any>) => emails.filter(em => em.email === email)))
      .pipe(map(emails => !emails.length));
    return resp;
  }
}
