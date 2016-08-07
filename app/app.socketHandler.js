"use strict";
var AppSocketHandler = (function () {
    function AppSocketHandler() {
        this.msgs = [];
        this.ws = new WebSocket("ws://localhost:5000/echo");
        this.ws.onmessage = function (evt) {
            var received_msg = evt.data;
            this.msgs = String(received_msg).split(',');
        }.bind(this);
    }
    AppSocketHandler.prototype.sendMsg = function (str) {
        this.ws.send(str);
    };
    return AppSocketHandler;
}());
exports.AppSocketHandler = AppSocketHandler;
//# sourceMappingURL=app.socketHandler.js.map