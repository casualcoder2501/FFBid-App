import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MDCRipple } from '@material/ripple';
import { ITile } from '../user.model';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { IPosition, IStation, IStationArray, StationsResolverService } from '../stations-resolver.service';
@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit, AfterViewInit {

  // loadedStations: Array<IStation>;

  // array containing urls for background images
  private images = ['/assets/station_create.jpg'];


  // array containing action tiles for user navigation


  constructor(private route: ActivatedRoute, private login: LoginService) { }

  async ngOnInit() {
    // await this.route.data.subscribe((data: { stations: IStationArray }) => {
    //   this.loadedStations = data.stations.stations;

    //   console.log(this.loadedStations)
    // })



  }
  ngAfterViewInit() {
    const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
    const ripples = [].map.call(document.querySelectorAll(selector), (el: any) => {
      return new MDCRipple(el);
    });
  }

}

