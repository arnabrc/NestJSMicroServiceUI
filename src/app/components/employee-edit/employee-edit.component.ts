import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})

export class EmployeeEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  UserRole: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin']

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.updateUser();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getUser(id);
    this.editForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      username: ['', [Validators.required]],
      role: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  @HostListener('window:beforeunload')
  canDeactivate() {
    if (!this.editForm.dirty || !this.editForm.touched) {
      return window.confirm('Discard changes?');
    }
    return true;
  }

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('role').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getUser(id) {
    this.apiService.getUser(id).subscribe(data => {
      this.editForm.setValue({
        email: data[0].email,
        username: data[0].username,
        role: data[0].role,
        phoneNumber: data[0].phoneNumber,
      });
    });
  }

  updateUser() {
    this.editForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      username: ['', [Validators.required]],
      role: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateUser(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/employees-list');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error);
          });
      }
    }
  }

}
