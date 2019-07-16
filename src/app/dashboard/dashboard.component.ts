import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MDCRipple } from '@material/ripple';
import { LoginService } from '../login.service';

import { ITile } from '../user.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

   // array containing urls for background images
  private images = ['/assets/station_create.jpg', '/assets/manage_stations.png'];

  // array containing action tiles for user navigation
  private tiles: Array<ITile> = [
    {
      title: 'Create Station',
      image: `url(${this.images[0]})`,
    },
    {
      title: 'Manage Stations',
      image: `url(${this.images[1]})`,
    },
    {
      title: 'Create Station',
      image: `url(${this.images[0]})`,
    },
    {
      title: 'Create Station',
      image: `url(${this.images[0]})`,
    },
    {
      title: 'Create Station',
      image: `url(${this.images[0]})`,
    },
    {
      title: 'Manage Stations',
      image: `url(${this.images[1]})`,
    },
    {
      title: 'Create Station',
      image: `url(${this.images[0]})`,
    },
    {
      title: 'Create Station',
      image: `url(${this.images[0]})`,
    }];

  constructor() {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // adds ripple effect to these  class selectors
    const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
    const ripples = [].map.call(document.querySelectorAll(selector), (el: any) => {
      return new MDCRipple(el);
    });
  }

}





