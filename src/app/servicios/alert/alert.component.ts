import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from './alert.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit {

  message: string = '';
  isVisible: boolean = false;
  colorCopied: string = ''

  constructor(private alertService: AlertService) { }


  ngOnInit() {
    
    this.alertService.getVisibility().subscribe(visible => {
      this.isVisible = visible;
    });
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  closeAlert() {
    this.alertService.hideMessage();
  }




}
