import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  // tslint:disable-next-line: max-line-length

  rules = {
    emailRule: 'No special characters ></&{}*'
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

  constructor(private login: LoginService) { }



  ngOnInit() {

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
      userName: this.userName,
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


}

