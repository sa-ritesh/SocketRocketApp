const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 1999;
//socketserver.io ->postman of socket
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
const getVisitors = () => {
  //   // object of objects of all sockets  {"12":{},"13":{}}
  const users = [];
  Array.from(io.sockets.sockets).map((socket) => {
    users.push(socket[1].user);
  });
  return users;
};
const emitVisitors = () => {
  //when new user connected we will emit visitors to all sockets
  io.emit("visitors", getVisitors());
};
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    emitVisitors();
  });
  socket.on("new_visitor", (user) => {
    // binding user to socket
    socket.user = user;
    console.log("new_visitor", user);
    emitVisitors();
  });
});

server.listen(port, () => {
  console.log(`listening on :${port}`);
});
