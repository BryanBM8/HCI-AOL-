
let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];


const chatMessages = document.getElementById('chat-messages');
renderChatHistory();


const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', sendMessage);


const deleteHistoryButton = document.getElementById('delete-history-button');
deleteHistoryButton.addEventListener('click', deleteHistory);


const messageInput = document.getElementById('message-input');
messageInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});


function renderChatHistory() {
  chatMessages.innerHTML = '';
  chatHistory.forEach((message, index) => {
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `${message} <span class="delete-message" data-index="${index}">X</span>`;
    chatMessages.appendChild(messageElement);
  });


  const deleteButtons = document.getElementsByClassName('delete-message');
  Array.from(deleteButtons).forEach((button) => {
    button.addEventListener('click', deleteMessage);
  });
}


function sendMessage() {
  const message = messageInput.value;
  if (message.trim() !== '') {
   
    chatHistory.push(message);

    
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

    
    renderChatHistory();

    
    messageInput.value = '';
  }
}

function deleteMessage() {
  const index = parseInt(this.getAttribute('data-index'));

  
  chatHistory.splice(index, 1);

  
  localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

  
  renderChatHistory();
}


function deleteHistory() {
  
  chatHistory = [];

 
  localStorage.removeItem('chatHistory');

 
  chatMessages.innerHTML = '';
}

const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    
    modeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
    });