import React, { useEffect, useState } from "react";
import "./index.css";
import socketIOClient from "socket.io-client";

let socket = socketIOClient("http://localhost:3002");

function App() {
  useEffect(() => {
    initialize();
  });
  const [Messages, setMessages] = useState("");

  function initialize() {
    var messagesElement = document.getElementById("messages");

    socket.on("registUser", function (msg) {
      var item = document.createElement("li");
      item.textContent = msg + " join the chat!";
      item.className = "registUser";
      messagesElement.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on("chatMessage", function (username, msg) {});
  }
  function registerUser() {
    socket.emit("registUser", "Anom");
  }
  function inputMessage() {
    var messagesElement = document.getElementById("messages");

    var item = document.createElement("li");
    if (Messages !== "") {
      item.textContent = Messages;
      messagesElement.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
      setMessages("");
    }
  }
  function onChange(value, type) {
    switch (type) {
      case "Message":
        setMessages(value);
        break;
      default:
        break;
    }
  }

  return (
    <body>
      <title>Simple Chat</title>
      <input
        type="button"
        id="registerButton"
        onClick={() => registerUser()}
        value="Register"
      />
      <input type="hidden" id="username" />
      <ul id="messages"></ul>

      <form id="form" action="">
        <input
          id="input"
          autoComplete="off"
          value={Messages}
          onChange={(e) => onChange(e.target.value, "Message")}
        />
        <input type="button" value="Send" onClick={() => inputMessage()} />
      </form>
    </body>
  );
}

export default App;
