const planTitles = {
  "digital-art": "Digital Art",
  expression: "Expression Skills",
  "emotion-awareness": "Emotional Awareness",
  "creative-vlog": "Creative Exploration",
  writing: "Written Expression",
}

const planEmojis = {
  "digital-art": "🎨",
  expression: "🎤",
  "emotion-awareness": "🧠",
  "creative-vlog": "🎬",
  writing: "✍️",
}

const feedbackLabels = {
  love: "Liked",
  neutral: "Neutral",
  dislike: "Disliked",
}

// Mock history data
const mockHistory = [
  {
    id: 1,
    date: "2024-01-15",
    plan: "digital-art",
    feedback: "love",
    notes: "Very interesting! Drawing makes me very relaxed",
    completed: true,
  },
  {
    id: 2,
    date: "2024-01-12",
    plan: "emotion-awareness",
    feedback: "neutral",
    notes: "Not bad, but needs more practice",
    completed: true,
  },
  {
    id: 3,
    date: "2024-01-10",
    plan: "expression",
    feedback: "dislike",
    notes: "A bit nervous, may not be suitable for me",
    completed: false,
  },
]

function loadHistory() {
  const history = [...mockHistory]

  // Add current session to history
  const selectedPlan = localStorage.getItem("selectedPlan")
  const userFeedback = localStorage.getItem("userFeedback")
  const planCompleted = localStorage.getItem("planCompleted")
  const feedbackNotes = localStorage.getItem("feedbackNotes")

  if (selectedPlan && userFeedback) {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      plan: selectedPlan,
      feedback: userFeedback,
      notes: feedbackNotes || "",
      completed: planCompleted === "true",
    }

    history.unshift(newEntry)
  }

  // Generate interest map
  generateInterestMap(history)

  // Generate history list
  generateHistoryList(history)
}

function generateInterestMap(history) {
  const interests = {
    loved: [],
    neutral: [],
    disliked: [],
  }

  history.forEach((item) => {
    const planTitle = planTitles[item.plan] || item.plan
    if (item.feedback === "love") {
      interests.loved.push(planTitle)
    } else if (item.feedback === "neutral") {
      interests.neutral.push(planTitle)
    } else if (item.feedback === "dislike") {
      interests.disliked.push(planTitle)
    }
  })

  // Update DOM
  updateInterestTags("loved-interests", interests.loved, "love")
  updateInterestTags("neutral-interests", interests.neutral, "neutral")
  updateInterestTags("disliked-interests", interests.disliked, "dislike")
}

function updateInterestTags(containerId, items, type) {
  const container = document.getElementById(containerId)

  if (items.length === 0) {
    container.innerHTML = '<span class="no-data">No data yet</span>'
    return
  }

  container.innerHTML = items.map((item) => `<span class="interest-tag ${type}">${item}</span>`).join("")
}

function generateHistoryList(history) {
  const historyList = document.getElementById("history-list")

  if (history.length === 0) {
    historyList.innerHTML = '<p class="no-data">No exploration records yet</p>'
    return
  }

  historyList.innerHTML = history
    .map((item) => {
      const planTitle = planTitles[item.plan] || item.plan
      const planEmoji = planEmojis[item.plan] || "✨"
      const feedbackLabel = feedbackLabels[item.feedback] || item.feedback

      return `
            <div class="history-item">
                <div class="history-emoji">${planEmoji}</div>
                <div class="history-content">
                    <div class="history-header">
                        <h3 class="history-title">${planTitle}</h3>
                        <span class="feedback-badge ${item.feedback}">
                            ${getFeedbackIcon(item.feedback)} ${feedbackLabel}
                        </span>
                        ${item.completed ? '<span class="completed-badge">Completed</span>' : ""}
                    </div>
                    ${item.notes ? `<p class="history-notes">"${item.notes}"</p>` : ""}
                    <div class="history-date">
                        <span>📅</span>
                        <span>${formatDate(item.date)}</span>
                    </div>
                </div>
            </div>
        `
    })
    .join("")
}

function getFeedbackIcon(feedback) {
  const icons = {
    love: "💖",
    neutral: "🤔",
    dislike: "🙁",
  }
  return icons[feedback] || "❓"
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function startNewExploration() {
  window.location.href = "explore.html"
}

function goBack() {
  window.location.href = "recommendations.html"
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadHistory()
})
