import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from '../login.service';
import {IdleService} from '../idle.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{

  constructor( private login: LoginService) { }

  ngOnInit() {
  }

  logout(){
    this.login.logout();
    console.log('logged out')
  }
}
