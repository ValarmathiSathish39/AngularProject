import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private subject = new Subject<any>();
  constructor() {}

  sendMessage(message: boolean): void {
    this.subject.next(message);
  }
  clearMessages() {
    this.subject.next(false);
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
