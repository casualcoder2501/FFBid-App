import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ToastService } from './toast/toast.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {IdleService} from './idle.service';

export interface IUser {
  userName?: string;
  password?: string;
  email?: string;
  department?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  regEmail = new RegExp(/^([a-zA-Z0-9])+\.?([a-zA-Z0-9])*\.?([a-zA-Z0-9])*\.?@([a-zA-z]{2,})*\.+([a-zA-z]{2,})+\.?([a-zA-z]{2,})*/);
  regPassword = new RegExp(/[a-zA-z0-9]{5,18}[!@#$%^&*]+/);
  regUserName = new RegExp(/[a-zA-z0-9]{3,}/);
  unSafe = new RegExp(/[<>{}/&*]/);
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message, error.error.timeStamp, error.error.type);

    } else {
      console.error(
        `Backend returned code ${error.status},` + `body was ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }


  constructor(private idle: IdleService, private toast: ToastService, private http: HttpClient, private router: Router) { }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
    window.onmousemove = () => {
      return null;
    };
    window.onkeyup = () => {
      return null;
    };
    window.onclick = () => {
      return null;
    };
    clearInterval(this.idle.idleCounter);
  }


  async createUser(user: IUser) {
    const validatedEmail = this.regEmail.test(user.email);
    const unSafeEmail = this.unSafe.test(user.email);
    const validPassword = this.regPassword.test(user.password);
    const validUserName = this.regUserName.test(user.userName);
    const unSafeUserName = this.unSafe.test(user.userName);
    console.log('safe email', unSafeEmail, 'valid password', validPassword, validUserName, unSafeUserName, validatedEmail);
    
    
    // tslint:disable-next-line: max-line-length
    if (user.userName == null || user.password == null || user.email == null || user.department == null || user.userName === '' || user.password === '' || user.email === '' || user.department === 'Department') {
      this.toast.showToast('error', 'fields must not be empty please check your information and try again', 2500);
    } else if (validPassword && validUserName && validatedEmail && unSafeEmail === false && unSafeUserName === false) {
      console.log('success')
      await this.http.post('/api/v1/users', {
        userName: user.userName,
        password: user.password,
        email: user.email,
        department: user.department
      }).pipe(
        retry(3),
        tap(_ => console.log('from tap')),
        tap(

          (value: string) => {
            switch (true) {
              case value === '':
                this.toast.showToast('error', 'an error has occured', 2500);
                break;
              case value === 'exists':
                this.toast.showToast('error', 'user name or email already in use', 2500);
                break;
              case value === 'added':
                this.toast.showToast('good', 'successfully added user!', 2500);
                sessionStorage.setItem('loggedIn', 'true');
                this.router.navigate(['home', { user: user.userName, loggedIn: true }]);
                break;
            }

          },
          error => console.error(error)
        ),
        catchError(this.handleError)
      ).toPromise();
    }

  }

  async loginUser(user: IUser) {
    if (user.userName == null || user.userName === '' || user.password == null || user.password === '') {
      this.toast.showToast('error', 'fields must not be empty', 2500);
    } else {
      await this.http.post('/api/v1/users/login', {
        userName: user.userName,
        password: user.password

      }).pipe(
        tap(
          (resp: IUser & string) => {

            if (resp === 'no record') {
              this.toast.showToast('error', 'Credentials do not match our records', 2500)
            } else {
              sessionStorage.setItem('loggedIn', 'true');
              sessionStorage.setItem('time', Date.now().toString());
              this.router.navigate(['home', { user: resp.userName, department: resp.department }]);
            }

          },
          error => console.error(error)
        ),
        catchError(this.handleError)
      ).toPromise();
    }
  }



}
