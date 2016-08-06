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
 //   "html/template"
 
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
     msgs = append(msgs, strconv.Itoa(id) + " has joined")
     updateClientMsgs()
     fmt.Println(len(users))
     ws.Write([]byte(strings.Join(msgs, ",")))
  for {
    receivedtext := make([]byte, 100)
    
    n,err := ws.Read(receivedtext)
 
    if err != nil {
      fmt.Printf("Received: %d bytes\n",n)
fmt.Printf("closed")  
     msgs = append(msgs, strconv.Itoa(id) + " has left")
     updateClientMsgs()
       delete(users, id)

       ws.Close()
       return    


    } else {
        str := string(receivedtext)
        str = strconv.Itoa(id) + ": " + str

        msgs = append(msgs, str)

        fmt.Printf("%v", msgs)
//ws.Write([]byte(strings.Join(msgs, ",")))
      updateClientMsgs()

    }
 
    s := string(receivedtext[:n])
    fmt.Printf("Received: %d bytes: %s\n",n,s)
    //io.Copy(ws, ws)
    //fmt.Printf("Sent: %s\n",s)
  }

}
// This example demonstrates a trivial echo server.
func updateClientMsgs(){
      for k := range users {
        users[k].Write([]byte(strings.Join(msgs, ",")))
       }

}


func main() {

    users = map[int]*websocket.Conn{}
    msgs = make([]string, 0, 10)

   // mux := http.NewServeMux()
    //mux.Handle("/echo", websocket.Handler(EchoServer))
    //http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css"))))
    http.Handle("/", http.FileServer(http.Dir("./")))
    http.Handle("/app/", http.StripPrefix("/app/", http.FileServer(http.Dir("app"))))
    http.Handle("/node_modules/", http.StripPrefix("/node_modules/", http.FileServer(http.Dir("node_modules"))))

//    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
//    http.ServeFile(w, r, "./index.html")

//})

	http.Handle("/echo", websocket.Handler(EchoServer))

	err := http.ListenAndServe(":5000", nil)
	if err != nil {
		panic("ListenAndServe: " + err.Error())
	}

}
