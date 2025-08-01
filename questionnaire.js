const selectedMethods = []
let priorityOrder = ["emotional-comfort", "companionship", "quick-feedback", "clear-goal"]

function goBack() {
  window.location.href = "stage-selection.html"
}

function toggleMethod(method) {
  const item = document.querySelector(`[onclick="toggleMethod('${method}')"]`)
  const index = selectedMethods.indexOf(method)

  if (index > -1) {
    // Remove method
    selectedMethods.splice(index, 1)
    item.classList.remove("selected")
  } else {
    // Add method
    selectedMethods.push(method)
    item.classList.add("selected")
  }
}

function initializeDragAndDrop() {
  const priorityList = document.getElementById("priority-list")
  const items = priorityList.querySelectorAll(".priority-item")

  items.forEach((item) => {
    item.addEventListener("dragstart", handleDragStart)
    item.addEventListener("dragover", handleDragOver)
    item.addEventListener("drop", handleDrop)
    item.addEventListener("dragend", handleDragEnd)
  })
}

let draggedElement = null

function handleDragStart(e) {
  draggedElement = this
  this.classList.add("dragging")
  e.dataTransfer.effectAllowed = "move"
  e.dataTransfer.setData("text/html", this.outerHTML)
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault()
  }
  e.dataTransfer.dropEffect = "move"
  return false
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation()
  }

  if (draggedElement !== this) {
    const priorityList = document.getElementById("priority-list")
    const allItems = Array.from(priorityList.children)
    const draggedIndex = allItems.indexOf(draggedElement)
    const targetIndex = allItems.indexOf(this)

    if (draggedIndex < targetIndex) {
      this.parentNode.insertBefore(draggedElement, this.nextSibling)
    } else {
      this.parentNode.insertBefore(draggedElement, this)
    }

    updatePriorityOrder()
  }

  return false
}

function handleDragEnd(e) {
  this.classList.remove("dragging")
  draggedElement = null
}

function updatePriorityOrder() {
  const items = document.querySelectorAll(".priority-item")
  priorityOrder = Array.from(items).map((item) => item.dataset.priority)
}

function completeQuestionnaire() {
  if (selectedMethods.length === 0) {
    alert("Please select at least one exploration method")
    return
  }

  // Get stage data from localStorage
  const stageData = JSON.parse(localStorage.getItem("stageData") || "{}")

  // Combine all data
  const userData = {
    ...stageData,
    methods: selectedMethods,
    priorities: priorityOrder,
    timestamp: new Date().toISOString(),
  }

  localStorage.setItem("userData", JSON.stringify(userData))

  // Show encouragement message
  showEncouragementMessage()
}

function showEncouragementMessage() {
  // Create fullscreen overlay
  const overlay = document.createElement('div')
  overlay.className = 'encouragement-overlay'
  overlay.innerHTML = `
    <div class="fullscreen-background">
      <div class="floating-particles">
        <div class="particle particle-1">✨</div>
        <div class="particle particle-2">🌟</div>
        <div class="particle particle-3">💫</div>
        <div class="particle particle-4">⭐</div>
        <div class="particle particle-5">🎊</div>
        <div class="particle particle-6">🎈</div>
        <div class="particle particle-7">🎁</div>
        <div class="particle particle-8">🎉</div>
        <div class="particle particle-9">💎</div>
        <div class="particle particle-10">🔥</div>
        <div class="particle particle-11">⚡</div>
        <div class="particle particle-12">🌈</div>
      </div>
      
      <div class="confetti-container">
        <div class="confetti confetti-1">🎉</div>
        <div class="confetti confetti-2">✨</div>
        <div class="confetti confetti-3">🌟</div>
        <div class="confetti confetti-4">💫</div>
        <div class="confetti confetti-5">🎊</div>
        <div class="confetti confetti-6">⭐</div>
        <div class="confetti confetti-7">🎈</div>
        <div class="confetti confetti-8">🎁</div>
        <div class="confetti confetti-9">💎</div>
        <div class="confetti confetti-10">🔥</div>
        <div class="confetti confetti-11">⚡</div>
        <div class="confetti confetti-12">🌈</div>
      </div>
      
      <div class="light-rays">
        <div class="ray ray-1"></div>
        <div class="ray ray-2"></div>
        <div class="ray ray-3"></div>
        <div class="ray ray-4"></div>
        <div class="ray ray-5"></div>
      </div>
    </div>
    
    <div class="encouragement-content">
      <!-- Content in the middle -->
      <div class="welcome-icon-container">
        <div class="welcome-icon">🎯</div>
        <div class="icon-glow"></div>
        <div class="icon-rings">
          <div class="ring ring-1"></div>
          <div class="ring ring-2"></div>
          <div class="ring ring-3"></div>
        </div>
      </div>
      
      <h2 class="welcome-title">
        <span class="title-word title-word-1">Welcome</span>
        <span class="title-word title-word-2">to</span>
        <span class="title-word title-word-3">Path</span>
        <span class="title-word title-word-4">Finder!</span>
      </h2>
      
      <p class="welcome-message">🎊 Amazing! You've taken the first step towards discovering your perfect path. Let's make this journey incredible together! 🚀</p>
      
      <div class="encouragement-features">
        <div class="feature-item feature-1">
          <span class="feature-icon">✨</span>
          <span>AI-Powered Personalization</span>
          <div class="feature-sparkle"></div>
          <div class="feature-trail"></div>
        </div>
        <div class="feature-item feature-2">
          <span class="feature-icon">🎯</span>
          <span>Smart Goal Setting</span>
          <div class="feature-sparkle"></div>
          <div class="feature-trail"></div>
        </div>
        <div class="feature-item feature-3">
          <span class="feature-icon">🚀</span>
          <span>Guided Exploration</span>
          <div class="feature-sparkle"></div>
          <div class="feature-trail"></div>
        </div>
        <div class="feature-item feature-4">
          <span class="feature-icon">💡</span>
          <span>Creative Discovery</span>
          <div class="feature-sparkle"></div>
          <div class="feature-trail"></div>
        </div>
      </div>
      
      <!-- Button at the bottom -->
      <div class="encouragement-actions" style="margin-top: 40px;">
        <!-- Original styled button -->
        <button class="btn-primary encouragement-btn" onclick="proceedToExplore()" style="cursor: pointer; z-index: 999; position: relative;">
          <span class="btn-text">Start Your Adventure</span>
          <span class="btn-icon">🚀</span>
          <div class="btn-glow"></div>
          <div class="btn-particles">
            <div class="btn-particle">✨</div>
            <div class="btn-particle">🌟</div>
            <div class="btn-particle">💫</div>
          </div>
        </button>
      </div>
    </div>
  `
  
  document.body.appendChild(overlay)
  
  // Add animation with delay
  setTimeout(() => {
    overlay.style.opacity = '1'
    
    // Animate floating particles
    const particles = overlay.querySelectorAll('.particle')
    particles.forEach((particle, index) => {
      setTimeout(() => {
        particle.style.animation = 'float 6s ease-in-out infinite'
      }, index * 100)
    })
    
    // Animate confetti
    const confettiElements = overlay.querySelectorAll('.confetti')
    confettiElements.forEach((confetti, index) => {
      setTimeout(() => {
        confetti.style.animation = 'confetti-fall 4s ease-in forwards'
      }, index * 150)
    })
    
    // Animate light rays
    const rays = overlay.querySelectorAll('.ray')
    rays.forEach((ray, index) => {
      setTimeout(() => {
        ray.style.animation = 'rayRotate 8s linear infinite'
      }, index * 200)
    })
    
    // Animate icon rings
    const rings = overlay.querySelectorAll('.ring')
    rings.forEach((ring, index) => {
      setTimeout(() => {
        ring.style.animation = 'ringPulse 3s ease-in-out infinite'
      }, index * 300)
    })
    
    // Animate features
    const featureItems = overlay.querySelectorAll('.feature-item')
    featureItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.animation = 'slideInFromRight 0.8s ease-out forwards'
      }, 1000 + index * 300)
    })
    
    // Animate title words
    const titleWords = overlay.querySelectorAll('.title-word')
    titleWords.forEach((word, index) => {
      setTimeout(() => {
        word.style.animation = 'titleReveal 1s ease-out forwards'
      }, 600 + index * 200)
    })
    
    // Animate button particles
    setTimeout(() => {
      const btnParticles = overlay.querySelectorAll('.btn-particle')
      btnParticles.forEach((particle, index) => {
        setTimeout(() => {
          particle.style.animation = 'btnParticleFloat 2s ease-in-out infinite'
        }, index * 500)
      })
    }, 2000)
    
    // Add a simple click handler to the entire overlay as backup
    setTimeout(() => {
      overlay.addEventListener('click', (e) => {
        // If clicking on the overlay but not on specific elements, proceed
        if (e.target === overlay || e.target.classList.contains('welcome-message')) {
          proceedToExplore()
        }
      })
      console.log('Backup click handler added to overlay')
      
      // Add keyboard shortcut
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          proceedToExplore()
        }
      })
      console.log('Keyboard shortcuts added - Press Enter or Space to continue')
    }, 3000)
  }, 100)
}

function proceedToExplore() {
  console.log('proceedToExplore function called!') // Debug log
  
  // Direct redirect without animation for now
  window.location.href = "explore.html"
}

function skipQuestionnaire() {
  window.location.href = 'explore.html';
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Initialize drag and drop for priority list
  initializeDragAndDrop()

  // Load stage data if available
  const stageData = JSON.parse(localStorage.getItem("stageData") || "{}")
  if (!stageData.age) {
    // If no stage data, redirect back to stage selection
    window.location.href = "stage-selection.html"
  }
})
