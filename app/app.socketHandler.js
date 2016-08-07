"use strict";
var AppSocketHandler = (function () {
    function AppSocketHandler() {
        this.msgs = [];
        this.ws = new WebSocket("ws://localhost:5000/echo");
        this.ws.onmessage = function (evt) {
            var received_msg = evt.data;
            this.msgs = String(received_msg).split(','); //convert message into array and set as this.msgs
        }.bind(this); // bind this context to have scope of this.msgs
    }
    AppSocketHandler.prototype.sendMsg = function (str) {
        this.ws.send(str);
    };
    return AppSocketHandler;
}());
exports.AppSocketHandler = AppSocketHandler;
//# sourceMappingURL=app.socketHandler.js.map