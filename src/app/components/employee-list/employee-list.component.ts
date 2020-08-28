import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {

  User: any = [];

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // this.readEmployee();
    this.activatedRoute.data.subscribe((data: { User: any }) => {
      this.User = data.User;
    });
  }

  ngOnInit() { }

  /* readEmployee() {
    this.apiService.getEmployees().subscribe((data) => {
      this.Employee = data;
    });
  } */

  /* @HostListener('window:beforeunload')
  canDeactivate() {
    if (this.authService.isLoggedIn()) {
      return false;
    }
    this.router.navigate(['\login']);
    return true;
  } */

  editUser(user, userId) {
    if (this.authService.isLoggedIn() && this.authService.adminRole()) {
      console.log('this.authService.isLoggedIn(): ', this.authService.isLoggedIn());
      console.log('this.authService.adminRole(): ', this.authService.adminRole());
      const url = `/employee-edit/${userId}`;
      // this.router.navigate(['/employee-edit/', userId]);
      this.router.navigateByUrl(url);
    } else {
      window.alert('You are not authorized to perform this action');
    }
  }

  removeUser(user, index) {
    if (this.authService.isLoggedIn() && this.authService.adminRole()) {
      if (window.confirm('Are you sure?')) {
        this.apiService.deleteUser(user._id).subscribe((data) => {
          // this.User.splice(index, 1);
          this.apiService.getUsers().subscribe(newData => this.User = newData);
        });
      }
    } else {
      window.alert('You are not authorized to perform this action');
    }
  }

  logout() {
    this.router.navigate(['\login']);
    this.authService.logout();
  }

}
