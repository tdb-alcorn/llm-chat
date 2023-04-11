const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function handleUserInput() {
  const userMsg = userInput.value;
  if (userMsg) {
    addChatItem('user', userMsg);
    userInput.value = '';
    sendUserInput(userMsg);
  }
}

userInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleUserInput();
    }
  });

sendBtn.addEventListener('click', handleUserInput);

function addChatItem(sender, message) {
  const chatItem = document.createElement('div');
  chatItem.classList.add('chat-item');
  chatItem.classList.add(`${sender}-msg`);
  message = message.replace(/\n/g, "<br>");
  chatItem.innerHTML = message;
  chatbox.appendChild(chatItem);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function sendUserInput(userMsg) {
  fetch('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: userMsg })
  })
  .then(response => response.json())
  .then(data => addChatItem('llm', data.message));
}
