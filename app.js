const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/contact.html')
});

app.get('/portfolio', (req, res) => {
  res.sendFile(__dirname + '/portfolio.html')
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    
  });
  // socket.on('disconnect', function(){
  //   console.log('user disconnected');
  // });
});

http.listen(3000, () => {
  console.log('listening on port 3000')
});
//run on terminal $ node app
