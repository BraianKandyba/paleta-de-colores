import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private messageSubject = new BehaviorSubject<string>('');
  private visibleSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  getMessage() {
    return this.messageSubject.asObservable();
  }

  getVisibility() {
    return this.visibleSubject.asObservable();
  }

  showMessage(message: string) {
    this.messageSubject.next(message);
    this.visibleSubject.next(true);
    
  }

  hideMessage() {
    this.messageSubject.next('');
    this.visibleSubject.next(false);
  }

  
}
