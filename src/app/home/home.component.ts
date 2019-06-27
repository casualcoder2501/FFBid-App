import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { shareReplay } from 'rxjs/operators';
import { IdleService } from '../idle.service';
import * as jwt_decode from 'jwt-decode';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit {


  constructor(private login: LoginService, private idle: IdleService, private activeRoute: ActivatedRoute, private router: Router) {

  }


  ngOnInit() {
    this.idle.checkForIdle();
    this.login.checkToken();
    
    // const isLoggedIn = sessionStorage.getItem('loggedIn');

    // if (isLoggedIn === 'true') {
    //   await this.catchUser();
    //   console.log(sessionStorage.getItem('time'))
    // } else {
    //   this.router.navigate(['']);
    // }
  }

  ngAfterViewInit() {


  }

}
