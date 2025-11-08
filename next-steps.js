// Next Steps Page JavaScript

function goBack() {
  document.body.style.transition = "all 0.3s ease";
  document.body.style.opacity = "0.8";
  document.body.style.transform = "scale(0.95)";
  setTimeout(() => {
    // Use browser history to go back to previous page
    if (window.history.length > 1) {
      window.history.back()
    } else {
      // Fallback to feedback.html if no history
      window.location.href = "feedback.html";
    }
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

function goToDeepLearning() {
  // Add selection animation
  const card = event.currentTarget;
  card.style.transform = "scale(1.05)";
  card.style.boxShadow = "0 20px 40px rgba(139, 92, 246, 0.3)";
  
  setTimeout(() => {
    document.body.style.transition = "all 0.3s ease";
    document.body.style.opacity = "0.8";
    document.body.style.transform = "scale(0.95)";
    setTimeout(() => {
      window.location.href = "deep-learning.html";
    }, 300);
  }, 200);
}

function goToArtPlan() {
  // Add selection animation
  const card = event.currentTarget;
  card.style.transform = "scale(1.05)";
  card.style.boxShadow = "0 20px 40px rgba(139, 92, 246, 0.3)";
  
  setTimeout(() => {
    document.body.style.transition = "all 0.3s ease";
    document.body.style.opacity = "0.8";
    document.body.style.transform = "scale(0.95)";
    setTimeout(() => {
      window.location.href = "30-day-art-plan.html";
    }, 300);
  }, 200);
}

function goToVideoTutorials() {
  // Add selection animation
  const card = event.currentTarget;
  card.style.transform = "scale(1.05)";
  card.style.boxShadow = "0 20px 40px rgba(139, 92, 246, 0.3)";
  
  setTimeout(() => {
    document.body.style.transition = "all 0.3s ease";
    document.body.style.opacity = "0.8";
    document.body.style.transform = "scale(0.95)";
    setTimeout(() => {
      window.location.href = "video-tutorials.html";
    }, 300);
  }, 200);
}

function goToCommunity() {
  // Add selection animation
  const card = event.currentTarget;
  card.style.transform = "scale(1.05)";
  card.style.boxShadow = "0 20px 40px rgba(139, 92, 246, 0.3)";
  
  setTimeout(() => {
    document.body.style.transition = "all 0.3s ease";
    document.body.style.opacity = "0.8";
    document.body.style.transform = "scale(0.95)";
    setTimeout(() => {
      window.location.href = "community-chat.html";
    }, 300);
  }, 200);
}

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
    messageElement.style.background = 'linear-gradient(135deg, #8b5cf6, #7c3aed)';
  }
  
  document.body.appendChild(messageElement);
  
  setTimeout(() => {
    messageElement.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(messageElement);
    }, 300);
  }, duration);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Add entrance animations
  const cards = document.querySelectorAll('.next-step-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200);
  });
  
  // Show welcome message
  setTimeout(() => {
    showMessage('Welcome to your next steps! 🎉', 'success', 2000);
  }, 1000);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    goBack();
  }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style); 