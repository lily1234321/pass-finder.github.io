let selectedAge = ""
const selectedFeelings = []

function goBack() {
  // Add page transition animation
  document.body.style.opacity = "0.8"
  document.body.style.transform = "scale(0.95)"

  setTimeout(() => {
    window.location.href = "index.html"
  }, 200)
}

// Step 1: Age Selection
function selectAge(age) {
  // Only allow college student selection
  if (age === "high-school") {
    // Add visual feedback for disabled card
    const disabledCard = document.querySelector('[data-age="high-school"]')
    disabledCard.style.transform = "scale(1.05)"
    disabledCard.style.boxShadow = "0 15px 35px rgba(139, 92, 246, 0.3)"
    
    setTimeout(() => {
      disabledCard.style.transform = "scale(1)"
      disabledCard.style.boxShadow = "0 8px 25px rgba(139, 92, 246, 0.2)"
    }, 300)
    
    showMessage("High School Student option is coming soon! 🚧", "info", 3000)
    return
  }

  selectedAge = age

  // Remove previous selection state
  document.querySelectorAll(".age-card").forEach((card) => {
    card.classList.remove("selected")
  })

  // Add selection state and animation
  const selectedCard = document.querySelector(`[data-age="${age}"]`)
  selectedCard.classList.add("selected")

  // Add success animation
  selectedCard.style.transform = "scale(1.05)"
  setTimeout(() => {
    selectedCard.style.transform = "scale(1)"
  }, 200)

  // Show success message
  const ageText = age === "high-school" ? "High School Student" : "College Student"
  showMessage(`Selected: ${ageText}`, "success", 2000)

  // Show next step button with animation
  const nextBtn = document.getElementById("next-step-1")
  nextBtn.style.display = "block"
  nextBtn.style.opacity = "0"
  nextBtn.style.transform = "translateY(20px)"

  setTimeout(() => {
    nextBtn.style.transition = "all 0.5s ease"
    nextBtn.style.opacity = "1"
    nextBtn.style.transform = "translateY(0)"
  }, 300)
}

function goToStep1() {
  // Add transition animation
  const step2 = document.getElementById("step-2")
  const step1 = document.getElementById("step-1")

  step2.style.transform = "translateX(100%)"
  step2.style.opacity = "0"

  setTimeout(() => {
    step2.classList.remove("active")
    step1.classList.add("active")
    step1.style.transform = "translateX(-100%)"
    step1.style.opacity = "0"

    setTimeout(() => {
      step1.style.transition = "all 0.5s ease"
      step1.style.transform = "translateX(0)"
      step1.style.opacity = "1"
    }, 50)
  }, 250)
}

function goToStep2() {
  if (!selectedAge) {
    showMessage("Please select your stage first", "warning")
    // Make unselected cards shake to prompt
    document.querySelectorAll(".age-card:not(.selected)").forEach((card) => {
      card.classList.add("animate-shake")
      setTimeout(() => card.classList.remove("animate-shake"), 500)
    })
    return
  }

  // Button loading state
  const button = event.target
  setButtonLoading(button, true)

  setTimeout(() => {
    setButtonLoading(button, false)

    // Page transition animation
    const step1 = document.getElementById("step-1")
    const step2 = document.getElementById("step-2")

    step1.style.transform = "translateX(-100%)"
    step1.style.opacity = "0"

    setTimeout(() => {
      step1.classList.remove("active")
      step2.classList.add("active")
      step2.style.transform = "translateX(100%)"
      step2.style.opacity = "0"

      setTimeout(() => {
        step2.style.transition = "all 0.5s ease"
        step2.style.transform = "translateX(0)"
        step2.style.opacity = "1"
      }, 50)
    }, 250)

    showMessage("Entering step 2: Understanding your feelings", "info")
  }, 800)
}

// Step 2: Feelings Selection
function toggleFeeling(feeling) {
  const card = document.querySelector(`[data-feeling="${feeling}"]`)
  const index = selectedFeelings.indexOf(feeling)

  if (index > -1) {
    // Remove feeling
    selectedFeelings.splice(index, 1)
    card.classList.remove("selected")

    // Remove animation
    card.style.transform = "scale(0.95)"
    setTimeout(() => {
      card.style.transform = "scale(1)"
    }, 150)
  } else {
    // Add feeling
    selectedFeelings.push(feeling)
    card.classList.add("selected")

    // Selection animation
    card.style.transform = "scale(1.05)"
    setTimeout(() => {
      card.style.transform = "scale(1)"
    }, 200)

    // Create ripple effect
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
      animation: ripple-expand 0.6s ease-out;
      pointer-events: none;
    `

    card.style.position = "relative"
    card.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  }

  // Update next step button state
  const nextBtn = document.getElementById("next-step-2")
  if (selectedFeelings.length > 0) {
    nextBtn.style.display = "block"
    nextBtn.style.opacity = "0"
    nextBtn.style.transform = "translateY(20px)"

    setTimeout(() => {
      nextBtn.style.transition = "all 0.5s ease"
      nextBtn.style.opacity = "1"
      nextBtn.style.transform = "translateY(0)"
    }, 100)

    showMessage(`Selected ${selectedFeelings.length} feelings`, "success", 1500)
  } else {
    nextBtn.style.opacity = "0"
    nextBtn.style.transform = "translateY(20px)"
    setTimeout(() => {
      nextBtn.style.display = "none"
    }, 300)
  }
}

function completeStageSelection() {
  if (selectedFeelings.length === 0) {
    showMessage("Please select at least one feeling", "warning")
    // Make all feeling cards flash to prompt
    document.querySelectorAll(".feeling-card").forEach((card) => {
      card.classList.add("animate-pulse")
      setTimeout(() => card.classList.remove("animate-pulse"), 1000)
    })
    return
  }

  // Button loading and success state
  const button = event.target
  setButtonLoading(button, true)

  // Save data
  const stageData = {
    age: selectedAge,
    feelings: selectedFeelings,
    timestamp: new Date().toISOString(),
  }

  localStorage.setItem("stageData", JSON.stringify(stageData))

  setTimeout(() => {
    setButtonLoading(button, false)
    setButtonSuccess(button, 1000)

    showMessage("Stage information saved successfully!", "success")

    // Page transition animation
    setTimeout(() => {
      document.body.style.opacity = "0.8"
      document.body.style.transform = "scale(0.95)"

      setTimeout(() => {
        window.location.href = "questionnaire.html"
      }, 300)
    }, 1200)
  }, 1000)
}

// Add ripple animation CSS
const style = document.createElement("style")
style.textContent = `
  @keyframes ripple-expand {
    0% {
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      width: 200px;
      height: 200px;
      opacity: 0;
    }
  }
`
document.head.appendChild(style)

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Show first step
  document.getElementById("step-1").classList.add("active")

  // Welcome message
  setTimeout(() => {
    showMessage("Welcome to Gentle Exploration! Let's start getting to know you ✨", "info", 3000)
  }, 1000)
})

// Declare showMessage, setButtonLoading, and setButtonSuccess functions
function showMessage(message, type, duration) {
  // Implementation for showMessage
  console.log(`Message: ${message}, Type: ${type}, Duration: ${duration}`)
}

function setButtonLoading(button, isLoading) {
  // Implementation for setButtonLoading
  button.disabled = isLoading
  button.textContent = isLoading ? "Loading..." : "Next"
}

function setButtonSuccess(button, duration) {
  // Implementation for setButtonSuccess
  button.style.backgroundColor = "green"
  setTimeout(() => {
    button.style.backgroundColor = ""
  }, duration)
}
