// Retrieve chat history from local storage
let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

// Display chat history
const chatMessages = document.getElementById('chat-messages');
renderChatHistory();

// Send button event listener
const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', sendMessage);

// Delete history button event listener
const deleteHistoryButton = document.getElementById('delete-history-button');
deleteHistoryButton.addEventListener('click', deleteHistory);

// Enter key event listener for the message input
const messageInput = document.getElementById('message-input');
messageInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

// Function to render chat history
function renderChatHistory() {
  chatMessages.innerHTML = '';
  chatHistory.forEach((message, index) => {
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `${message} <span class="delete-message" data-index="${index}">X</span>`;
    chatMessages.appendChild(messageElement);
  });

  // Add event listeners to delete buttons
  const deleteButtons = document.getElementsByClassName('delete-message');
  Array.from(deleteButtons).forEach((button) => {
    button.addEventListener('click', deleteMessage);
  });
}

// Function to send a message
function sendMessage() {
  const message = messageInput.value;
  if (message.trim() !== '') {
    // Add message to chat history
    chatHistory.push(message);

    // Save chat history in local storage
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

    // Re-render the chat history
    renderChatHistory();

    // Clear the input field
    messageInput.value = '';
  }
}

// Function to delete a specific message
function deleteMessage() {
  const index = parseInt(this.getAttribute('data-index'));

  // Remove the message from chat history
  chatHistory.splice(index, 1);

  // Save the updated chat history in local storage
  localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

  // Re-render the chat history
  renderChatHistory();
}

// Function to delete the entire chat history
function deleteHistory() {
  // Clear the chat history array
  chatHistory = [];

  // Remove the chat history from local storage
  localStorage.removeItem('chatHistory');

  // Clear the chat display
  chatMessages.innerHTML = '';
}

const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    
    modeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
    });