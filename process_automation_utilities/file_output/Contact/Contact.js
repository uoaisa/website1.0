let currentIndex = 0;
let isPlaying = true;

const images = ['../images/aaregaer.png', '../images/adhad.png', '../images/afgazdfg.png', '../images/afgdfga.png', '../images/aterta.png', '../images/bu.png', '../images/cit.png', '../images/css.png', '../images/des.png', '../images/dfbz.png', '../images/dfzb.png', '../images/dhdfg.png', '../images/dre.png', '../images/dtyjdty.png', '../images/dtyjdtyj.png', '../images/fgshdf.png', '../images/fi.png', '../images/fl.png', '../images/ftuyjdt.png', '../images/fuykfgui.png', '../images/laa.png', '../images/laa2.png', '../images/ne.png', '../images/oc.png', '../images/oce.png', '../images/opp.png', '../images/opp1.png', '../images/pe.png', '../images/rf.png', '../images/rom.png', '../images/su.png', '../images/zdfbz.png', '../images/zdfbzh.png'];

const frames = document.querySelectorAll('.image-frame img');
let lastImageIndices = new Array(frames.length).fill(-1); // Track the last image index for each frame

// Function to get the next image index
function getNextImageIndex(frameIndex) {
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * images.length);
    } while (lastImageIndices.includes(nextIndex) || nextIndex === lastImageIndices[frameIndex]);
    lastImageIndices[frameIndex] = nextIndex;
    return nextIndex;
}

// Function to update an individual frame
function updateFrame(frame, imageIndex) {
    frame.style.opacity = '0';
    setTimeout(() => {
        frame.src = images[imageIndex];
        frame.style.opacity = '1';
    }, 1000); // Set timeout to 1 second to sync with the CSS transition
}

// Function to cycle images for a single frame
function cycleImages(frame, frameIndex) {
    setInterval(() => {
        let imageIndex = getNextImageIndex(frameIndex);
        updateFrame(frame, imageIndex);
    }, 7000 + 1000 * frameIndex); // Stagger the interval by 1 second per frame
}

// Initialize the gallery by cycling images for each frame
frames.forEach((frame, index) => {
    cycleImages(frame, index); // Pass the frame and its index to the cycleImages function
});

document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Optionally save the current preference to localStorage
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});



// script.js
document.getElementById('chatForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var userInput = document.getElementById('userInput').value;
    if (userInput.trim() !== '') {
        addMessageToChatbox(userInput, 'user');
        document.getElementById('userInput').value = '';
        // Here you can add your logic to process the user input and generate a response
        addMessageToChatbox('This is a placeholder response', 'bot');
    }
});

function addMessageToChatbox(message, sender) {
    var chatbox = document.getElementById('chatbox');
    var newMessage = document.createElement('div');
    newMessage.textContent = message;
    newMessage.className = sender === 'user' ? 'user-message' : 'bot-message';
    chatbox.appendChild(newMessage);
    chatbox.scrollTop = chatbox.scrollHeight;
}

document.addEventListener('DOMContentLoaded', function() {
    // This ensures that the chatbot is hidden when the page loads
    document.getElementById('chatbot').style.display = 'none';
});

document.getElementById('chatbotIcon').addEventListener('click', function() {
    var chatbotEl = document.getElementById('chatbot');
    var isDisplayed = chatbotEl.style.display === 'block';

    // Toggle the display property
    chatbotEl.style.display = isDisplayed ? 'none' : 'block';
});
function getBotResponse(input) {
    input = input.toLowerCase();
    if (input.includes("hello")) {
        return "Hello! How can I assist you?";
    } else if (input.includes("help")) {
        return "Sure, what do you need help with?";
    } else {
        return "Sorry, I didn't understand that.";
    }
}

document.getElementById('chatForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var userInput = document.getElementById('userInput').value;
    if (userInput.trim() !== '') {
        addMessageToChatbox(userInput, 'user');
        document.getElementById('userInput').value = '';

        var botResponse = getBotResponse(userInput);
        addMessageToChatbox(botResponse, 'bot');
    }
});

// script.js
document.getElementById('chatbotIcon').addEventListener('click', function() {
    var chatbotEl = document.getElementById('chatbot');
    var messageBubble = this.querySelector('.message-bubble');
    var isDisplayed = chatbotEl.style.display === 'block';
    
    chatbotEl.style.display = isDisplayed ? 'none' : 'block';
    
    // Hide the message bubble when the chatbot is displayed
    if (!isDisplayed) {
        messageBubble.style.display = 'none';
    }
});


// Modify the existing submit event listener for the chat form
document.getElementById('chatForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var userInput = document.getElementById('userInput').value;
    
    if (userInput.trim() !== '') {
        addMessageToChatbox(userInput, 'user');
        document.getElementById('userInput').value = '';
        
        // Your logic to process the user input and generate a response goes here
        // The chatbox should stay open
    }
});

// Helper function to escape HTML to prevent XSS attacks
function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Function to simulate a chatbot response
function simulateBotResponse(input) {
  if (/hello|hi/i.test(input)) {
    return "Hello there! How can I assist you today?";
  } else if (/help/i.test(input)) {
    return "Sure, what do you need help with?";
  } else {
    return "Sorry, I didn't understand that. Could you rephrase your question or ask something else?";
  }
}

// Function to add a message to the chatbox
function addMessageToChatbox(message, sender) {
  var chatbox = document.getElementById('chatbox');
  var newMessageDiv = document.createElement('div');
  newMessageDiv.classList.add('chat-message', sender);
  newMessageDiv.textContent = escapeHtml(message);
  chatbox.appendChild(newMessageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Initialize chatbot state on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('chatbot').style.display = 'none';
});

// Toggle the chatbot display on icon click
document.getElementById('chatbotIcon').addEventListener('click', function() {
  var chatbotEl = document.getElementById('chatbot');
  var messageBubble = this.querySelector('.message-bubble');
  var isDisplayed = window.getComputedStyle(chatbotEl).display !== 'none';

  chatbotEl.style.display = isDisplayed ? 'none' : 'block';

  // Send a placeholder "Hello" message from the bot if chat is being opened
  if (!isDisplayed) {
    addMessageToChatbox("Hello! How can I assist you?", 'bot');
    messageBubble.style.display = 'none';
  }
});

// Event listener for chat form submission
document.getElementById('chatForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var userInputField = document.getElementById('userInput');
  var userInput = userInputField.value.trim();

  if (userInput !== '') {
    addMessageToChatbox(userInput, 'user');
    userInputField.value = ''; // Clear the input field

    // Simulate a delay for bot response
    setTimeout(function() {
      var botResponse = simulateBotResponse(userInput);
      addMessageToChatbox(botResponse, 'bot');
    }, 1000);

    // The chatbox stays open as this is handled by the icon click event
  }
});

// Optional: Apply the saved preference on page load
window.onload = () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
};