import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { tap, retry } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginService } from './login.service';




export interface IPosition {
  title: string;
  shift: string;
}

export interface IStation {
  department?: string;
  name?: string;
  image?: string;
  positions?: Array<IPosition>;
}

export interface IStationArray {
  stations: Array<IStation>;
}

@Injectable({
  providedIn: 'root'
})
export class StationsResolverService implements Resolve<IStationArray>{
  department: string;
  constructor(private router: Router, private http: HttpClient, private login: LoginService) {
    this.department = this.login.user.department;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStationArray> | Observable<never> {

    return this.http.get(`api/stations/${this.department}`).pipe(
      tap(

        (resp: IStationArray) => {
          if (resp) {
            console.log(resp)
            return of(resp);
          } else {
            this.router.navigate(['home']);
            return EMPTY;
          }
        }
      )
    )



  }


}
