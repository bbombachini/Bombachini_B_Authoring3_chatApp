'use strict';

(function () {
  var socket = io();

  var messageList = document.querySelector('#messages'),
      chatForm = document.querySelector('form'),
      nameInput = document.querySelector('.nickname'),
      chatMessage = chatForm.querySelector('.message'),
      nickname = null,
      newColor = void 0;
  var enter = document.querySelector('#enter');
  var list = document.querySelector('.users');

  //get the actual time to append to user message
  var getTime = function getTime(date) {
    return date.getHours() + ':' + ("0" + date.getMinutes()).slice(-2);
  };
  // console.log(getTime( new Date(Date.now())));

  //defines a random color
  var randomColor = function randomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  // console.log(randomColor());


  function setNickname() {
    nickname = nameInput.value;
    var header = document.querySelector('.header');
    var content = document.querySelector('.content');
    header.style.display = "none";
    var chat = document.querySelector('#chat');
    chat.style.display = "grid";
    content.style.height = "100vh";
    newColor = randomColor();
    socket.emit('new user', { nickname: nickname, newColor: newColor });
  }

  function appendMessage(msg) {
    var time = getTime(new Date(Date.now()));
    var newMsg = msg.message + '</br><span>' + time + '</span></li>';
    messageList.innerHTML += newMsg;
  }

  function appendDiscMessage(msg) {
    var newMsg = '<li>' + msg + '</li>';
    messageList.innerHTML += newMsg;
  }

  function handleSendMessage(e) {
    e.preventDefault();
    nickname = nickname && nickname.length > 0 ? nickname : 'user';
    msg = '<li style="background-color:' + newColor + '">' + nickname + ': ' + chatMessage.value;
    socket.emit('chat message', msg);
    chatMessage.value = "";
    return false;
  }

  nameInput.addEventListener('keyup', function (evt) {
    evt.preventDefault();
    if (evt.keyCode === 13) {
      setNickname();
    }
  });
  enter.addEventListener('click', setNickname, false);
  chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('disconnect message', appendDiscMessage, false);
  socket.addEventListener('list users', function (data) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    data.forEach(function (data) {
      var newUser = '<li>' + data + '</li>';
      list.innerHTML += newUser;
    });
  });
})();
