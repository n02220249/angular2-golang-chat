"use strict";
var AppSocketHandler = (function () {
    function AppSocketHandler() {
        this.msgs = ["aaa"];
        this.ws = new WebSocket("ws://localhost:5000/echo");
        this.ws.onmessage = function (evt) {
            var received_msg = evt.data;
            alert("test " + received_msg);
            // this.msgs.push = ["sss"];
        };
    }
    AppSocketHandler.prototype.addToList = function (msg) {
        alert(msg);
    };
    AppSocketHandler.prototype.setList = function (list) {
        alert("works");
    };
    AppSocketHandler.prototype.listen = function () {
    };
    AppSocketHandler.prototype.addMsg = function (msg) {
        this.msgs.push(msg);
    };
    AppSocketHandler.prototype.getMsg = function () {
        return "it works";
    };
    AppSocketHandler.prototype.sendMsg = function (str) {
        alert(str);
        this.ws.send(str);
        this.msgs.push("bb");
    };
    return AppSocketHandler;
}());
exports.AppSocketHandler = AppSocketHandler;
//# sourceMappingURL=app.socketHandler.js.map