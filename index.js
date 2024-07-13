const http = require("http");
const express = require('express');
const path = require("path");
const {Server} = require("socket.io");

const PORT = process.env.PORT || 9002;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname,"public")));

io.on("connection",(socket)=>{
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id,...data});
    })
    console.log("Hello from User id:",socket.id);
})

app.use(express.static(path.resolve("./public")));


app.get("/",(req,res)=>{
    res.render("index");
})

server.listen(PORT,() => console.log("Server running in 9000"));