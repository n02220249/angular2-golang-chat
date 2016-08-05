import { Component } from '@angular/core';
//import { Injectable } from '@angular/core';
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
  First Name: <input [(ngModel)]="firstName">

  {{firstName}}
    <button (click)="onClickMe(firstName)">Click me!</button>
    <input #newMsg
      (keyup.enter)="onClickMe(newHMsg.value)"
      (blur)="onClickMe(newMsg.value); newMsg.value='' ">

    <button (click)=onClickMe(newMsg.value)>Add</button>

    {{clickMessage}}
    {{msg}}

    
    `,
  providers:[AppSocketHandler]
})
//@Injectable()
export class AppComponent { 
 // items: <Array<string>>;
  firstName = '';
  clickMessage = '';
  msg = '';
  test = 'test';

  constructor(public _appSocketHandler: AppSocketHandler) {
    // this._appSocketHandler.setList(this.items);
  }

  onClickMe(firstName: string) {
    this.firstName = firstName;
    this.firstName = "";
    //this.clickMessage = 'You are my hero!';


    this._appSocketHandler.sendMsg(firstName);

  }
}