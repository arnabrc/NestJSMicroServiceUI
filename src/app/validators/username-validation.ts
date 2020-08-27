import { UsernameService } from '../service/username.service';
import { AbstractControl, AsyncValidator, ValidationErrors, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, filter } from 'rxjs/operators';

export class UsernameValidation {
  static createValidator(unameService: UsernameService) {
    const message = {
      'UsernameValidation': {
        'message': 'Username is taken'
      }
    };
    return (control: AbstractControl) => {
      return unameService.checkUsernameNotTaken(control.value).pipe(map(res => {
        // return res ? null : { emailTaken: true };
        return res ? null : message;
        // return res ? { emailNotTaken: true } : { emailTaken: true };
      }));
    };
  }
}
