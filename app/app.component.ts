import { Component } from '@angular/core';
import { AppSocketHandler } from './app.socketHandler';

@Component({
  selector: 'my-app',
  template: `

  <ul>
    <li *ngFor="let msg of _appSocketHandler.msgs">
      {{ msg }}
    </li>
  </ul>

  <br>
  <input [(ngModel)]="message">
  <button (click)="clicked(message)">Send</button>
  `,
  providers:[AppSocketHandler]
})

export class AppComponent { 

  message = '';

  constructor(public _appSocketHandler: AppSocketHandler) {

  }

  clicked(message: string) {

    this.message = '';                          //clear text field after sending message

    this._appSocketHandler.sendMsg(message);    //have Socket Handler send message to server

  }
}