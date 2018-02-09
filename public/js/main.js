(() => {
  const socket = io();

  let messageList = document.querySelector('ul'),
      chatForm = document.querySelector('form'),
      nameInput = document.querySelector('.nickname'),
      chatMessage = chatForm.querySelector('.message'),
      nickname = null;

  function setNickname() {
    nickname = this.value;
  }

  function appendMessage(msg) {
    // debugger;
    let newMsg = `<li>${msg.message}</li>`;
    messageList.innerHTML += newMsg;
  }

  function appendDiscMessage(msg) {
    // debugger;
    let newMsg = `<li>${msg}</li>`;
    messageList.innerHTML += newMsg;
  }

  function handleSendMessage(e) {
    e.preventDefault(); //block default behaviour (refresh page)
    // debugger;
    nickname = (nickname && nickname.length > 0) ? nickname : 'user';
    msg = `${nickname} says ${chatMessage.value}`;

    socket.emit('chat message', msg);
    chatMessage.value = "";
    return false;
  }

  nameInput.addEventListener('change', setNickname, false);
  chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('disconnect message', appendDiscMessage, false);


})();
