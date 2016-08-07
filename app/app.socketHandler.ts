export class AppSocketHandler {
	msgs;
	ws;
  constructor(){
  this.msgs = [];
  this.ws = new WebSocket("ws://localhost:5000/echo");
  this.ws.onmessage = function (evt) 
               { 
                  var received_msg = evt.data;
                 this.msgs = String(received_msg).split(',');

               }.bind(this);

  }

  sendMsg(str){
     this.ws.send(str);

  }

}