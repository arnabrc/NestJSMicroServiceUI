import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { EmailValidation } from './../../validators/email-validation';
import { EmailService } from './../../service/email.service';
import { UsernameService } from '../../service/username.service';
import { UsernameValidation } from '../../validators/username-validation';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  registerForm: FormGroup;
  UserRole: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService,
    private emailService: EmailService,
    private unameService: UsernameService
  ) {
    this.mainForm();
   }

  ngOnInit(): void {
  }

  @HostListener('window:beforeunload')
  canDeactivate() {
    if (!this.registerForm.dirty || !this.registerForm.touched) {
        return  window.confirm('Discard changes?');
        // return false;
      }
    return true;
    /* if (!this.registerForm.dirty || !this.registerForm.touched || this.registerForm.valid) {
      return true;
    } else {
      return window.confirm('Discard changes?');
    } */
  }

  mainForm() {
    this.registerForm = this.fb.group({
      email: ['',
        Validators.compose(
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
          ]
        ),
        EmailValidation.createValidator(this.emailService)
      ],
      username: ['',
        Validators.compose(
          [
            Validators.required
          ]
        ),
        UsernameValidation.createValidator(this.unameService)
      ],
      password: ['', Validators.compose([Validators.required])],
      role: ['', Validators.compose([Validators.required])],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])]
    });
  }

  // Choose designation with select dropdown
  updateProfile(e) {
    this.registerForm.get('role').setValue(e, {
      onlySelf: true
    });
  }

  // Getter to access form control
  get myForm() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.registerForm.valid) {
      return false;
    } else {
      this.apiService.createUser(this.registerForm.value).subscribe(
        (res) => {
          console.log('Registration Successful!');
          this.ngZone.run(() => this.router.navigateByUrl('/login'));
        }, (error) => {
          console.log(error);
        });
    }
  }

}
