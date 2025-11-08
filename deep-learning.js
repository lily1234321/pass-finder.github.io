// Deep Learning functionality

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    showWelcomeMessage();
    initializeAnimations();
});

function showWelcomeMessage() {
    setTimeout(() => {
        showMessage('Welcome to AI-Powered Digital Art! 🧠', 'info', 3000);
    }, 1000);
}

function initializeAnimations() {
    // Add entrance animations to cards
    const cards = document.querySelectorAll('.category-card, .tool-card');
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

function showAITools(category) {
    const categoryNames = {
        'generative': 'Generative AI Art',
        'enhancement': 'AI Enhancement', 
        'style': 'Style Transfer',
        'collaboration': 'AI Collaboration'
    };
    
    showMessage(`Loading ${categoryNames[category]} tools...`, 'info', 2000);
    
    // Here you would implement the AI tools listing functionality
    // For now, we'll just show a message
    setTimeout(() => {
        showMessage(`${categoryNames[category]} tools coming soon! 🤖`, 'success', 3000);
    }, 2000);
}

function exploreTool(toolId) {
    const toolNames = {
        'midjourney': 'Midjourney',
        'dalle': 'DALL-E 3',
        'stable-diffusion': 'Stable Diffusion'
    };
    
    showMessage(`Exploring: ${toolNames[toolId]} 🎨`, 'success', 2000);
    
    // Here you would implement tool exploration functionality
    // For now, we'll just show a message
    setTimeout(() => {
        showMessage(`${toolNames[toolId]} tutorial coming soon! 📚`, 'info', 3000);
    }, 2000);
}

function startAILearning() {
    showMessage('Starting your AI learning journey! 🚀', 'success', 2000);
    
    // Here you would implement the AI learning path functionality
    setTimeout(() => {
        showMessage('AI learning path feature coming soon! 📖', 'info', 3000);
    }, 2000);
}

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
            case 'g':
                e.preventDefault();
                showAITools('generative');
                break;
            case 'e':
                e.preventDefault();
                showAITools('enhancement');
                break;
            case 's':
                e.preventDefault();
                showAITools('style');
                break;
            case 'c':
                e.preventDefault();
                showAITools('collaboration');
                break;
        }
    }
});

// Track AI tool interactions
function trackAIToolInteraction(action, toolId) {
    // Here you would implement analytics tracking
    console.log(`AI tool interaction: ${action} - ${toolId}`);
}

// Auto-save user preferences
function saveUserPreferences() {
    const preferences = {
        lastVisited: new Date().toISOString(),
        preferredCategory: localStorage.getItem('preferredAICategory') || 'generative'
    };
    localStorage.setItem('aiToolPreferences', JSON.stringify(preferences));
}

// Load user preferences
function loadUserPreferences() {
    const saved = localStorage.getItem('aiToolPreferences');
    if (saved) {
        const preferences = JSON.parse(saved);
        // Here you could implement personalized recommendations
        console.log('Loaded AI tool preferences:', preferences);
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
        localStorage.setItem('preferredAICategory', category);
        saveUserPreferences();
    }
});

// AI Ethics reminder
function showEthicsReminder() {
    setTimeout(() => {
        showMessage('Remember to use AI tools ethically and responsibly! 🤖', 'info', 4000);
    }, 5000);
}

// Initialize ethics reminder
document.addEventListener('DOMContentLoaded', () => {
    showEthicsReminder();
}); 