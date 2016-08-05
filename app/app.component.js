"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
//import { Injectable } from '@angular/core';
var app_socketHandler_1 = require('./app.socketHandler');
var AppComponent = (function () {
    function AppComponent(_appSocketHandler) {
        this._appSocketHandler = _appSocketHandler;
        // items: <Array<string>>;
        this.firstName = '';
        this.clickMessage = '';
        this.msg = '';
        this.test = 'test';
        // this._appSocketHandler.setList(this.items);
    }
    AppComponent.prototype.onClickMe = function (firstName) {
        this.firstName = firstName;
        this.firstName = "";
        //this.clickMessage = 'You are my hero!';
        this._appSocketHandler.sendMsg(firstName);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n\n\n<ul>\n    <li *ngFor=\"let msg of _appSocketHandler.msgs\">\n      {{ msg }}\n      </li>\n  </ul>\n\n\n  <br>\n  First Name: <input [(ngModel)]=\"firstName\">\n\n  {{firstName}}\n    <button (click)=\"onClickMe(firstName)\">Click me!</button>\n    <input #newMsg\n      (keyup.enter)=\"onClickMe(newHMsg.value)\"\n      (blur)=\"onClickMe(newMsg.value); newMsg.value='' \">\n\n    <button (click)=onClickMe(newMsg.value)>Add</button>\n\n    {{clickMessage}}\n    {{msg}}\n\n    \n    ",
            providers: [app_socketHandler_1.AppSocketHandler]
        }), 
        __metadata('design:paramtypes', [app_socketHandler_1.AppSocketHandler])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map