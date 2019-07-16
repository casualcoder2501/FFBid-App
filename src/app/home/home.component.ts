import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { IdleService } from '../idle.service';

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
  }

  ngAfterViewInit() {


  }

}
