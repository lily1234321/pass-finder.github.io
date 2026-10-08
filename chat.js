// Pass Finder AI Chat — real AI version
// Talks to the Cloudflare Worker (see worker.js). No more keyword matching.
//
// ⚠️ 部署后把下面改成你的 Worker 地址，形如:
//    const WORKER_URL = "https://pass-finder-ai.YOURNAME.workers.dev";
const WORKER_URL = "https://pass-finder-ai.lily-loool666.workers.dev";

let chatHistory = [];
let isTyping = false;

// Initialize chat
document.addEventListener('DOMContentLoaded', () => {
    loadChatHistory();
    autoResizeTextarea();
    scrollToBottom();
});

// Auto-resize textarea
function autoResizeTextarea() {
    const textarea = document.getElementById('messageInput');
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
}

// Handle Enter key
function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// Send message (async — waits for the real AI)
async function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (!message || isTyping) return;
    if (WORKER_URL.includes("REPLACE-WITH")) {
        addMessage("⚙️ The AI isn't connected yet — the site owner still needs to set the Worker URL in chat.js.", 'ai');
        return;
    }

    addMessage(message, 'user');
    input.value = '';
    input.style.height = 'auto';

    showTypingIndicator(); // honest this time: we're really waiting on the network

    try {
        const reply = await callAI(buildContext());
        hideTypingIndicator();
        addMessage(reply, 'ai');
    } catch (err) {
        hideTypingIndicator();
        addMessage("Hmm, my AI brain hiccupped — please try again in a moment.", 'ai');
    }
}

function sendQuickMessage(message) {
    const input = document.getElementById('messageInput');
    input.value = message;
    sendMessage();
}

// Last 10 messages as { role, content } for the API
function buildContext() {
    return chatHistory.slice(-10).map(m => ({
        role: m.sender === 'ai' ? 'assistant' : 'user',
        content: m.content,
    }));
}

async function callAI(messages) {
    const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
    });
    if (!res.ok) throw new Error('worker error ' + res.status);
    const data = await res.json();
    if (!data.reply) throw new Error('empty reply');
    return data.reply;
}

// Add message to chat
function addMessage(content, sender) {
    const messagesContainer = document.getElementById('messagesContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const time = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const avatar = sender === 'ai' ? '🤖' : '👤';
    const avatarClass = sender === 'ai' ? 'ai-message' : 'user-message';

    messageDiv.innerHTML = `
        <div class="message-avatar ${avatarClass}">
            <span class="${sender === 'ai' ? 'ai-icon' : 'user-icon'}">${avatar}</span>
        </div>
        <div class="message-content">
            <div class="message-bubble">
                ${formatMessage(content)}
            </div>
            <div class="message-time">${time}</div>
        </div>
    `;

    messagesContainer.appendChild(messageDiv);
    scrollToBottom();

    // Save to history
    chatHistory.push({ content, sender, time });
    saveChatHistory();
}

// Format message content
function formatMessage(content) {
    // Basic HTML-escape first so AI output can't inject markup,
    // then allow our own light formatting.
    content = content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Convert URLs to links
    content = content.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" style="color: #4ade80;">$1</a>');

    // Convert line breaks to <br>
    content = content.replace(/\n/g, '<br>');

    // Convert **text** to bold
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    return content;
}

// Show typing indicator
function showTypingIndicator() {
    isTyping = true;
    const messagesContainer = document.getElementById('messagesContainer');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-indicator-message';
    typingDiv.id = 'typingIndicator';

    typingDiv.innerHTML = `
        <div class="message-avatar ai-message">
            <span class="ai-icon">🤖</span>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;

    messagesContainer.appendChild(typingDiv);
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Clear chat
function clearChat() {
    if (confirm('Are you sure you want to clear all conversations?')) {
        const messagesContainer = document.getElementById('messagesContainer');
        messagesContainer.innerHTML = `
            <div class="message ai-message">
                <div class="message-avatar">
                    <span class="ai-icon">🤖</span>
                </div>
                <div class="message-content">
                    <div class="message-bubble">
                        <p>Conversation cleared. What would you like to talk about?</p>
                    </div>
                    <div class="message-time">Just now</div>
                </div>
            </div>
        `;

        chatHistory = [];
        saveChatHistory();
    }
}

// Save chat history
function saveChatHistory() {
    try {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    } catch (e) { /* storage full — ignore */ }
}

// Load chat history
function loadChatHistory() {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
        try {
            chatHistory = JSON.parse(saved);
        } catch (e) {
            chatHistory = [];
        }
    }
}

// Scroll to bottom
function scrollToBottom() {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Go back
function goBack() {
    window.history.back();
}

// Show message notification
function showMessage(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        color: #333;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
