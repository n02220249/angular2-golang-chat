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
  <input [(ngModel)]="firstName">
  <button (click)="clicked(firstName)">Send</button>
  `,
  providers:[AppSocketHandler]
})

export class AppComponent { 

  firstName = '';
  clickMessage = '';
  msg = '';
  test = 'test';

  constructor(public _appSocketHandler: AppSocketHandler) {

  }

  clicked(firstName: string) {
    this.firstName = "";

    this._appSocketHandler.sendMsg(firstName);

  }
}