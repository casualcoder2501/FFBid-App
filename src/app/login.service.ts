import { Injectable } from '@angular/core';
import { tap, shareReplay } from 'rxjs/operators';
import { ToastService } from './toast/toast.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IdleService } from './idle.service';
import { User, Token, CurrentUser } from './user.model';

import * as jwt_decode from 'jwt-decode';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root'
})


// service that controls the logic for user authentication, account creation, and login

export class LoginService {

  // regular expressions to ensure that user input is of a valid format
  // and test for unsafe characters. Rejects the form and shows alert if
  // there are any unsafe characters or if the format requirements are not met.
  // email format supports john123.smith7895.jingleheimer879@mail.box.com or at a minimum j@co.ed
  // password is between 5 and 18 alpha numberic characters with at least 1 chosen special character
  // unsafe characters are <>{}():;/[].  *& allowed in password
  regEmail = new RegExp(/^([a-zA-Z0-9])+\.?([a-zA-Z0-9])*\.?([a-zA-Z0-9])*\.?@([a-zA-z]{2,})*\.+([a-zA-z]{2,})+\.?([a-zA-z]{2,})*/);
  regPassword = new RegExp(/[a-zA-z0-9]{5,18}[!@#$%^&*]+/);
  regUserName = new RegExp(/[a-zA-z0-9]{3,}/);
  unSafe = new RegExp(/[<>{}/&\*;:\[\]\(\)]/);
  unSafePassword = new RegExp(/[<>/{}\[\]\(\).:;]/);

  // user object stores the current user's userName and department is initially set
  // to null. Final value obtained from JSON web token payload
  user: IUser = {
    userName: null,
    department: null
  };

  // tslint:disable-next-line: max-line-length
  constructor(private idle: IdleService, private toast: ToastService, private http: HttpClient, private router: Router) { }

  // error handing function, not currently in use.
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

  // calling this function clears the users session storage, removes event
  // listeners for idle service and clears it's interval, and navigates user back to 
  // login screen.
  logout() {
    sessionStorage.clear();
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
    this.router.navigate(['']);
  }


  async createUser(user: User) {

    // checking for format and unsafe characters from user input using regular expressions
    const validatedEmail = this.regEmail.test(user.email);
    const unSafeEmail = this.unSafe.test(user.email);
    const validPassword = this.regPassword.test(user.password);
    const validUserName = this.regUserName.test(user.userName);
    const unSafeUserName = this.unSafe.test(user.userName);
    const unSafePassword = this.unSafePassword.test(user.password);
    console.log('safe email', unSafeEmail, 'valid password', validPassword, validUserName, unSafeUserName, validatedEmail);

    // checks for empty user input
    if (user.userName == null || user.password == null || user.email == null || user.department == null ||
      user.userName === '' || user.password === '' || user.email === '' || user.department === 'Department') {
      this.toast.showToast('error', 'fields must not be empty please check your information and try again', 2500);
    } else if (validPassword && validUserName && validatedEmail &&
      unSafeEmail === false && unSafeUserName === false && unSafePassword === false) {
      console.log('success');
      //
      // making request to server
      await this.http.post('/api/users', {
        userName: user.userName,
        password: user.password,
        email: user.email,
        department: user.department
      }).pipe(
        retry(3),
        tap(_ => console.log('from tap')),
        tap(

          // looks for the text string that is sent back by the server
          (resp: Token & string) => {
            switch (true) {
              case resp === '':
                this.toast.showToast('error', 'an error has occured', 2500);
                break;
              case resp === 'exists':
                this.toast.showToast('error', 'user name or email already in use', 2500);
                break;
              case resp.status === 'added':
                const decoded = jwt_decode(resp.id_token);
                console.log(decoded);
                const expiresAt = decoded.exp;
                console.log(expiresAt);
                sessionStorage.setItem('id_token', JSON.stringify(resp.id_token));
                sessionStorage.setItem('expires_at', JSON.stringify(expiresAt));
                this.toast.showToast('good', 'successfully added user!', 2500);

                this.router.navigate(['home']);
                break;
            }

          }
        ),
        catchError(this.handleError),

      ).toPromise();
    }
    shareReplay(1);

  }


  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }
  // This function tests whether the current time stamp is greater than the
  // stored expiration time stamp for the json web token and returns true if
  // the token's expiration has not yet passed. Used to validate user session.
  isLoggedIn(): boolean {
    const expiresAt = sessionStorage.getItem('expires_at');
    const expiration: number = JSON.parse(expiresAt);
    const current: number = Math.round(Date.now() / 1000);
    const expired = expiration < current;

    if (expired || expiration === undefined || expiration === null) {
      sessionStorage.clear();
      return false;
    } else {
      return true;
    }

  }

  // uses isLoggedIn to decide to  either set the current user from the stored token
  // from the server when the page is loaded or send the user back to the login screen
  // if their token has expired.
  checkToken(): boolean {
    if (this.isLoggedIn()) {

      this.getCurrentUser();
      return true;

    } else {

      this.logout();
      return false;

    }
  }

  getCurrentUser() {
    const userInfo = jwt_decode(sessionStorage.getItem('id_token'));
    this.user = {
      userName: userInfo.userName,
      department: userInfo.department
    }
    console.log(this.user)
  }

  async loginUser(user: User) {
    if (user.email == null || user.email === '' || user.password == null || user.password === '') {
      this.toast.showToast('error', 'fields must not be empty', 2500);
    } else {
      await this.http.post('/api/users/login', {
        email: user.email,
        password: user.password

      }).pipe(
        tap(
          (resp: Token & string) => {
            console.log(resp);
            if (resp === 'no record') {
              this.toast.showToast('error', 'Credentials do not match our records', 2500)
            } else {
              const decoded = jwt_decode(resp.id_token);
              console.log(decoded);
              const expiresAt = decoded.exp;
              console.log(expiresAt);
              sessionStorage.setItem('id_token', JSON.stringify(resp.id_token));
              sessionStorage.setItem('expires_at', JSON.stringify(expiresAt));
              this.router.navigate(['home']);
            }

          },
          error => console.error(error)
        )
      ).toPromise();
    }
    shareReplay(1);
  }



}
