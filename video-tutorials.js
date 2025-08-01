// Video Tutorials functionality

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    showWelcomeMessage();
    initializeAnimations();
});

function showWelcomeMessage() {
    setTimeout(() => {
        showMessage('Welcome to Digital Art Video Tutorials! 🎨', 'info', 3000);
    }, 1000);
}

function initializeAnimations() {
    // Add entrance animations to cards
    const cards = document.querySelectorAll('.category-card, .tutorial-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function showTutorials(category) {
    const categoryNames = {
        'beginner': 'Beginner',
        'intermediate': 'Intermediate', 
        'advanced': 'Advanced',
        'specialized': 'Specialized Skills'
    };
    
    showMessage(`Loading ${categoryNames[category]} tutorials...`, 'info', 2000);
    
    // Here you would implement the tutorial listing functionality
    // For now, we'll just show a message
    setTimeout(() => {
        showMessage(`${categoryNames[category]} tutorials coming soon! 📚`, 'success', 3000);
    }, 2000);
}

function playVideo(tutorialId) {
    const tutorialNames = {
        'tutorial1': 'Digital Art Basics: Getting Started',
        'tutorial2': 'Color Theory for Digital Artists',
        'tutorial3': 'Character Design Fundamentals'
    };
    
    showMessage(`Playing: ${tutorialNames[tutorialId]} 🎥`, 'success', 2000);
    
    // Here you would implement video player functionality
    // For now, we'll just show a message
    setTimeout(() => {
        showMessage('Video player coming soon! 🎬', 'info', 3000);
    }, 2000);
}

function startLearning() {
    showMessage('Starting your learning journey! 🚀', 'success', 2000);
    
    // Here you would implement the learning path functionality
    setTimeout(() => {
        showMessage('Learning path feature coming soon! 📖', 'info', 3000);
    }, 2000);
}

function goBack() {
    document.body.style.transition = "all 0.3s ease";
    document.body.style.opacity = "0.8";
    document.body.style.transform = "scale(0.95)";

    setTimeout(() => {
        window.location.href = "feedback.html";
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

function toggleMenu() {
    showMessage('Menu feature coming soon! ☰', 'info', 2000);
}

function showMessage(message, type = 'info', duration = 3000) {
    const messageElement = document.createElement('div');
    messageElement.className = `encouragement-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#8b5cf6'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideInDown 0.3s ease;
    `;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.style.animation = 'slideOutUp 0.3s ease';
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    }, duration);
}

// Add animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideOutUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
    
    .encouragement-message {
        font-family: inherit;
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'b':
                e.preventDefault();
                showTutorials('beginner');
                break;
            case 'i':
                e.preventDefault();
                showTutorials('intermediate');
                break;
            case 'a':
                e.preventDefault();
                showTutorials('advanced');
                break;
            case 's':
                e.preventDefault();
                showTutorials('specialized');
                break;
        }
    }
});

// Track tutorial interactions
function trackTutorialInteraction(action, tutorialId) {
    // Here you would implement analytics tracking
    console.log(`Tutorial interaction: ${action} - ${tutorialId}`);
}

// Auto-save user preferences
function saveUserPreferences() {
    const preferences = {
        lastVisited: new Date().toISOString(),
        preferredCategory: localStorage.getItem('preferredCategory') || 'beginner'
    };
    localStorage.setItem('tutorialPreferences', JSON.stringify(preferences));
}

// Load user preferences
function loadUserPreferences() {
    const saved = localStorage.getItem('tutorialPreferences');
    if (saved) {
        const preferences = JSON.parse(saved);
        // Here you could implement personalized recommendations
        console.log('Loaded user preferences:', preferences);
    }
}

// Initialize preferences
document.addEventListener('DOMContentLoaded', () => {
    loadUserPreferences();
});

// Save preferences when user interacts
document.addEventListener('click', (e) => {
    if (e.target.closest('.category-card')) {
        const category = e.target.closest('.category-card').getAttribute('onclick').match(/'([^']+)'/)[1];
        localStorage.setItem('preferredCategory', category);
        saveUserPreferences();
    }
}); 