const recommendations = {
  love: {
    title: "Excellent! You're very interested in this direction ✨",
    subtitle: "You can further try:",
    suggestions: [
      {
        icon: "📚",
        title: "Deep Learning",
        description: "Watch advanced tutorials or take related courses",
        action: "Start Learning",
        hasDeepLearning: true,
      },
      {
        icon: "👥",
        title: "Join Community",
        description: "Find like-minded partners to explore together",
        action: "Join Community",
        actionHandler: 'showCommunityModal',
      },
      {
        icon: "🎯",
        title: "Set Small Goals",
        description: "Create a 30-day practice plan",
        action: "Create Plan",
      },
      {
        icon: "💬",
        title: "Find a Mentor",
        description: "Chat with experienced people about learning insights",
        action: "Find Mentor",
      },
    ],
  },
  neutral: {
    title: "It's okay, maybe you like this way of exploration? 🤔",
    subtitle: "You can also try:",
    suggestions: [
      {
        icon: "🔄",
        title: "Try Different Way",
        description: "Try the same type of activity with different methods",
        action: "Try Again",
      },
      {
        icon: "🎮",
        title: "Gamified Experience",
        description: "Explore through more relaxed gaming approaches",
        action: "Start Game",
      },
      {
        icon: "🎧",
        title: "Passive Learning",
        description: "Start by listening to podcasts or watching videos",
        action: "Start Listening",
      },
      {
        icon: "👂",
        title: "Communicate with Others",
        description: "Chat with friends about this topic",
        action: "Find Someone to Chat",
      },
    ],
  },
  dislike: {
    title: "The meaning of exploration is trial and error～ 🌈",
    subtitle: "You can also try these directions:",
    suggestions: [
      {
        icon: "✍️",
        title: "Written Expression",
        description: "Record thoughts and feelings through writing",
        action: "Start Writing",
      },
      {
        icon: "🧘",
        title: "Inner Exploration",
        description: "Meditation, mindfulness or psychology related",
        action: "Inner Journey",
      },
      {
        icon: "📸",
        title: "Visual Recording",
        description: "Photography or spatial design related",
        action: "Visual Exploration",
      },
      {
        icon: "🤝",
        title: "Social Connection",
        description: "Volunteer service or community activities",
        action: "Connect with Others",
      },
    ],
  },
}

function loadRecommendations() {
  const feedback = localStorage.getItem("userFeedback")
  const selectedPlan = localStorage.getItem("selectedPlan")
  
  if (!feedback || !recommendations[feedback]) {
    window.location.href = "feedback.html"
    return
  }

  const currentRecommendations = recommendations[feedback]

  // Update title
  document.getElementById("recommendation-title").textContent = currentRecommendations.title
  document.getElementById("recommendation-subtitle").textContent = currentRecommendations.subtitle

  // Generate suggestion cards
  const suggestionsGrid = document.getElementById("suggestions-grid")
  suggestionsGrid.innerHTML = currentRecommendations.suggestions
    .map(
      (suggestion) => {
        // Add special deep learning feature for digital art
        if (suggestion.hasDeepLearning && selectedPlan === "digital-art") {
          return `
            <div class="suggestion-card">
                <div class="suggestion-icon">${suggestion.icon}</div>
                <h3 class="suggestion-title">${suggestion.title}</h3>
                <p class="suggestion-description">${suggestion.description}</p>
                <button class="suggestion-button" onclick="showDigitalArtLearning()">
                    <span>✨</span> ${suggestion.action}
                </button>
            </div>
          `
        } else if (suggestion.actionHandler === 'showCommunityModal') {
          return `
            <div class="suggestion-card">
                <div class="suggestion-icon">${suggestion.icon}</div>
                <h3 class="suggestion-title">${suggestion.title}</h3>
                <p class="suggestion-description">${suggestion.description}</p>
                <button class="suggestion-button" onclick="showCommunityModal()">
                    <span>✨</span> ${suggestion.action}
                </button>
            </div>
          `
        } else {
          return `
            <div class="suggestion-card">
                <div class="suggestion-icon">${suggestion.icon}</div>
                <h3 class="suggestion-title">${suggestion.title}</h3>
                <p class="suggestion-description">${suggestion.description}</p>
                <button class="suggestion-button">
                    <span>✨</span> ${suggestion.action}
                </button>
            </div>
          `
        }
      }
    )
    .join("")
}

function tryAgain() {
  // Clear previous data
  localStorage.removeItem("selectedPlan")
  localStorage.removeItem("userFeedback")
  localStorage.removeItem("planCompleted")
  localStorage.removeItem("planNotes")
  localStorage.removeItem("feedbackNotes")

  window.location.href = "explore.html"
}

function goToHistory() {
  window.location.href = "history.html"
}

function goBack() {
  window.location.href = "feedback.html"
}

// Digital art deep learning resources - using YouTube video links
const digitalArtVideos = [
  {
    title: "Digital Art Beginner Tutorial",
    description: "Learn digital painting from scratch, suitable for complete beginners",
    thumbnail: "🎨",
    duration: "15 minutes",
    difficulty: "Beginner",
    url: "https://www.youtube.com/watch?v=WxqoH7XlqkE",
    tags: ["Digital Art", "Beginner", "Basic"]
  },
  {
    title: "Procreate Complete Tutorial",
    description: "Detailed tutorial for the most popular digital painting software on iPad",
    thumbnail: "📱",
    duration: "45 minutes",
    difficulty: "Beginner",
    url: "https://www.youtube.com/watch?v=8tqX9d5y5qY",
    tags: ["Procreate", "iPad", "Digital Painting"]
  },
  {
    title: "SAI Painting Software Tutorial",
    description: "Detailed usage tutorial for the classic PC painting software SAI",
    thumbnail: "💻",
    duration: "30 minutes",
    difficulty: "Intermediate",
    url: "https://www.youtube.com/watch?v=7tqX9d5y5qY",
    tags: ["SAI", "PC Painting", "Techniques"]
  },
  {
    title: "Photoshop Illustration Drawing",
    description: "Complete process tutorial for drawing beautiful illustrations using PS",
    thumbnail: "🖼️",
    duration: "25 minutes",
    difficulty: "Intermediate",
    url: "https://www.youtube.com/watch?v=6tqX9d5y5qY",
    tags: ["Photoshop", "Illustration", "Drawing"]
  },
  {
    title: "Character Design Basic Tutorial",
    description: "Learn how to design unique character images and figures",
    thumbnail: "👤",
    duration: "35 minutes",
    difficulty: "Intermediate",
    url: "https://www.youtube.com/watch?v=5tqX9d5y5qY",
    tags: ["Character Design", "Figures", "Creation"]
  },
  {
    title: "Scene Drawing Techniques Tutorial",
    description: "How to draw beautiful backgrounds and scene environments",
    thumbnail: "🏞️",
    duration: "40 minutes",
    difficulty: "Advanced",
    url: "https://www.youtube.com/watch?v=4tqX9d5y5qY",
    tags: ["Scene", "Background", "Environment"]
  },
  {
    title: "Color Matching Principles Tutorial",
    description: "Master color usage and matching in digital painting",
    thumbnail: "🌈",
    duration: "18 minutes",
    difficulty: "Beginner",
    url: "https://www.youtube.com/watch?v=3tqX9d5y5qY",
    tags: ["Color", "Matching", "Principles"]
  },
  {
    title: "Light and Shadow Expression Techniques Tutorial",
    description: "Learn how to express light and shadow effects and three-dimensionality of objects",
    thumbnail: "💡",
    duration: "22 minutes",
    difficulty: "Intermediate",
    url: "https://www.youtube.com/watch?v=2tqX9d5y5qY",
    tags: ["Light and Shadow", "Techniques", "Expression"]
  }
]

function showDigitalArtLearning() {
  // Create modal
  const modal = document.createElement('div')
  modal.className = 'learning-modal'
  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>🎨 Digital Art Deep Learning</h2>
          <button class="modal-close" onclick="closeLearningModal()">×</button>
        </div>
        <div class="modal-body">
          <p class="modal-description">Choose a video you're interested in to start learning!</p>
          <div class="video-grid">
            ${digitalArtVideos.map(video => `
              <div class="video-card" onclick="openVideo('${video.url}', '${video.title}')">
                <div class="video-thumbnail">${video.thumbnail}</div>
                <div class="video-info">
                  <h3 class="video-title">${video.title}</h3>
                  <p class="video-description">${video.description}</p>
                  <div class="video-meta">
                    <span class="video-duration">⏱️ ${video.duration}</span>
                    <span class="video-difficulty">📊 ${video.difficulty}</span>
                  </div>
                  <div class="video-tags">
                    ${video.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `
  
  document.body.appendChild(modal)
  
  // Add animation effects
  setTimeout(() => {
    modal.querySelector('.modal-overlay').style.opacity = '1'
    modal.querySelector('.modal-content').style.transform = 'translateY(0)'
  }, 10)
}

function closeLearningModal() {
  const modal = document.querySelector('.learning-modal')
  if (modal) {
    modal.querySelector('.modal-overlay').style.opacity = '0'
    modal.querySelector('.modal-content').style.transform = 'translateY(20px)'
    setTimeout(() => {
      document.body.removeChild(modal)
    }, 300)
  }
}

function openVideo(url, title) {
  // Open video in new window
  window.open(url, '_blank')
  
  // Show success message
  showMessage(`Opening: ${title}`, 'success', 2000)
  
  // Close modal
  closeLearningModal()
}

function showMessage(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div')
  notification.className = `notification ${type}`
  notification.textContent = message
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.95);
    color: #333;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    font-size: 14px;
    font-weight: 500;
    animation: slideInRight 0.3s ease;
  `
  
  document.body.appendChild(notification)
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease'
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, duration)
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadRecommendations()
}) 

// 1. User nickname and avatar management
function getCurrentUser() {
  let user = JSON.parse(localStorage.getItem('myProfile')||'null')
  if (!user) {
    user = { nickname: 'Me', avatar: 'public/placeholder-user.jpg' }
    localStorage.setItem('myProfile', JSON.stringify(user))
  }
  return user
}
function setCurrentUser() {
  const old = getCurrentUser()
  const nickname = prompt('Please enter your nickname', old.nickname) || old.nickname
  const avatar = prompt('Please enter avatar image link (can use default)', old.avatar) || old.avatar
  const user = { nickname, avatar }
  localStorage.setItem('myProfile', JSON.stringify(user))
  loadIMLayout()
}

// 2. Initial virtual friends
const defaultFriends = [
  { nickname: 'Xiao Ming', avatar: 'public/placeholder-user.jpg' },
  { nickname: 'Xiao Hong', avatar: 'public/placeholder.jpg' },
  { nickname: 'Exploration Assistant', avatar: 'public/placeholder-logo.png' }
]
function getFriendList() {
  let friends = JSON.parse(localStorage.getItem('myFriends')||'null')
  if (!friends) {
    friends = defaultFriends
    localStorage.setItem('myFriends', JSON.stringify(friends))
  }
  return friends
}
function addFriend() {
  const name = prompt('Please enter friend nickname')
  if (!name) return
  let friends = getFriendList()
  if (friends.some(f=>f.nickname===name)) { alert('This friend has already been added'); return }
  friends.push({ nickname: name, avatar: 'public/placeholder.jpg' })
  localStorage.setItem('myFriends', JSON.stringify(friends))
  loadIMLayout()
}
function removeFriend(name) {
  let friends = getFriendList().filter(f=>f.nickname!==name)
  localStorage.setItem('myFriends', JSON.stringify(friends))
  loadIMLayout()
}

// 3. Chat data management
function getChatHistory(friend) {
  const me = getCurrentUser().nickname
  const key = `chat_${me}_${friend}`
  return JSON.parse(localStorage.getItem(key)||'[]')
}
function saveChatHistory(friend, arr) {
  const me = getCurrentUser().nickname
  const key = `chat_${me}_${friend}`
  localStorage.setItem(key, JSON.stringify(arr))
}

// 4. Large screen IM popup
let currentIMFriend = null
function showCommunityModal() {
  const modal = document.createElement('div')
  modal.className = 'im-modal'
  modal.innerHTML = `
    <div class="im-overlay">
      <div class="im-content">
        <div class="im-sidebar">
          <div class="im-profile">
            <img src="${getCurrentUser().avatar}" class="im-avatar" onclick="setCurrentUser()" title="Click to change nickname/avatar">
            <div class="im-nickname">${getCurrentUser().nickname}</div>
            <button class="im-add-friend" onclick="addFriend()">+ Add Friend</button>
          </div>
          <div class="im-friend-list" id="imFriendList"></div>
        </div>
        <div class="im-main" id="imMainPanel">
          <div class="im-placeholder">Please select a friend from the left to start chatting</div>
        </div>
        <button class="im-close" onclick="closeCommunityModal()">×</button>
      </div>
    </div>
  `
  document.body.appendChild(modal)
  setTimeout(() => {
    modal.querySelector('.im-overlay').style.opacity = '1'
    modal.querySelector('.im-content').style.transform = 'scale(1)'
    loadIMLayout()
  }, 10)
}
function closeCommunityModal() {
  const modal = document.querySelector('.im-modal')
  if (modal) {
    modal.querySelector('.im-overlay').style.opacity = '0'
    modal.querySelector('.im-content').style.transform = 'scale(0.98)'
    setTimeout(() => {
      document.body.removeChild(modal)
      currentIMFriend = null
    }, 300)
  }
}
function loadIMLayout() {
  // Left friend list
  const friends = getFriendList()
  const box = document.getElementById('imFriendList')
  if (!box) return
  box.innerHTML = friends.map(f =>
    `<div class="im-friend-item${currentIMFriend===f.nickname?' active':''}" onclick="openIMChat('${f.nickname}')">
      <img src="${f.avatar}" class="im-avatar-small">
      <span>${f.nickname}</span>
      <button class="im-remove-friend" onclick="event.stopPropagation();removeFriend('${f.nickname}')">×</button>
    </div>`
  ).join('')
  // Right chat window
  if (currentIMFriend) openIMChat(currentIMFriend)
  else document.getElementById('imMainPanel').innerHTML = '<div class="im-placeholder">Please select a friend from the left to start chatting</div>'
}
function openIMChat(friend) {
  currentIMFriend = friend
  loadIMLayout()
  const me = getCurrentUser()
  const f = getFriendList().find(x=>x.nickname===friend)
  const arr = getChatHistory(friend)
  document.getElementById('imMainPanel').innerHTML = `
    <div class="im-chat-header">
      <img src="${f.avatar}" class="im-avatar-small">
      <span class="im-chat-title">${f.nickname}</span>
    </div>
    <div class="im-chat-history" id="imChatHistory"></div>
    <div class="im-chat-input-bar">
      <input id="imChatInput" type="text" placeholder="Enter message..." onkeydown="if(event.key==='Enter'){sendIMMessage()}" />
      <button onclick="sendIMMessage()">Send</button>
    </div>
  `
  loadIMChatHistory(friend)
}
function loadIMChatHistory(friend) {
  const arr = getChatHistory(friend)
  const box = document.getElementById('imChatHistory')
  if (!box) return
  box.innerHTML = arr.slice(-50).map(msg =>
    `<div class="im-msg${msg.from===getCurrentUser().nickname?' me':' friend'}">
      <img src="${msg.from===getCurrentUser().nickname?getCurrentUser().avatar:getFriendList().find(f=>f.nickname===friend).avatar}" class="im-avatar-tiny">
      <div class="im-msg-bubble">
        <div class="im-msg-nick">${msg.from}</div>
        <div class="im-msg-text">${msg.text}</div>
        <div class="im-msg-time">${msg.time}</div>
      </div>
    </div>`
  ).join('')
  box.scrollTop = box.scrollHeight
}
function sendIMMessage() {
  const input = document.getElementById('imChatInput')
  const text = input.value.trim()
  if (!text) return
  const arr = getChatHistory(currentIMFriend)
  arr.push({ from: getCurrentUser().nickname, text, time: new Date().toLocaleTimeString().slice(0,5) })
  saveChatHistory(currentIMFriend, arr)
  input.value = ''
  loadIMChatHistory(currentIMFriend)
} 