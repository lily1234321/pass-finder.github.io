let selectedSkill = ""

function showMessage(message, type, duration = 3000) {
  const messageElement = document.createElement("div")
  messageElement.className = `encouragement-message ${type}`
  messageElement.textContent = message
  document.body.appendChild(messageElement)

  setTimeout(() => {
    messageElement.remove()
  }, duration)
}

function selectSkill(skill) {
  // Prevent selection of disabled practitioner option
  if (skill === "practitioner") {
    const disabledCard = document.querySelector('[data-skill="practitioner"]')
    disabledCard.style.transform = "scale(1.05)"
    disabledCard.style.boxShadow = "0 15px 35px rgba(139, 92, 246, 0.3)"
    setTimeout(() => {
      disabledCard.style.transform = "scale(1)"
      disabledCard.style.boxShadow = "0 8px 25px rgba(139, 92, 246, 0.2)"
    }, 300)
    showMessage("Practitioner option is coming soon! 🚧", "info", 3000)
    return
  }

  selectedSkill = skill

  // Remove previous selection
  document.querySelectorAll(".skill-card").forEach((card) => {
    card.classList.remove("selected")
  })

  // Add selection to clicked card
  const selectedCard = document.querySelector(`[data-skill="${skill}"]`)
  selectedCard.classList.add("selected")

  // Add selection animation
  selectedCard.style.transform = "scale(1.02)"
  setTimeout(() => {
    selectedCard.style.transform = "scale(1)"
  }, 200)

  // Show success message
  const skillText = skill === "beginner" ? "Beginner" : "Practitioner"
  showMessage(`Selected: ${skillText} level`, "success", 2000)

  // Show continue button
  const continueBtn = document.getElementById("continue-btn")
  continueBtn.style.display = "block"
  continueBtn.style.opacity = "0"
  continueBtn.style.transform = "translateY(20px)"

  setTimeout(() => {
    continueBtn.style.transition = "all 0.5s ease"
    continueBtn.style.opacity = "1"
    continueBtn.style.transform = "translateY(0)"
  }, 300)
}

function continueToPlan() {
  if (!selectedSkill) {
    showMessage("Please select a skill level first", "warning")
    return
  }

  // Save skill level to localStorage
  localStorage.setItem("digitalArtSkill", selectedSkill)
  localStorage.setItem("currentPlan", "digital-art")

  // Add page transition animation
  document.body.style.transition = "all 0.3s ease"
  document.body.style.opacity = "0.8"
  document.body.style.transform = "scale(0.95)"

  setTimeout(() => {
    // Navigate to appropriate plan based on skill level
    if (selectedSkill === "beginner") {
      window.location.href = "execute.html"
    } else {
      // For practitioner, you could create a different plan or use the same one
      window.location.href = "execute.html"
    }
  }, 300)
}

function goBack() {
  document.body.style.transition = "all 0.3s ease"
  document.body.style.opacity = "0.8"
  document.body.style.transform = "scale(0.95)"

  setTimeout(() => {
    window.location.href = "explore.html"
  }, 300)
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Add entrance animations
  const cards = document.querySelectorAll(".skill-card")
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
    showMessage("Choose your digital art experience level ✨", "info", 3000)
  }, 1000)
}) 