const express = require('express');
const app = express();
// var http = require('http').Server(app);
const io = require('socket.io')(); //activate the chat plugin - instatiated

//serve up static files
app.use(express.static('public'));

//add routes
app.use(require('./routes/index'));
app.use(require('./routes/portfolio'));
app.use(require('./routes/contact'));

const server = app.listen(3000, () => {
  console.log('listening on port 3000')
});

io.attach(server);

io.on('connection', socket => { //function(socket) { ... }
  console.log('a user has connected');

  io.emit('chat message', { for : 'everyone', message: `${socket.id} is here!`});

  //handle messages sent from the client
  socket.on('chat message', (msg) => {
    io.emit('chat message', { for : 'everyone', message: msg });
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('disconnect message', `${socket.id} has left the building`);
  });
});

//run on terminal $ nodemon app
