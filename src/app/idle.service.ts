import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { windowWhen } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private idleTime = 0;
  public idleCounter;



  constructor(private router: Router) {

  }

  checkForIdle() {
    this.idleCounter = setInterval(this.idle, 60000);
    window.onmousemove = () => {
      this.idleTime = 0;
      console.log(this.idleTime);
    };
    window.onkeyup = () => {
      this.idleTime = 0;
      console.log(this.idleTime);
    };
    window.onclick = () => {
      this.idleTime = 0;
      console.log(this.idleTime);
    };
  }

  idle = () => {
    this.idleTime = this.idleTime + 1;
    console.log(this.idleTime);
    if (this.idleTime > 29) {
      sessionStorage.clear();
      this.router.navigate(['']);
      clearInterval(this.idleCounter);
      window.onmousemove = () => {
       return null;
      }
      window.onkeyup = () => {
        return null;
      }
      window.onclick = () => {
       return null;
      }
    }
  }

}
