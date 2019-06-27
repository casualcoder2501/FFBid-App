import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User, CUser } from '../user.model';
import { LoginService } from '../login.service';


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
