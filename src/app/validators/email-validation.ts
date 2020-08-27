import { AbstractControl, AsyncValidator, ValidationErrors, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, filter } from 'rxjs/operators';
import { EmailService } from './../service/email.service';

export class EmailValidation {

  static createValidator(emailService: EmailService) {
    const message = {
      'EmailValidation': {
        'message': 'Email is taken'
      }
    };
    return (control: AbstractControl) => {
      return emailService.checkEmailNotTaken(control.value).pipe(map(res => {
        // return res ? null : { emailTaken: true };
        return res ? null : message;
        // return res ? { emailNotTaken: true } : { emailTaken: true };
      }));
    };
  }
}
