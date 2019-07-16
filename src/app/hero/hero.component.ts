import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from '../login.service';


// Hero image component used to display user greeting

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, AfterViewInit {



  constructor(private login: LoginService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

}
