// Copyright 2012 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
package main
import (
    "fmt"
//	"io"
	"net/http"
	"golang.org/x/net/websocket"
    "math/rand"
    "strconv"
    "strings"
 
)
 //   var users map[*websocket.Conn]int
    var msgs []string
    var users map[int]*websocket.Conn
// Echo the data received on the WebSocket.
func EchoServer(ws *websocket.Conn) {
   //var in []byte
	//var in string
//    var users map[*websocket.Conn]int
     id := rand.Intn(1000000000)
     fmt.Println(id)
     fmt.Println("id : "+ string(id))
     users[id] = ws
     fmt.Println(len(users))
     ws.Write([]byte(strings.Join(msgs, ",")))
  for {
    receivedtext := make([]byte, 100)
    
    n,err := ws.Read(receivedtext)
 
    if err != nil {
      fmt.Printf("Received: %d bytes\n",n)
      


    } else {
        str := string(receivedtext)
        str = strconv.Itoa(id) + ": " + str

        msgs = append(msgs, str)

        fmt.Printf("%v", msgs)
//ws.Write([]byte(strings.Join(msgs, ",")))
      for k := range users {
        users[k].Write([]byte(strings.Join(msgs, ",")))
       }

    }
 
    s := string(receivedtext[:n])
    fmt.Printf("Received: %d bytes: %s\n",n,s)
    //io.Copy(ws, ws)
    //fmt.Printf("Sent: %s\n",s)
  }
  /*
    
    if err := websocket.Message.Receive(ws, &in); err != nil {
        return
    } else {
        fmt.Println("test")
    }
    if name, ok := users[ws]; ok {
        fmt.Println(name, ok)
        fmt.Println("recognized")
        fmt.Println(users[ws])
    } else {
        fmt.Println(name, ok)
        id := rand.Intn(1000000000)
        users[ws] = id
        fmt.Println(id)
    }
    fmt.Printf("Received: %s\n", string(in))

    if err := websocket.Message.Send(ws, in); err != nil {
        return
    }
    
    fmt.Printf("Received: %s\n", "sent")

//	fmt.Println(ws)
	io.Copy(ws, ws)
    */

}
// This example demonstrates a trivial echo server.
func main() {

    users = map[int]*websocket.Conn{}
    msgs = make([]string, 0, 10)
	http.Handle("/echo", websocket.Handler(EchoServer))

	err := http.ListenAndServe(":5000", nil)
	if err != nil {
		panic("ListenAndServe: " + err.Error())
	}

}
