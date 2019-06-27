import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { DrawerService } from '../drawer.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isOpen = true;
  constructor(private login: LoginService, private router: Router, private drawer: DrawerService) { }

  ngOnInit() {
  }


  open() {
    this.drawer.open(this.isOpen);
    this.isOpen = !this.isOpen;
    console.log(this.isOpen)
  }
}
