const express = require('express');
const app = express();
const io = require('socket.io')(); //activate the chat plugin - instatiated
var users = [];

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
  //handle messages sent from the client
  updateUsers();
  socket.on('chat message', (msg) => {
    io.emit('chat message', { for : 'everyone', message: msg, color: socket.color });
  });

  //new user message
  socket.on('new user', ({nickname, newColor}) => {
    socket.username = nickname;
    io.emit('chat message', { for : 'everyone', message: `<li class="on-status">${nickname} is here!`});
    users.push(socket.username);
    updateUsers();
    socket.color = newColor;
  });

  // function to update list of active users
  function updateUsers() {
    io.sockets.emit('list users', users);
  }

  //disconnect function
  socket.on('disconnect', (data) => {
    console.log(socket.username);
    if(socket.username){
      users.splice(users.indexOf(socket.username), 1);
      io.emit('disconnect message', `<li class="off-status">${socket.username} has left the chat`);
      updateUsers();
    }
  });
});

//run on terminal $ nodemon app
