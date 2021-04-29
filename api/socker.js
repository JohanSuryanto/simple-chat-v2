const express = require("express");
const app = express();
const http = require("http");
const { connect } = require("http2");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000", // or "*"
    methods: ["GET", "POST"],
  },
});
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "./src/App.js");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("registUser", (username) => {
    console.log("register a user in server");
    io.emit("registUser", username);
  });
  socket.on("disconnectUser", (username) => {
    io.emit("disconnectUser", username);
  });

  socket.on("chatMessage", (username, msg) => {
    io.emit("chatMessage", username, msg);
  });

  socket.on("connect", () => {
    io.emit("chatMessage", "Anonymous", "join the chat!");
  });

  socket.on("disconnect", (a) => {
    console.log("SOMEONE DISCONNECT!");
    io.emit("disconnectUser", null);
  });
});

server.listen(3002, () => {
  console.log("listening on *:3002");
});

module.exports = app;
