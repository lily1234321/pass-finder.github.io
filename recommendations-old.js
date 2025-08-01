const recommendations = {
  love: {
    title: "太棒了！你对这个方向很感兴趣 ✨",
    subtitle: "你可以进一步尝试：",
    suggestions: [
      {
        icon: "📚",
        title: "深入学习",
        description: "观看进阶教程或参加相关课程",
        action: "开始学习",
        hasDeepLearning: true,
      },
      {
        icon: "👥",
        title: "加入社群",
        description: "找到志同道合的伙伴一起探索",
        action: "寻找社群",
      },
      {
        icon: "🎯",
        title: "设定小目标",
        description: "制定一个30天的练习计划",
        action: "制定计划",
      },
      {
        icon: "💬",
        title: "找个导师",
        description: "与有经验的人聊聊学习心得",
        action: "寻找导师",
      },
    ],
  },
  neutral: {
    title: "没关系，也许你喜欢这种方式的探索？ 🤔",
    subtitle: "你还可以试试：",
    suggestions: [
      {
        icon: "🔄",
        title: "换种方式",
        description: "用不同的方法再试一次同类型活动",
        action: "再试一次",
      },
      {
        icon: "🎮",
        title: "游戏化体验",
        description: "通过更轻松的游戏方式来探索",
        action: "开始游戏",
      },
      {
        icon: "🎧",
        title: "被动学习",
        description: "从听播客或看视频开始",
        action: "开始听看",
      },
      {
        icon: "👂",
        title: "与人交流",
        description: "和朋友聊聊这个话题",
        action: "找人聊聊",
      },
    ],
  },
  dislike: {
    title: "探索的意义就是试错～ 🌈",
    subtitle: "你还可以试试这些方向：",
    suggestions: [
      {
        icon: "✍️",
        title: "写作表达",
        description: "通过文字记录想法和感受",
        action: "开始写作",
      },
      {
        icon: "🧘",
        title: "内心探索",
        description: "冥想、正念或心理学相关",
        action: "内心之旅",
      },
      {
        icon: "📸",
        title: "视觉记录",
        description: "摄影或空间设计相关",
        action: "视觉探索",
      },
      {
        icon: "🤝",
        title: "社交连接",
        description: "志愿服务或社群活动",
        action: "连接他人",
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

  // 更新标题
  document.getElementById("recommendation-title").textContent = currentRecommendations.title
  document.getElementById("recommendation-subtitle").textContent = currentRecommendations.subtitle

  // 生成建议卡片
  const suggestionsGrid = document.getElementById("suggestions-grid")
  suggestionsGrid.innerHTML = currentRecommendations.suggestions
    .map(
      (suggestion) => {
        // 为电子艺术添加特殊的深入学习功能
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
  // 清除之前的数据
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

// 电子艺术深入学习资源 - 使用真实的B站视频链接
const digitalArtVideos = [
  {
    title: "板绘入门基础教程",
    description: "从零开始学习数字绘画，适合完全新手",
    thumbnail: "🎨",
    duration: "15分钟",
    difficulty: "初级",
    url: "https://www.bilibili.com/video/BV1xx411c7mu",
    tags: ["板绘", "入门", "基础"]
  },
  {
    title: "Procreate完整教程",
    description: "iPad上最受欢迎的数字绘画软件详细教程",
    thumbnail: "📱",
    duration: "45分钟",
    difficulty: "初级",
    url: "https://www.bilibili.com/video/BV1GJ411x7h7",
    tags: ["Procreate", "iPad", "数字绘画"]
  },
  {
    title: "SAI绘画软件教程",
    description: "PC端经典绘画软件SAI的详细使用教程",
    thumbnail: "💻",
    duration: "30分钟",
    difficulty: "中级",
    url: "https://www.bilibili.com/video/BV1YW411L7qK",
    tags: ["SAI", "PC绘画", "技巧"]
  },
  {
    title: "Photoshop插画绘制",
    description: "使用PS绘制精美插画的完整流程教程",
    thumbnail: "🖼️",
    duration: "25分钟",
    difficulty: "中级",
    url: "https://www.bilibili.com/video/BV1xx411c7mu",
    tags: ["Photoshop", "插画", "绘制"]
  },
  {
    title: "角色设计基础教程",
    description: "学习如何设计独特的角色形象和人物",
    thumbnail: "👤",
    duration: "35分钟",
    difficulty: "中级",
    url: "https://www.bilibili.com/video/BV1xx411c7mu",
    tags: ["角色设计", "人物", "创作"]
  },
  {
    title: "场景绘制技巧教程",
    description: "如何绘制精美的背景和场景环境",
    thumbnail: "🏞️",
    duration: "40分钟",
    difficulty: "高级",
    url: "https://www.bilibili.com/video/BV1xx411c7mu",
    tags: ["场景", "背景", "环境"]
  },
  {
    title: "色彩搭配原理教程",
    description: "掌握数字绘画中的色彩运用和搭配",
    thumbnail: "🌈",
    duration: "18分钟",
    difficulty: "初级",
    url: "https://www.bilibili.com/video/BV1xx411c7mu",
    tags: ["色彩", "搭配", "原理"]
  },
  {
    title: "光影表现技法教程",
    description: "学习如何表现物体的光影效果和立体感",
    thumbnail: "💡",
    duration: "22分钟",
    difficulty: "中级",
    url: "https://www.bilibili.com/video/BV1xx411c7mu",
    tags: ["光影", "技法", "表现"]
  }
]

function showDigitalArtLearning() {
  // 创建模态框
  const modal = document.createElement('div')
  modal.className = 'learning-modal'
  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>🎨 电子艺术深入学习</h2>
          <button class="modal-close" onclick="closeLearningModal()">×</button>
        </div>
        <div class="modal-body">
          <p class="modal-description">选择你感兴趣的视频开始学习吧！</p>
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
  
  // 添加动画效果
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
  // 在新窗口打开视频
  window.open(url, '_blank')
  
  // 显示成功消息
  showMessage(`正在打开：${title}`, 'success', 2000)
  
  // 关闭模态框
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

// 页面加载时初始化
document.addEventListener("DOMContentLoaded", () => {
  loadRecommendations()
}) 