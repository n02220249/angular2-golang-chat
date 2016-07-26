import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { AppSocketHandler } from './app.socketHandler';

@Component({
  selector: 'my-app',
  template: `
  First Name: <input [(ngModel)]="firstName">
  {{firstName}}
    <button (click)="onClickMe(firstName)">Click me!</button>
    {{clickMessage}}
    {{msg}}
    {{_appSocketHandler.msgs}}
    {{items}}
    `,
  providers:[AppSocketHandler]
})
@Injectable()
export class AppComponent { 
  items: Observable<Array<string>>;
  firstName = '';
  clickMessage = '';
  msg = '';
  test = 'test';

  constructor(public _appSocketHandler: AppSocketHandler) {
     this._appSocketHandler.setList(this.items);
  }

  onClickMe(firstName: string) {
    this.firstName = firstName;
    this.clickMessage = 'You are my hero!';


    this._appSocketHandler.sendMsg(firstName);

  }
}