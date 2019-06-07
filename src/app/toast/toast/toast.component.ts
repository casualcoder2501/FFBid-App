import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  toasts: Array<any> = [];
  constructor(private toastServ: ToastService) { }

  ngOnInit() {
    this.toastServ.toastChanged.subscribe((data: any) => {
      this.toasts.push(data);
    })
  }


}

