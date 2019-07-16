import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DrawerService } from '../drawer.service';
import { MDCDrawer } from '@material/drawer';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit, OnDestroy, AfterViewInit {

  // initialize drawer variable
  mdcDrawer;

  constructor(private drawer: DrawerService, private router: Router, private login: LoginService) { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    // initializes material design drawer implementation
    this.mdcDrawer = MDCDrawer.attachTo((document.querySelector('.mdc-drawer')));
    // looks to drawer service Subject "isOpen" for open status
    this.drawer.isOpen.subscribe((data) => {
      this.mdcDrawer.open = data;
    });


  }
  ngOnDestroy() {
    // destroys drawer when component closed
    this.mdcDrawer.destroy();

  }
  // provides logout functionality from "login" service
  logout() {
    this.login.logout();
    console.log('logged out')
  }
}
