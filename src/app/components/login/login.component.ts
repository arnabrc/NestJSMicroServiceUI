import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;
  validUser: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {
  }

  @HostListener('window:beforeunload')
  canDeactivate() {
    if (!this.loginForm.dirty || !this.loginForm.touched) {
      return window.confirm('Discard changes?');
      // return false;
    }
    return true;
  }

  mainForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  // Getter to access form control
  get myForm() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return false;
    } else {
      // this.apiService.getUser(this.loginForm.value.username).subscribe(res => {
        this.authService.login(this.loginForm.value)
          .subscribe(
            (res) => {
              console.log('User is logged in');
              // this.router.navigateByUrl('/');
              this.router.navigate(['/employees-list']);
              // this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
            }, (error) => {
              console.log(error);
            });
     /*  }, (err) => {
        window.alert('Invalid User');
      }); */
    }
  }
}
