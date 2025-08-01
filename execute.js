const planDetails = {
  "digital-art": {
    emoji: "🎨",
    title: "Digital Art",
    description: "Watch a 5-minute digital illustration tutorial video + draw a simple line drawing",
    videoUrl: "https://www.bilibili.com/video/BV1xcbQz1ESf/?share_source=copy_web",
    steps: [
      "Watch Procreate digital journal tutorial video (5 minutes) - <a href='https://www.bilibili.com/video/BV1Dq4y1B7j8/?share_source=copy_web' target='_blank' class='video-link'>📱 Watch Procreate Tutorial</a>",
      "Choose a simple theme (like fruits, flowers) - <a href='https://bpic.588ku.com/element_origin_min_pic/23/04/08/d112179814ad1b3d77bb7ceec63b7713.jpg' target='_blank' class='theme-link'>🍎 Fruits</a> | <a href='https://i.pinimg.com/736x/26/15/85/261585b1301e60a6df3f8df6aec810f9.jpg' target='_blank' class='theme-link'>🌸 Flowers</a>",
      "Draw a line drawing with any drawing tool - <a href='https://www.bilibili.com/video/BV1xcbQz1ESf/?share_source=copy_web' target='_blank' class='video-link'>🎨 Software Review</a>",
      "Take a photo and upload your work",
    ],
  },
  expression: {
    emoji: "🎤",
    title: "Expression Skills",
    description: "Record a 1-minute video talking about something happy that happened to you recently",
    steps: ["Think about something that made you happy recently", "Organize your thoughts in your mind", "Record a 1-minute video sharing this experience", "Upload your video"],
  },
  "emotion-awareness": {
    emoji: "🧠",
    title: "Emotional Awareness",
    description: "Use emojis to record your mood today and write one sentence explaining it",
    steps: ["Recall your overall feelings today", "Choose the most fitting emoji", "Write one sentence explaining this mood", "Submit your emotional record"],
  },
  "creative-vlog": {
    emoji: "🎬",
    title: "Creative Exploration",
    description: "Film a 10-second vlog clip recording your current feelings",
    steps: ["Find a place where you feel comfortable", "Think about your current feelings or thoughts", "Film a 10-second vlog", "Upload your creation"],
  },
  writing: {
    emoji: "✍️",
    title: "Written Expression",
    description: 'Write a 100-word short story with the theme "A small discovery today"',
    steps: ["Recall any small discovery today", "Could be something you saw, heard, or thought of", "Write it into a 100-word short story", "Submit your written work"],
  },
  "graduate-research": {
    emoji: "📚",
    title: "Graduate Research",
    description: "Learn about graduate school information and explore possibilities for academic advancement",
    steps: [
      "Learn about graduate school requirements for your field of interest",
      "Check admission information for several target universities",
      "Understand the basic process and timeline for graduate school",
      "Record your thoughts and questions",
    ],
  },
}

let completed = false
let uploadedFile = null

function showMessage(message, type, duration = 3000) {
  const messageElement = document.createElement("div")
  messageElement.className = `encouragement-message ${type}`
  messageElement.textContent = message
  document.body.appendChild(messageElement)

  setTimeout(() => {
    messageElement.remove()
  }, duration)
}

function setButtonLoading(button, isLoading) {
  if (isLoading) {
    button.disabled = true
    button.textContent = "Loading..."
  } else {
    button.disabled = false
    button.textContent = "Complete"
  }
}

function setButtonSuccess(button, duration) {
  button.style.backgroundColor = "#10b981"
  button.style.color = "#ffffff"
  setTimeout(() => {
    button.style.backgroundColor = ""
    button.style.color = ""
  }, duration)
}

function loadPlanContent() {
  const selectedPlan = localStorage.getItem("selectedPlan")
  if (!selectedPlan || !planDetails[selectedPlan]) {
    showMessage("Selected plan not found, returning to selection page", "warning")
    setTimeout(() => {
      window.location.href = "explore.html"
    }, 2000)
    return
  }

  const plan = planDetails[selectedPlan]
  const planContent = document.getElementById("plan-content")

  planContent.innerHTML = `
        <div class="card plan-header hover-lift animate-fade-in">
            <div class="plan-emoji animate-bounce">${plan.emoji}</div>
            <h1 class="animate-slide-left">${plan.title}</h1>
            <p class="plan-description animate-slide-right">${plan.description}</p>
        </div>

        <div class="card steps-section hover-lift animate-fade-in">
            <h2>Execution Steps:</h2>
            <ul class="steps-list">
                ${plan.steps
                  .map(
                    (step, index) => `
                    <li class="step-item animate-fade-in" style="animation-delay: ${index * 0.2}s">
                        <div class="step-number">${index + 1}</div>
                        <div class="step-text">${step}</div>
                    </li>
                `,
                  )
                  .join("")}
            </ul>
        </div>
    `

  // Show welcome message
  setTimeout(() => {
    showMessage(`Start executing: ${plan.title}`, "info", 3000)
  }, 500)
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  uploadedFile = file
  const preview = document.getElementById("upload-preview")
  const uploadArea = document.getElementById("upload-area")

  // Add upload animation
  uploadArea.classList.add("animate-pulse")

  if (file.type.startsWith("image/")) {
    const reader = new FileReader()
    reader.onload = (e) => {
      preview.innerHTML = `
        <div class="file-preview animate-fade-in">
          <img src="${e.target.result}" alt="Uploaded image" style="max-width: 200px; max-height: 200px; border-radius: 8px;">
          <p class="file-name">${file.name}</p>
          <button class="remove-file" onclick="removeFile()">✕</button>
        </div>
      `
      showMessage("Image uploaded successfully!", "success", 2000)
    }
    reader.readAsDataURL(file)
  } else {
    preview.innerHTML = `
      <div class="file-preview animate-fade-in">
        <div class="file-icon">📁</div>
        <p class="file-name">${file.name}</p>
        <p class="file-size">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
        <button class="remove-file" onclick="removeFile()">✕</button>
      </div>
    `
    showMessage("File uploaded successfully!", "success", 2000)
  }

  setTimeout(() => {
    uploadArea.classList.remove("animate-pulse")
  }, 1000)
}

function removeFile() {
  uploadedFile = null
  document.getElementById("upload-preview").innerHTML = ""
  document.getElementById("file-upload").value = ""
  showMessage("File removed", "info", 1500)
}

function validateNotes(textarea) {
  const charCount = document.getElementById("char-count")
  const length = textarea.value.length
  charCount.textContent = `${length} characters`

  if (length > 0) {
    textarea.classList.add("form-field-valid")
    textarea.classList.remove("form-field-invalid")
  } else {
    textarea.classList.remove("form-field-valid", "form-field-invalid")
  }

  // Character count reminder
  if (length > 500) {
    charCount.style.color = "#ef4444"
    showMessage("Text is a bit too long, try to be concise!", "warning", 2000)
  } else {
    charCount.style.color = "#6b7280"
  }
}

function goBack() {
  document.body.style.transition = "all 0.3s ease"
  document.body.style.opacity = "0.8"
  document.body.style.transform = "scale(0.95)"

  setTimeout(() => {
    window.location.href = "explore.html"
  }, 300)
}

function goHome() {
  document.body.style.transition = "all 0.3s ease"
  document.body.style.opacity = "0.8"
  document.body.style.transform = "scale(0.95)"

  setTimeout(() => {
    window.location.href = "index.html"
  }, 300)
}

function markCompleted() {
  const button = event.target

  // Button loading state
  setButtonLoading(button, true)

  setTimeout(() => {
    completed = true
    setButtonLoading(button, false)
    setButtonSuccess(button, 2000)

    // Show next step button
    const nextStep = document.getElementById("next-step")
    nextStep.style.display = "block"
    nextStep.style.opacity = "0"
    nextStep.style.transform = "translateY(20px)"

    setTimeout(() => {
      nextStep.style.transition = "all 0.5s ease"
      nextStep.style.opacity = "1"
      nextStep.style.transform = "translateY(0)"
    }, 100)

    showMessage("Great! You completed this plan 🎉", "success", 3000)

    // Add celebration animation
    createCelebration()
  }, 1000)
}

function skipPlan() {
  const button = event.target
  setButtonLoading(button, true)

  setTimeout(() => {
    setButtonLoading(button, false)
    showMessage("No problem, you can try again later!", "info", 2000)
    goToFeedback()
  }, 500)
}

function goToFeedback() {
  const notes = document.getElementById("notes").value
  localStorage.setItem("planCompleted", completed.toString())
  localStorage.setItem("planNotes", notes)

  if (uploadedFile) {
    // Here you can handle file upload to server logic
    localStorage.setItem("hasUpload", "true")
  }

  document.body.style.transition = "all 0.3s ease"
  document.body.style.opacity = "0.8"
  document.body.style.transform = "scale(0.95)"

  setTimeout(() => {
    window.location.href = "feedback.html"
  }, 300)
}

function createCelebration() {
  // Create celebration animation
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div")
      confetti.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}%;
        width: 10px;
        height: 10px;
        background: ${["#8b5cf6", "#ec4899", "#10b981", "#f59e0b"][Math.floor(Math.random() * 4)]};
        border-radius: 50%;
        animation: confetti-fall 3s ease-out forwards;
        pointer-events: none;
        z-index: 1000;
      `

      document.body.appendChild(confetti)

      setTimeout(() => {
        confetti.remove()
      }, 3000)
    }, i * 100)
  }
}

// Add celebration animation CSS
const style = document.createElement("style")
style.textContent = `
  @keyframes confetti-fall {
    0% {
      transform: translateY(-100vh) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
  
  .file-preview {
    margin-top: 16px;
    padding: 16px;
    background: rgba(139, 92, 246, 0.05);
    border-radius: 8px;
    position: relative;
    text-align: center;
  }
  
  .remove-file {
    position: absolute;
    top: 8px;
    right: 8px;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: 12px;
  }
  
  .char-count {
    text-align: right;
    font-size: 12px;
    color: #6b7280;
    margin-top: 4px;
  }
  
  .encouragement-message {
    text-align: center;
    margin-top: 32px;
    padding: 16px;
    background: linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%);
    border-radius: 12px;
    color: #374151;
    font-weight: 500;
  }
`
document.head.appendChild(style)

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadPlanContent()
})
