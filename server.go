// Copyright 2012 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
package main

import (
	"fmt"
	"golang.org/x/net/websocket"
	"math/rand"
	"net/http"
	"strconv"
	"strings"
)

var msgs []string
var users map[int]*websocket.Conn

func EchoServer(ws *websocket.Conn) {

	id := rand.Intn(1000000000) // create new client's id
	fmt.Println("id : " + strconv.Itoa(id))

	users[id] = ws                                      //add new user's ws connection to users
	msgs = append(msgs, strconv.Itoa(id)+" has joined") //add new user message to msgs

	updateClientMsgs() //update all clients' msgs
	fmt.Println("number of users in room: " + strconv.Itoa(len(users)))

	for { //enter infinite loop listening to receive incoming ws data
		receivedtext := make([]byte, 100)

		n, err := ws.Read(receivedtext)

		if err != nil { // if err is not nil ws is closed

			fmt.Println("closed")
			msgs = append(msgs, strconv.Itoa(id)+" has left") //add user has left message to msgs

			updateClientMsgs() //update users' msgs

			delete(users, id) //remove user from users
			fmt.Println("number of users in room: " + strconv.Itoa(len(users)))

			ws.Close()
			return //exit infinite loop

		} else { //ws received new message from client
			str := string(receivedtext)
			str = strconv.Itoa(id) + ": " + str

			msgs = append(msgs, str) //add message to msgs

			updateClientMsgs() //update users' msgs

		}

		s := string(receivedtext[:n])
		fmt.Printf("Received: %d bytes: %s\n", n, s)

	}

}

func updateClientMsgs() {
	for k := range users { // send updated state of msgs to all clients
		users[k].Write([]byte(strings.Join(msgs, ",")))
	}

}

func main() {

	users = map[int]*websocket.Conn{} //list of users websocket connections
	msgs = make([]string, 0, 10)      //list of this chat room's messages
	//server static angular2 files
	http.Handle("/", http.FileServer(http.Dir("./")))
	http.Handle("/app/", http.StripPrefix("/app/", http.FileServer(http.Dir("app"))))
	http.Handle("/node_modules/", http.StripPrefix("/node_modules/", http.FileServer(http.Dir("node_modules"))))

	http.Handle("/echo", websocket.Handler(EchoServer)) //listen for websocket endpoint

	fmt.Println("server started, go to http://localhost:5000")

	err := http.ListenAndServe(":5000", nil)
	if err != nil {
		panic("ListenAndServe: " + err.Error())
	}

}
