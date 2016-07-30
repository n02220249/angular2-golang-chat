export class AppSocketHandler {
	msgs;
	ws;
  constructor(){
  this.msgs = [];
  this.ws = new WebSocket("ws://localhost:5000/echo");
  this.ws.onmessage = function (evt) 
               { 
                  var received_msg = evt.data;
                  alert("test "+received_msg);
                  this.msgs.push(received_msg);


               }.bind(this);

  }

  addToList(msg){
alert(msg);
  }
   setList(list){
alert("works");

   }
   listen(){

   }

    addMsg(msg){
      this.msgs.push(msg);

    }

	getMsg(){
       return "it works";
	}

    sendMsg(str){
    alert('before '+this.ws.readyState);
alert(str);
this.ws.send(str);
alert(this.ws.readyState);
//this.msgs.push("bb");

    }

}