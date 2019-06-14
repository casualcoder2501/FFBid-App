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
  mdcDrawer;
  constructor(private drawer: DrawerService, private router: Router, private login: LoginService) { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.mdcDrawer = MDCDrawer.attachTo((document.querySelector('.mdc-drawer')));
    this.drawer.isOpen.subscribe((data) => {
      this.mdcDrawer.open = data;
    })


  }
  ngOnDestroy() {
    this.mdcDrawer.destroy();

  }

  logout() {
    this.login.logout();
    console.log('logged out')
  }
}
