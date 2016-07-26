// Copyright 2012 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
package main
import (
    "fmt"
//	"io"
	"net/http"
	"golang.org/x/net/websocket"
)
// Echo the data received on the WebSocket.
func EchoServer(ws *websocket.Conn) {
   //var in []byte
	var in string
    if err := websocket.Message.Receive(ws, &in); err != nil {
        return
    }
    fmt.Printf("Received: %s\n", string(in))

    if err := websocket.Message.Send(ws, in); err != nil {
        return
    }
    
    fmt.Printf("Received: %s\n", "sent")

//	fmt.Println(ws)
//	io.Copy(ws, ws)

}
// This example demonstrates a trivial echo server.
func main() {
	http.Handle("/echo", websocket.Handler(EchoServer))

	err := http.ListenAndServe(":5000", nil)
	if err != nil {
		panic("ListenAndServe: " + err.Error())
	}

}
