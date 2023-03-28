const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
  const userMsg = userInput.value;
  if (userMsg) {
    addChatItem('user', userMsg);
    userInput.value = '';
    sendUserInput(userMsg);
  }
});

function addChatItem(sender, message) {
  const chatItem = document.createElement('div');
  chatItem.classList.add('chat-item');
  chatItem.classList.add(`${sender}-msg`);
  chatItem.textContent = message;
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
