// Community Chat functionality

// Data structures
let posts = [];
let messages = [];
let groups = [];
let currentUser = {
  id: 'current-user',
  name: 'You',
  avatar: '😊'
};

let currentChatUser = null;
let currentGroupId = null;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('Community chat initialized');
    
    // Check if elements exist
    const postsSection = document.getElementById('posts-section');
    const messagesSection = document.getElementById('messages-section');
    const groupsSection = document.getElementById('groups-section');
    const navTabs = document.querySelector('.nav-tabs');
    
    console.log('Posts section exists:', !!postsSection);
    console.log('Messages section exists:', !!messagesSection);
    console.log('Groups section exists:', !!groupsSection);
    console.log('Nav tabs exist:', !!navTabs);
    
    if (!postsSection || !messagesSection || !groupsSection || !navTabs) {
      console.error('Some elements are missing!');
      return;
    }
    
    loadData();
    loadPosts();
    loadMessages();
    loadGroups();
    
    // Add entrance animation
    const sections = document.querySelectorAll('.section');
    console.log('Found sections:', sections.length);
    
    sections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, index * 100);
    });
    
    setTimeout(() => {
      showMessage('Welcome to the Community! 💬', 'success', 3000);
    }, 1000);
    
  } catch (error) {
    console.error('Error initializing community chat:', error);
    alert('Error loading community chat. Please refresh the page.');
  }
});

// Load data from localStorage
function loadData() {
  const savedPosts = localStorage.getItem('communityPosts');
  const savedMessages = localStorage.getItem('communityMessages');
  const savedGroups = localStorage.getItem('communityGroups');
  
  if (savedPosts) posts = JSON.parse(savedPosts);
  if (savedMessages) messages = JSON.parse(savedMessages);
  if (savedGroups) groups = JSON.parse(savedGroups);
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('communityPosts', JSON.stringify(posts));
  localStorage.setItem('communityMessages', JSON.stringify(messages));
  localStorage.setItem('communityGroups', JSON.stringify(groups));
}

// Navigation functions
function goBack() {
  document.body.style.transition = "all 0.3s ease";
  document.body.style.opacity = "0.8";
  document.body.style.transform = "scale(0.95)";
  setTimeout(() => {
    window.location.href = "next-steps.html";
  }, 300);
}

function goHome() {
  document.body.style.transition = "all 0.3s ease";
  document.body.style.opacity = "0.8";
  document.body.style.transform = "scale(0.95)";
  setTimeout(() => {
    window.location.href = "index.html";
  }, 300);
}

function toggleMenu() {
  showMessage('Menu options coming soon!', 'info', 2000);
}

// Section switching
function switchSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Remove active class from all tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Show selected section
  document.getElementById(sectionId).classList.add('active');
  
  // Add active class to clicked tab
  event.target.classList.add('active');
}

// Posts functionality
function loadPosts() {
  console.log('Loading posts...');
  
  if (posts.length === 0) {
    console.log('Creating sample posts...');
    // Create sample posts
    posts = [
      {
        id: 'post1',
        user: { name: 'Sarah', avatar: '🎨' },
        content: 'Just finished my first digital art piece! The expression workshop really helped me find my voice. What do you think?',
        time: '2 hours ago',
        likes: 12,
        comments: [
          { user: { name: 'Mike', avatar: '🎭' }, text: 'This is amazing! The colors are so vibrant! 🌈', time: '1 hour ago' },
          { user: { name: 'Emma', avatar: '✨' }, text: 'Love the composition! What software did you use?', time: '30 min ago' }
        ]
      },
      {
        id: 'post2',
        user: { name: 'Mike', avatar: '🎭' },
        content: 'Anyone else trying the new expression workshop? I\'m struggling with choosing what emotion to express. Any tips? 🤔',
        time: '4 hours ago',
        likes: 8,
        comments: [
          { user: { name: 'Sarah', avatar: '🎨' }, text: 'Try starting with a simple emotion like "calm" or "excited" - it really helps! 😊', time: '3 hours ago' },
          { user: { name: 'Emma', avatar: '✨' }, text: 'I found that thinking about a specific moment in your life helps! What makes you feel most alive? ✨', time: '2 hours ago' }
        ]
      }
    ];
    saveData();
  }
  
  console.log('Rendering posts...');
  renderPosts();
}

function renderPosts() {
  console.log('Rendering posts...');
  const container = document.getElementById('postsContainer');
  
  if (!container) {
    console.error('Posts container not found!');
    return;
  }
  
  console.log('Found posts container, clearing...');
  container.innerHTML = '';
  
  console.log('Creating post elements...');
  posts.forEach((post, index) => {
    console.log(`Creating post ${index + 1}:`, post.id);
    const postElement = createPostElement(post);
    container.appendChild(postElement);
  });
  
  console.log('Posts rendered successfully!');
}

function createPostElement(post) {
  const postDiv = document.createElement('div');
  postDiv.className = 'post-card hover-lift';
  postDiv.innerHTML = `
    <div class="post-header">
      <div class="post-avatar">${post.user.avatar}</div>
      <div class="post-user-info">
        <div class="post-username">${post.user.name}</div>
        <div class="post-time">${post.time}</div>
      </div>
    </div>
    <div class="post-content">
      <p>${post.content}</p>
    </div>
    <div class="post-actions">
      <button class="action-btn" onclick="likePost('${post.id}')">
        <span class="action-icon">❤️</span>
        <span class="action-count">${post.likes}</span>
      </button>
      <button class="action-btn" onclick="toggleComments('${post.id}')">
        <span class="action-icon">💬</span>
        <span class="action-count">${post.comments.length}</span>
      </button>
      <button class="action-btn" onclick="sharePost('${post.id}')">
        <span class="action-icon">📤</span>
      </button>
    </div>
    <div class="comments-section" id="comments-${post.id}" style="display: none;">
      <div class="comments-list">
        ${post.comments.map(comment => `
          <div class="comment-item">
            <div class="comment-avatar">${comment.user.avatar}</div>
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-username">${comment.user.name}</span>
                <span class="comment-time">${comment.time}</span>
              </div>
              <p class="comment-text">${comment.text}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="comment-input-container">
        <input type="text" class="comment-input" placeholder="Write a comment..." onkeypress="handleCommentKeypress(event, '${post.id}')">
        <button class="comment-send-btn" onclick="sendComment('${post.id}')">Send</button>
      </div>
    </div>
  `;
  
  return postDiv;
}

function likePost(postId) {
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.likes++;
    saveData();
    renderPosts();
  }
}

function toggleComments(postId) {
  const commentsSection = document.getElementById(`comments-${postId}`);
  if (commentsSection.style.display === 'none') {
    commentsSection.style.display = 'block';
    commentsSection.style.animation = 'slideDown 0.3s ease';
  } else {
    commentsSection.style.display = 'none';
  }
}

function sharePost(postId) {
  showMessage('Post shared! 📤', 'success', 2000);
}

function handleCommentKeypress(event, postId) {
  if (event.key === 'Enter') {
    sendComment(postId);
  }
}

function sendComment(postId) {
  const input = event.target.previousElementSibling || event.target.parentElement.querySelector('.comment-input');
  const commentText = input.value.trim();
  
  if (commentText === '') return;
  
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.comments.push({
      user: currentUser,
      text: commentText,
      time: 'Just now'
    });
    
    saveData();
    renderPosts();
    input.value = '';
    
    showMessage('Comment posted! 💬', 'success', 1500);
  }
}

// New post functionality
function showNewPostForm() {
  document.getElementById('new-post-form').style.display = 'flex';
}

function hideNewPostForm() {
  document.getElementById('new-post-form').style.display = 'none';
  document.getElementById('post-content').value = '';
}

function createNewPost() {
  const content = document.getElementById('post-content').value.trim();
  
  if (content === '') {
    showMessage('Please write something to post!', 'error', 2000);
    return;
  }
  
  const newPost = {
    id: 'post' + Date.now(),
    user: currentUser,
    content: content,
    time: 'Just now',
    likes: 0,
    comments: []
  };
  
  posts.unshift(newPost);
  saveData();
  renderPosts();
  hideNewPostForm();
  
  showMessage('Post created! 📝', 'success', 2000);
}

// Messages functionality
function loadMessages() {
  if (messages.length === 0) {
    // Create sample messages
    messages = [
      {
        id: 'user1',
        name: 'Sarah',
        avatar: '🎨',
        status: 'Online',
        lastMessage: 'Thanks for the feedback on my artwork! 🙏',
        time: '2 min ago',
        unread: 2
      },
      {
        id: 'user2',
        name: 'Mike',
        avatar: '🎭',
        status: 'Last seen 1 hour ago',
        lastMessage: 'Can you help me with the expression workshop?',
        time: '1 hour ago',
        unread: 0
      },
      {
        id: 'user3',
        name: 'Emma',
        avatar: '✨',
        status: 'Online',
        lastMessage: 'Love your latest post! The colors are amazing 🎨',
        time: '3 hours ago',
        unread: 0
      }
    ];
    saveData();
  }
  
  renderMessages();
}

function renderMessages() {
  const container = document.getElementById('messagesList');
  container.innerHTML = '';
  
  messages.forEach(message => {
    const messageElement = createMessageElement(message);
    container.appendChild(messageElement);
  });
}

function createMessageElement(message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message-item hover-lift';
  messageDiv.onclick = () => openChat(message.id);
  
  messageDiv.innerHTML = `
    <div class="message-avatar">
      <div class="avatar-emoji">${message.avatar}</div>
      ${message.status === 'Online' ? '<div class="online-indicator"></div>' : ''}
    </div>
    <div class="message-info">
      <div class="message-header">
        <span class="message-name">${message.name}</span>
        <span class="message-time">${message.time}</span>
      </div>
      <p class="message-preview">${message.lastMessage}</p>
    </div>
    ${message.unread > 0 ? `<div class="message-status"><span class="unread-count">${message.unread}</span></div>` : ''}
  `;
  
  return messageDiv;
}

function showNewChatForm() {
  showMessage('New chat feature coming soon!', 'info', 2000);
}

// Groups functionality
function loadGroups() {
  if (groups.length === 0) {
    // Create sample groups
    groups = [
      {
        id: 'group1',
        name: 'Digital Art Beginners',
        members: 4,
        avatars: ['🎨', '🎭', '✨', '🌟'],
        lastMessage: 'Sarah: Just shared my first artwork! 🎨',
        time: '5 min ago',
        unread: 3
      },
      {
        id: 'group2',
        name: 'Expression Workshop',
        members: 4,
        avatars: ['🎨', '🎭', '✨', '🌟'],
        lastMessage: 'Mike: Anyone else struggling with emotions?',
        time: '1 hour ago',
        unread: 0
      }
    ];
    saveData();
  }
  
  renderGroups();
}

function renderGroups() {
  const container = document.getElementById('groupsList');
  container.innerHTML = '';
  
  groups.forEach(group => {
    const groupElement = createGroupElement(group);
    container.appendChild(groupElement);
  });
}

function createGroupElement(group) {
  const groupDiv = document.createElement('div');
  groupDiv.className = 'group-item hover-lift';
  groupDiv.onclick = () => openGroup(group.id);
  
  groupDiv.innerHTML = `
    <div class="group-avatar">
      <div class="group-avatars">
        ${group.avatars.map(avatar => `<div class="avatar-emoji">${avatar}</div>`).join('')}
      </div>
    </div>
    <div class="group-info">
      <div class="group-header">
        <span class="group-name">${group.name}</span>
        <span class="group-time">${group.time}</span>
      </div>
      <p class="group-preview">${group.lastMessage}</p>
    </div>
    ${group.unread > 0 ? `<div class="group-status"><span class="unread-count">${group.unread}</span></div>` : ''}
  `;
  
  return groupDiv;
}

function showNewGroupForm() {
  showMessage('New group feature coming soon!', 'info', 2000);
}

// Chat functionality
function openChat(userId) {
  const user = messages.find(m => m.id === userId);
  if (!user) return;
  
  currentChatUser = userId;
  
  // Hide main interface
  document.querySelector('.container').style.display = 'none';
  
  // Show chat interface
  const chatInterface = document.getElementById('chat-interface');
  chatInterface.style.display = 'flex';
  
  // Set chat header info
  document.getElementById('chat-user-avatar').textContent = user.avatar;
  document.getElementById('chat-username').textContent = user.name;
  document.getElementById('chat-status').textContent = user.status;
  
  // Load chat messages
  loadChatMessages(userId);
  
  // Clear unread count
  user.unread = 0;
  saveData();
  renderMessages();
}

function loadChatMessages(userId) {
  const messagesContainer = document.getElementById('chat-messages');
  messagesContainer.innerHTML = '';
  
  // Sample chat messages
  const chatMessages = [
    { sender: userId, text: 'Hi there! How are you doing?', time: '2 min ago', type: 'received' },
    { sender: 'current-user', text: 'I\'m doing great! Just working on some new artwork', time: '1 min ago', type: 'sent' },
    { sender: userId, text: 'That sounds exciting! Can\'t wait to see it! 🎨', time: 'Just now', type: 'received' }
  ];
  
  chatMessages.forEach(message => {
    const messageElement = createChatMessageElement(message, userId);
    messagesContainer.appendChild(messageElement);
  });
  
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function createChatMessageElement(message, userId) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${message.type}`;
  
  const user = messages.find(m => m.id === userId);
  
  if (message.type === 'sent') {
    messageDiv.innerHTML = `
      <div class="chat-message-content">
        <div class="chat-message-text">${message.text}</div>
        <div class="chat-message-time">${message.time}</div>
      </div>
      <div class="chat-message-avatar">${currentUser.avatar}</div>
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="chat-message-avatar">${user.avatar}</div>
      <div class="chat-message-content">
        <div class="chat-message-text">${message.text}</div>
        <div class="chat-message-time">${message.time}</div>
      </div>
    `;
  }
  
  return messageDiv;
}

function handleChatKeypress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const messageText = input.value.trim();
  
  if (messageText === '' || !currentChatUser) return;
  
  const messagesContainer = document.getElementById('chat-messages');
  const newMessage = {
    sender: 'current-user',
    text: messageText,
    time: 'Just now',
    type: 'sent'
  };
  
  const messageElement = createChatMessageElement(newMessage, currentChatUser);
  messagesContainer.appendChild(messageElement);
  
  input.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Simulate reply after 2 seconds
  setTimeout(() => {
    const replyMessage = {
      sender: currentChatUser,
      text: generateReply(messageText),
      time: 'Just now',
      type: 'received'
    };
    
    const replyElement = createChatMessageElement(replyMessage, currentChatUser);
    messagesContainer.appendChild(replyElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 2000);
}

function generateReply(message) {
  const replies = [
    'That sounds great! 👍',
    'I totally agree! 😊',
    'Thanks for sharing! 🙏',
    'That\'s interesting! 🤔',
    'Love your enthusiasm! ✨',
    'Keep up the great work! 🎨',
    'That\'s a good point! 💭',
    'I\'m learning so much from you! 📚'
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

// Group chat functionality
function openGroup(groupId) {
  const group = groups.find(g => g.id === groupId);
  if (!group) return;
  
  currentGroupId = groupId;
  
  // Hide main interface
  document.querySelector('.container').style.display = 'none';
  
  // Show group chat interface
  const groupChatInterface = document.getElementById('group-chat-interface');
  groupChatInterface.style.display = 'flex';
  
  // Set group chat header info
  document.getElementById('group-chat-name').textContent = group.name;
  document.getElementById('group-chat-status').textContent = `${group.members} members`;
  
  // Set group avatars
  group.avatars.forEach((avatar, index) => {
    const avatarElement = document.getElementById(`group-avatar-${index + 1}`);
    if (avatarElement) {
      avatarElement.textContent = avatar;
    }
  });
  
  // Load group messages
  loadGroupMessages(groupId);
  
  // Clear unread count
  group.unread = 0;
  saveData();
  renderGroups();
}

function loadGroupMessages(groupId) {
  const messagesContainer = document.getElementById('group-chat-messages');
  messagesContainer.innerHTML = '';
  
  // Sample group messages
  const groupMessages = [
    { sender: 'user1', text: 'Just shared my first artwork! 🎨', time: '5 min ago', type: 'received' },
    { sender: 'user2', text: 'This is amazing! The colors are so vibrant! 🌈', time: '3 min ago', type: 'received' },
    { sender: 'user3', text: 'Love the composition! What software did you use?', time: '2 min ago', type: 'received' },
    { sender: 'current-user', text: 'Great work Sarah! Keep it up! 👏', time: '1 min ago', type: 'sent' }
  ];
  
  groupMessages.forEach(message => {
    const messageElement = createGroupMessageElement(message, groupId);
    messagesContainer.appendChild(messageElement);
  });
  
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function createGroupMessageElement(message, groupId) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${message.type}`;
  
  const users = {
    'user1': { name: 'Sarah', avatar: '🎨' },
    'user2': { name: 'Mike', avatar: '🎭' },
    'user3': { name: 'Emma', avatar: '✨' }
  };
  
  const sender = users[message.sender] || currentUser;
  
  if (message.type === 'sent') {
    messageDiv.innerHTML = `
      <div class="chat-message-content">
        <div class="chat-message-text">${message.text}</div>
        <div class="chat-message-time">${message.time}</div>
      </div>
      <div class="chat-message-avatar">${currentUser.avatar}</div>
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="chat-message-avatar">${sender.avatar}</div>
      <div class="chat-message-content">
        <div class="chat-message-text"><strong>${sender.name}:</strong> ${message.text}</div>
        <div class="chat-message-time">${message.time}</div>
      </div>
    `;
  }
  
  return messageDiv;
}

function handleGroupChatKeypress(event) {
  if (event.key === 'Enter') {
    sendGroupChatMessage();
  }
}

function sendGroupChatMessage() {
  const input = document.getElementById('group-chat-input');
  const messageText = input.value.trim();
  
  if (messageText === '' || !currentGroupId) return;
  
  const messagesContainer = document.getElementById('group-chat-messages');
  const newMessage = {
    sender: 'current-user',
    text: messageText,
    time: 'Just now',
    type: 'sent'
  };
  
  const messageElement = createGroupMessageElement(newMessage, currentGroupId);
  messagesContainer.appendChild(messageElement);
  
  input.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Simulate group replies after 3 seconds
  setTimeout(() => {
    const groupMembers = ['user1', 'user2', 'user3'];
    const randomMember = groupMembers[Math.floor(Math.random() * groupMembers.length)];
    
    const replyMessage = {
      sender: randomMember,
      text: generateGroupReply(messageText),
      time: 'Just now',
      type: 'received'
    };
    
    const replyElement = createGroupMessageElement(replyMessage, currentGroupId);
    messagesContainer.appendChild(replyElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 3000);
}

function generateGroupReply(message) {
  const replies = [
    'Great idea! 👍',
    'I love this! 😍',
    'Thanks for sharing! 🙏',
    'This is so helpful! 💡',
    'Keep it up! 🎨',
    'Amazing work! ✨',
    'I learned something new! 📚',
    'This community is awesome! 🌟'
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

// Back to main interface
function backToMain() {
  // Hide chat interfaces
  const chatInterface = document.getElementById('chat-interface');
  const groupChatInterface = document.getElementById('group-chat-interface');
  
  if (chatInterface) chatInterface.style.display = 'none';
  if (groupChatInterface) groupChatInterface.style.display = 'none';
  
  // Show main interface
  const container = document.querySelector('.container');
  if (container) {
    container.style.display = 'block';
  }
  
  // Reset current chat state
  currentChatUser = null;
  currentGroupId = null;
}

// Menu functions
function showChatMenu() {
  showMessage('Chat menu options coming soon!', 'info', 2000);
}

function showGroupChatMenu() {
  showMessage('Group chat menu options coming soon!', 'info', 2000);
}

// Utility functions
function showMessage(message, type = 'info', duration = 3000) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${type}`;
  messageElement.textContent = message;
  messageElement.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 1000;
    animation: slideInRight 0.3s ease;
  `;
  
  if (type === 'success') {
    messageElement.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  } else if (type === 'error') {
    messageElement.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
  } else {
    messageElement.style.background = 'linear-gradient(135deg, #8b5cf6, #ec4899)';
  }
  
  document.body.appendChild(messageElement);
  
  setTimeout(() => {
    messageElement.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(messageElement);
    }, 300);
  }, duration);
} 