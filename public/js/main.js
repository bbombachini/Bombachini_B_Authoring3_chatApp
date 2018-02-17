(() => {
  const socket = io();

  let messageList = document.querySelector('#messages'),
      chatForm = document.querySelector('form'),
      nameInput = document.querySelector('.nickname'),
      chatMessage = chatForm.querySelector('.message'),
      nickname = null,
      newColor;
  var enter = document.querySelector('#enter');
  var list = document.querySelector('.users');

  //get the actual time to append to user message
  const getTime = (date) => {
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`;
  }
  // console.log(getTime( new Date(Date.now())));

  //defines a random color
  var randomColor = () => {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for(let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // console.log(randomColor());


  function setNickname() {
    nickname = nameInput.value;
    let header = document.querySelector('.header');
    let content = document.querySelector('.content');
    header.style.display = "none";
    let chat = document.querySelector('#chat');
    chat.style.display = "grid";
    content.style.height = "100vh";
    newColor = randomColor();
    socket.emit('new user', {nickname, newColor});
  }

  function appendMessage(msg) {
    let time = getTime( new Date(Date.now()));
    let newMsg = `${msg.message}</br><span>${time}</span></li>`;
    messageList.innerHTML += newMsg;
  }

  function appendDiscMessage(msg) {
    let newMsg = `<li>${msg}</li>`;
    messageList.innerHTML += newMsg;
  }

  function handleSendMessage(e) {
    e.preventDefault();
    nickname = (nickname && nickname.length > 0) ? nickname : 'user';
    msg = `<li style="background-color:${newColor}">${nickname}: ${chatMessage.value}`;
    socket.emit('chat message', msg);
    chatMessage.value = "";
    return false;
  }


  nameInput.addEventListener('keyup', function(evt) {
    evt.preventDefault();
    if (evt.keyCode === 13) {
      setNickname();
    }
  });
  enter.addEventListener('click', setNickname, false);
  chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('disconnect message', appendDiscMessage, false);
  socket.addEventListener('list users', (data) =>{
    while(list.firstChild) {
         list.removeChild(list.firstChild);
        }
    data.forEach((data)=>{
      var newUser = `<li>${data}</li>`;
      list.innerHTML += newUser;
    });
  });
})();
