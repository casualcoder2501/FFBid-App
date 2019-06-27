import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MDCRipple } from '@material/ripple';
import {LoginService} from '../login.service';
interface ITile {
  title: string;
  image: string;
  // description: string;

}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private images = ['/assets/station_create.jpg', '/assets/manage_stations.png'];

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
    }];

  constructor() {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
    const ripples = [].map.call(document.querySelectorAll(selector), (el: any) => {
      return new MDCRipple(el);
    });
  }

}





