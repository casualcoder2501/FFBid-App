import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { ToastService } from '../toast/toast.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  regEmail = new RegExp(/^([a-zA-Z0-9])+\.?([a-zA-Z0-9])*\.?([a-zA-Z0-9])*\.?@([a-zA-z]{2,})*\.+([a-zA-z]{2,})+\.?([a-zA-z]{2,})*/);
  email = '';
  unSafeEmail = new RegExp(/[<>{}/&*]/);
  rules = {
    emailRule: 'No special characters ></&{}*'
  };
  userLogin = false;
  createAccount = true;
  adminLogin = false;
  constructor(private toast: ToastService, private http: HttpClient) { }
  adminUserName = '';
  adminPassword = '';
  department = 'Departments';
  departments = ['FF_Fire', 'ABQ_Fire'];
  responseData = '';
  createUserName = '';
  createPassword = '';
  createEmail = '';


  ngOnInit() {
  }

  setDepartment(department: string) {
    this.department = department;
    console.log(this.department)
  }

  validateEmail() {
    const validatedEmail = this.regEmail.test(this.email);
    const specialChars = this.unSafeEmail.test(this.email);
    if (validatedEmail) {
      console.log('email is valid');
      if (specialChars) {
        this.toast.showToast('error', 'email address contains escaped characters', 2500)
        console.log('unsafe email');
        alert('special characters');
      } else {
        console.log('email clean')
        alert('clean');
      }
    }

    console.log(validatedEmail);
    console.log(specialChars);
    if (this.email.length === 0 || this.email === null || !validatedEmail) {
      alert('Please enter email');
    }
  }

  createUser() {
    this.createAccount = true;

  }

  async create() {

    await this.http.post('/api/v1/users', {
      userName: this.createUserName,
      password: this.createPassword,
      email: this.createEmail,
      department: this.department
    }).toPromise().then((value: string) => {
      this.responseData = value;
      console.log(value);
    })

    switch (true) {
      case this.responseData === '':
        this.toast.showToast('error', 'an error has occured', 2500);
        break;
      case this.responseData === 'empty':
        this.toast.showToast('error', 'fields must not be empty', 2500);
        break;
      case this.responseData === 'exists':
        this.toast.showToast('error', 'user name or email already in use', 2500);
        break;
        case this.responseData === 'added':
        this.toast.showToast('good', 'successfully added user!', 2500);
        break;
    }

  }
}

