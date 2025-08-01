const practitionerPlanDetails = {
  emoji: "🎨",
  title: "Digital Art Expression Workshop",
  description: "Learn to express your inner thoughts and emotions through digital art creation",
  videoUrl: "https://www.bilibili.com/video/BV1Dq4y1B7j8/?share_source=copy_web",
  steps: [
    "1️⃣ Watch creative demonstration video (about 5 minutes)<br><br>Content: How to express a small idea with 1 image<br><br>Example demonstrations:<br>• \"I want people to feel calm when they see this painting\"<br>• \"I want to draw the feeling of being swallowed by emotions\"<br><br>🎥 <a href='https://www.bilibili.com/video/BV1Dq4y1B7j8/?share_source=copy_web' target='_blank' class='video-link'>Click to watch: 'Speaking Through Images' Tutorial</a>",
    "2️⃣ Choose an expression direction 🎯<br><br>Guide students to choose one from the following thoughts:<br><br><div class='expression-directions'><div class='direction-option'><strong>Recent emotion:</strong> A feeling you want to express (like \"boredom\", \"excitement\", \"fear\")</div><div class='direction-option'><strong>Recent moment:</strong> A recent experience (like \"a ray of light on the way home\")</div><div class='direction-option'><strong>Abstract concept:</strong> An abstract thought (like \"feeling pulled by expectations\")</div></div>",
    "3️⃣ Create digital illustration using electronic tools (20 minutes)<br><br>Requirements: Use 1 image to express your chosen idea<br><br>Tools: Procreate / ibisPaint / hand-draw and photograph<br><br>Don't worry about perfection, but it must be something you genuinely want to create",
    "4️⃣ Upload work + Answer two questions 📤<br><br>• What idea were you trying to express?<br>• How well do you think you captured it? (1-5 scale)",
    "5️⃣ Receive AI or mentor feedback (automatic or manual) 💬<br><br>Examples:<br>• \"You seem good at using soft colors to express emotions, would you like to try color storytelling?\"<br>• \"Interesting composition, would you like to challenge yourself with 'character-free' expression?\"<br><br>Give 1 next step or inspiration suggestion, such as:<br>• \"Next step: Try drawing 'only color blocks, no shapes' to express the same feeling\"<br>• \"Try using 2 images to tell 1 emotional story\""
  ],
}

let completed = false
let uploadedFile = null
let selectedRating = 0

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
  const plan = practitionerPlanDetails
  const planContent = document.getElementById("plan-content")

  planContent.innerHTML = `
        <div class="card plan-header hover-lift animate-fade-in">
            <div class="plan-emoji animate-bounce">${plan.emoji}</div>
            <h1 class="animate-slide-left">${plan.title}</h1>
            <p class="plan-description animate-slide-right">${plan.description}</p>
        </div>

        <div class="card steps-section hover-lift animate-fade-in">
            <h2>Expression Workshop Steps:</h2>
            <ul class="steps-list">
                ${plan.steps
                  .map(
                    (step, index) => `
                    <li class="step-item">
                        <div class="step-number">${index + 1}</div>
                        <div class="step-text">${step}</div>
                    </li>
                `
                  )
                  .join("")}
            </ul>
        </div>
    `

  // Show welcome message
  setTimeout(() => {
    showMessage(`Start your expression journey: ${plan.title}`, "info", 3000)
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
          <img src="${e.target.result}" alt="Uploaded artwork" style="max-width: 200px; max-height: 200px; border-radius: 8px;">
          <p class="file-name">${file.name}</p>
          <button class="remove-file" onclick="removeFile()">✕</button>
        </div>
      `
      showMessage("Artwork uploaded successfully!", "success", 2000)
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

function validateExpressionIdea(textarea) {
  const charCount = document.getElementById("expression-char-count")
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
    showMessage("Description is a bit too long, try to be concise!", "warning", 2000)
  } else {
    charCount.style.color = "#6b7280"
  }
}

function selectRating(rating) {
  selectedRating = rating
  
  // Remove previous selection
  document.querySelectorAll('.rating-btn').forEach(btn => {
    btn.classList.remove('selected')
  })
  
  // Add selection to clicked button
  const selectedBtn = document.querySelector(`[onclick="selectRating(${rating})"]`)
  selectedBtn.classList.add('selected')
  
  showMessage(`Selected rating: ${rating}/5`, "success", 1500)
}

function goBack() {
  document.body.style.transition = "all 0.3s ease"
  document.body.style.opacity = "0.8"
  document.body.style.transform = "scale(0.95)"

  setTimeout(() => {
    window.location.href = "digital-art-skill.html"
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

    showMessage("Excellent! You completed the expression workshop 🎉", "success", 3000)

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
  const expressionIdea = document.getElementById("expression-idea").value
  localStorage.setItem("planCompleted", completed.toString())
  localStorage.setItem("expressionIdea", expressionIdea)
  localStorage.setItem("successRating", selectedRating.toString())

  if (uploadedFile) {
    // Here you can handle file upload to server logic
    localStorage.setItem("hasUpload", "true")
  }

  document.body.style.transition = "all 0.3s ease"
  document.body.style.opacity = "0.8"
  document.body.style.transform = "scale(0.95)"

  setTimeout(() => {
    window.location.href = "practitioner-feedback.html"
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
  
  .expression-directions {
    margin-top: 12px;
    padding: 16px;
    background: rgba(139, 92, 246, 0.05);
    border-radius: 8px;
    border-left: 4px solid #8b5cf6;
  }
  
  .direction-option {
    margin-bottom: 8px;
    padding: 8px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 4px;
  }
  
  .questions-section {
    margin-top: 24px;
  }
  
  .question-group {
    margin-bottom: 20px;
  }
  
  .question-group label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
  }
  
  .question-group textarea {
    width: 100%;
    min-height: 80px;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
    resize: vertical;
    transition: border-color 0.3s ease;
  }
  
  .question-group textarea:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
  
  .rating-buttons {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }
  
  .rating-btn {
    width: 40px;
    height: 40px;
    border: 2px solid #d1d5db;
    border-radius: 8px;
    background: white;
    color: #6b7280;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .rating-btn:hover {
    border-color: #8b5cf6;
    color: #8b5cf6;
  }
  
  .rating-btn.selected {
    background: #8b5cf6;
    border-color: #8b5cf6;
    color: white;
  }
`
document.head.appendChild(style)

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadPlanContent()
}) 