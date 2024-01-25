document.addEventListener('DOMContentLoaded', (event) => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Apply dark mode styles
        document.body.classList.add('dark-mode');
    }
        
    // Notification click event listener
    var notification = document.getElementById('notification');
    if(notification) {
        notification.addEventListener('click', function() {
            this.style.display = 'none';
        });
    }
});


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



// Event Listener for DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initially hide the chatbot when the page loads
    document.getElementById('chatbot').style.display = 'none';
});

// Event Listener for Chat Icon Click
document.getElementById('chatbotIcon').addEventListener('click', function() {
    var chatbotEl = document.getElementById('chatbot');
    var messageBubble = this.querySelector('.message-bubble');
    var isDisplayed = window.getComputedStyle(chatbotEl).display !== 'none';

    chatbotEl.style.display = isDisplayed ? 'none' : 'block';

    // Hide the message bubble when the chatbot is displayed
    if (!isDisplayed) {
        messageBubble.style.display = 'none';
        addMessageToChatbox("Hello! How can I assist you?", 'bot'); // Placeholder greeting from the bot
    }
});

// Event Listener for Chat Form Submission
document.getElementById('chatForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var userInput = document.getElementById('userInput').value.trim();

    if (userInput !== '') {
        addMessageToChatbox(userInput, 'user');
        document.getElementById('userInput').value = '';

        // Call the API for the bot's response
        callApi(userInput);
    }
});

// Function to Show Typing Indicator
function showTypingIndicator() {
    var chatbox = document.getElementById('chatbox');
    var typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    for (let i = 0; i < 3; i++) {
        let dot = document.createElement('div');
        dot.classList.add('typing-dot');
        typingIndicator.appendChild(dot);
    }
    chatbox.appendChild(typingIndicator);
}

// Function to Hide Typing Indicator
function hideTypingIndicator() {
    var typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) typingIndicator.remove();
}

// Function to Add Quick Replies
function addQuickReplies(replies) {
    var quickRepliesContainer = document.getElementById('quickReplies');
    quickRepliesContainer.innerHTML = ''; // Clear previous quick replies
    replies.forEach(reply => {
        let button = document.createElement('button');
        button.textContent = reply;
        button.classList.add('quick-reply');
        button.addEventListener('click', () => {
            addMessageToChatbox(reply, 'user');
            callApi(reply);
        });
        quickRepliesContainer.appendChild(button);
    });
}


// Function to Add Message to Chatbox
function addMessageToChatbox(message, sender) {
    var chatbox = document.getElementById('chatbox');
    var newMessageDiv = document.createElement('div');
    newMessageDiv.classList.add('chat-message', sender);

    // Check if message is a string before escaping HTML
    if (typeof message === 'string') {
        newMessageDiv.textContent = escapeHtml(message);
    } else {
        console.error('Message is not a string:', message);
        newMessageDiv.textContent = '[Error displaying message]';
    }

    chatbox.appendChild(newMessageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Function to Escape HTML to Prevent XSS Attacks
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

// Function to Make the API Call
function callApi(userInput) {
    const queryParams = new URLSearchParams({ message: userInput });
    fetch(`https://ujviq4iqyl.execute-api.us-east-1.amazonaws.com/dev/ChatbotResource?${queryParams}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Directly check if data contains a message property and it's a string
        if (data && typeof data.message === 'string') {
            addMessageToChatbox(data.message, 'bot');
        } else {
            throw new Error('API response format is incorrect or missing message');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        addMessageToChatbox("Sorry, there was an error processing your request.", 'bot');
    });
}
