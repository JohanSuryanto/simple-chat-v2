import React, { useState } from "react";
import "./index.css";

function App() {
  const [Messages, setMessages] = useState("");

  function registerUser() {
    console.log("register user function");
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
      <input
        type="hidden"
        id="disconnectButton"
        onClick="disconnectUser()"
        value="End Chat"
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
