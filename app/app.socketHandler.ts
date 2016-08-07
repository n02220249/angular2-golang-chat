export class AppSocketHandler {
  msgs: string[];
  ws: WebSocket;

  constructor(){
    this.msgs = [];
    this.ws = new WebSocket("ws://localhost:5000/echo");
    this.ws.onmessage = function (evt)                  //create listener for incoming messages
      {
        var received_msg = evt.data;
        this.msgs = String(received_msg).split(',');    //convert message into array and set as this.msgs
      }.bind(this);                                     // bind this context to have scope of this.msgs
    }

  sendMsg(str: string){
    this.ws.send(str);
  }
}