const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3500",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (msg) => {
    console.log("message: " + msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3600, () => {
  console.log("listening on *:3000");
});
