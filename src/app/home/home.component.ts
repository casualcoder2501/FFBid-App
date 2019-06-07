import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { shareReplay } from 'rxjs/operators';
import {IdleService} from '../idle.service';


export interface IUserInfo {
  user?: string;
  loggedIn: boolean;
  department?: string;
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit {
  private loggedIn = false;
  private user: string;
  private department: string;

  constructor(private idle: IdleService, private activeRoute: ActivatedRoute, private router: Router) {

  }


  async ngOnInit() {
    const isLoggedIn = sessionStorage.getItem('loggedIn');

    if (isLoggedIn === 'true') {
      await this.catchUser();
      console.log(sessionStorage.getItem('time'))
    } else {
      this.router.navigate(['']);
    }
  }

  ngAfterViewInit() {
    this.idle.checkForIdle();

  }

  catchUser() {
    return this.activeRoute.params.subscribe(
      (data: IUserInfo) => {
        if (data.user) {
          this.user = data.user;
        }
        if (data.department) {
          this.department = data.department;
        }
      },
    );

  }

}
