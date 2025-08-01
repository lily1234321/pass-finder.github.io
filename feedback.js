const planTitles = {
  "digital-art": "Digital Art",
  expression: "Expression Skills",
  "emotion-awareness": "Emotional Awareness",
  "creative-vlog": "Creative Exploration",
  writing: "Written Expression",
  "graduate-research": "Graduate Research",
}

let selectedFeedback = ""

function showMessage(message, type, duration) {
  // Implementation of showMessage function
  console.log(`Message: ${message}, Type: ${type}, Duration: ${duration}`)
}

function setButtonLoading(button, isLoading) {
  // Implementation of setButtonLoading function
  button.disabled = isLoading
  if (isLoading) {
    button.textContent = "Submitting..."
  } else {
    button.textContent = "Submit Feedback"
  }
}

function setButtonSuccess(button, duration) {
  // Implementation of setButtonSuccess function
  button.classList.add("success")
  setTimeout(() => button.classList.remove("success"), duration)
}

function initializePage() {
  const selectedPlan = localStorage.getItem("selectedPlan")
  if (selectedPlan && planTitles[selectedPlan]) {
    const subtitle = document.getElementById("plan-subtitle")
    subtitle.textContent = `Just tried "${planTitles[selectedPlan]}", how did it feel?`
  }

  // Add card entrance animation
  const cards = document.querySelectorAll(".feedback-card")
  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"

    setTimeout(() => {
      card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, index * 200)
  })

  // Show welcome message
  setTimeout(() => {
    showMessage("Please select your feelings about this experience ✨", "info", 3000)
  }, 1000)
}

function selectFeedback(feedbackType) {
  selectedFeedback = feedbackType

  // Remove all selected states
  document.querySelectorAll(".feedback-card").forEach((card) => {
    card.classList.remove("selected")
  })

  // Add selected state
  const selectedCard = document.querySelector(`[data-feedback="${feedbackType}"]`)
  selectedCard.classList.add("selected")

  // Add selection animation
  selectedCard.style.transform = "scale(1.05)"
  setTimeout(() => {
    selectedCard.style.transform = "scale(1)"
  }, 200)

  // Create ripple effect
  createRippleEffect(selectedCard)

  // Show additional input and submit button
  const additionalNotes = document.getElementById("additional-notes")
  const submitSection = document.getElementById("submit-section")

  additionalNotes.style.display = "block"
  additionalNotes.style.opacity = "0"
  additionalNotes.style.transform = "translateY(20px)"

  setTimeout(() => {
    additionalNotes.style.transition = "all 0.5s ease"
    additionalNotes.style.opacity = "1"
    additionalNotes.style.transform = "translateY(0)"
  }, 100)

  setTimeout(() => {
    submitSection.style.display = "block"
    submitSection.style.opacity = "0"
    submitSection.style.transform = "translateY(20px)"

    setTimeout(() => {
      submitSection.style.transition = "all 0.5s ease"
      submitSection.style.opacity = "1"
      submitSection.style.transform = "translateY(0)"
    }, 100)
  }, 300)

  // Show feedback messages
  const feedbackMessages = {
    love: "Excellent! It looks like you really like this direction 😍",
    neutral: "Good try! We'll recommend more options for you 🤔",
    dislike: "No problem, exploration is about trial and error! Let's try a different direction 🌈",
  }

  showMessage(feedbackMessages[feedbackType], "success", 2500)
}

function validateFeedbackNotes(textarea) {
  const charCount = document.getElementById("feedback-char-count")
  const length = textarea.value.length
  charCount.textContent = `${length} characters`

  if (length > 0) {
    textarea.classList.add("form-field-valid")
  } else {
    textarea.classList.remove("form-field-valid")
  }

  if (length > 300) {
    charCount.style.color = "#ef4444"
    showMessage("Feedback content is a bit long!", "warning", 2000)
  } else {
    charCount.style.color = "#6b7280"
  }
}

function createRippleEffect(element) {
  const ripple = document.createElement("div")
  ripple.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(139, 92, 246, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: feedback-ripple 0.8s ease-out;
    pointer-events: none;
  `

  element.style.position = "relative"
  element.appendChild(ripple)

  setTimeout(() => ripple.remove(), 800)
}

function submitFeedback() {
  if (!selectedFeedback) {
    showMessage("Please select your feelings first", "warning")
    // Make all cards flash to prompt
    document.querySelectorAll(".feedback-card").forEach((card) => {
      card.classList.add("animate-pulse")
      setTimeout(() => card.classList.remove("animate-pulse"), 1000)
    })
    return
  }

  const button = event.target
  const additionalNotes = document.getElementById("feedback-notes").value

  // Button loading state
  setButtonLoading(button, true)

  // Save feedback data
  localStorage.setItem("userFeedback", selectedFeedback)
  localStorage.setItem("feedbackNotes", additionalNotes)

  setTimeout(() => {
    setButtonLoading(button, false)
    setButtonSuccess(button, 1000)

    // Check if this is digital art feedback
    const currentPlan = localStorage.getItem("currentPlan") || ""
    const isDigitalArt = currentPlan.includes("digital") || currentPlan.includes("art")

    if (isDigitalArt) {
      showMessage("Feedback submitted successfully! Redirecting to next steps...", "success")
      // Redirect to next-steps page for digital art
      setTimeout(() => {
        document.body.style.transition = "all 0.3s ease"
        document.body.style.opacity = "0.8"
        document.body.style.transform = "scale(0.95)"

        setTimeout(() => {
          window.location.href = "next-steps.html"
        }, 300)
      }, 1200)
    } else {
      showMessage("Feedback submitted successfully! Generating suggestions...", "success")
      // Original behavior for non-digital art
      setTimeout(() => {
        document.body.style.transition = "all 0.3s ease"
        document.body.style.opacity = "0.8"
        document.body.style.transform = "scale(0.95)"

        setTimeout(() => {
          window.location.href = "recommendations.html"
        }, 300)
      }, 1200)
    }
  }, 1000)
}



function goBack() {
  document.body.style.transition = "all 0.3s ease"
  document.body.style.opacity = "0.8"
  document.body.style.transform = "scale(0.95)"

  setTimeout(() => {
    window.location.href = "execute.html"
  }, 300)
}

// Add feedback ripple animation CSS
const style = document.createElement("style")
style.textContent = `
  @keyframes feedback-ripple {
    0% {
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }
  
  .char-count {
    text-align: right;
    font-size: 12px;
    color: #6b7280;
    margin-top: 4px;
  }
`
document.head.appendChild(style)

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  initializePage()
})
