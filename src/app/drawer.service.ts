import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  isOpen: Subject<any> = new Subject<any>();
  constructor() { }

  open(open: boolean) {
    this.isOpen.next(open);
  }
}
