var TASK = require('./routes/task');
const ACCOUNT = require('./routes/account');
var Auth = require('./_middleware/authentication')
var express = require('express');
var cors = require('cors');
var path = require('path');
const cookies = require("cookie-parser");
var socket = require('socket.io');
const http = require("http");

var app = express();

app.use(cors({
   origin: 'http://localhost:8083',
   credentials: true
   })
)

app.use(express.static('../public'));

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.json());
app.use(cookies());

const server = http.createServer(app);

server.listen(8082, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
});

var io = socket(server, {
   cors: {
      origin: 'http://localhost:8083',
      credentials: true
   }
});

io.on('connection', socket => {
   socket.use((packet, next) => {
      Auth.checkTokenSocket(socket, packet, next);
   });
   console.log('connected');

   socket.on('error', err => {
      socket.emit('auth_error', {statusCode : err.statusCode, message : 'Unauthorized'} );
    })
   TASK.TASK_LISTENERS(socket);
   ACCOUNT.ACCOUNT_LISTENERS(socket);
   socket.on("disconnect", () => console.log("disconnected"));
})
