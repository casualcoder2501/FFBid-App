import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { shareReplay } from 'rxjs/operators';
import {Router} from '@angular/router';
import { NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {


  // stores the rules that are displayed to the user on the login form.
  rules = {
    safetyRule: 'No special characters ></&{}*'
  };


  userLogin = true;
  createAccount = false;
  adminLogin = false;
  email = '';
  department = 'Departments';
  departments = ['FF_Fire', 'ABQ_Fire'];
  responseData = '';
  userName = '';
  password = '';

  constructor(private login: LoginService, private router: Router) { }



  ngOnInit() {
    // checks if the token stored in local storage is still good.
    // navigates to the dashboard if it is.
    if (this.login.isLoggedIn()) {
      this.router.navigate(['home']);
    }

  }

  // allows user to press the enter key to submit the login or user creation form.
  submitForm(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.createAccount) {
        this.createUser();
      } else {
        this.loginUser();
      }
    }

  }

  setDepartment(department: string) {
    this.department = department;
    console.log(this.department)
  }

  createUser() {
    console.log('create button')
    this.login.createUser({
      userName: this.userName,
      password: this.password,
      email: this.email,
      department: this.department
    });
    shareReplay(1);
    this.createAccount = false;
  }

  loginUser() {
    this.login.loginUser({
      email: this.email,
      password: this.password
    });
    shareReplay(1);
  }


  createUserPage() {
    this.createAccount = true;

  }

  adminPage() {
    this.adminLogin = true;
  }
  cancel() {
    this.createAccount = false;
  }

}

