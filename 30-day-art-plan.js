// 30-Day Art Plan functionality
let completedChallenges = [];
let inProgressChallenges = [];
let currentStreak = 0;
let lastCompletedDate = null;

// Initialize the plan
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    updateProgressDisplay();
    initializeChallenges();
    showWelcomeMessage();
});

function loadProgress() {
    const saved = localStorage.getItem('artPlanProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        completedChallenges = progress.completed || [];
        inProgressChallenges = progress.inProgress || [];
        currentStreak = progress.streak || 0;
        lastCompletedDate = progress.lastCompletedDate || null;
    }
}

function saveProgress() {
    const progress = {
        completed: completedChallenges,
        inProgress: inProgressChallenges,
        streak: currentStreak,
        lastCompletedDate: lastCompletedDate
    };
    localStorage.setItem('artPlanProgress', JSON.stringify(progress));
}

function updateProgressDisplay() {
    const totalChallenges = 30;
    const completed = completedChallenges.length;
    const percentage = Math.round((completed / totalChallenges) * 100);
    
    // Update progress bar
    document.getElementById('progress-percentage').textContent = `${percentage}%`;
    document.getElementById('progress-fill').style.width = `${percentage}%`;
    
    // Update stats
    document.getElementById('completed-days').textContent = completed;
    document.getElementById('remaining-days').textContent = totalChallenges - completed;
    document.getElementById('current-streak').textContent = currentStreak;
    
    // Update challenge statuses
    updateChallengeStatuses();
}

function updateChallengeStatuses() {
    for (let i = 1; i <= 30; i++) {
        const statusElement = document.getElementById(`status-${i}`);
        const challengeCard = document.querySelector(`[data-day="${i}"]`);
        
        if (completedChallenges.includes(i)) {
            statusElement.textContent = '✅';
            challengeCard.classList.add('completed');
            challengeCard.classList.remove('in-progress');
        } else if (inProgressChallenges.includes(i)) {
            statusElement.textContent = '🔄';
            challengeCard.classList.add('in-progress');
            challengeCard.classList.remove('completed');
        } else {
            statusElement.textContent = '⏳';
            challengeCard.classList.remove('completed', 'in-progress');
        }
    }
}

function initializeChallenges() {
    // Add click handlers for all challenge cards
    for (let i = 1; i <= 30; i++) {
        const challengeCard = document.querySelector(`[data-day="${i}"]`);
        if (challengeCard) {
            challengeCard.addEventListener('click', (e) => {
                if (!e.target.closest('.challenge-actions')) {
                    toggleChallenge(i);
                }
            });
        }
    }
}

function toggleChallenge(dayNumber) {
    const actionsElement = document.getElementById(`actions-${dayNumber}`);
    const isVisible = actionsElement.style.display === 'block';
    
    // Hide all other action menus
    document.querySelectorAll('.challenge-actions').forEach(actions => {
        actions.style.display = 'none';
    });
    
    // Toggle current action menu
    actionsElement.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
        showMessage(`Day ${dayNumber} challenge selected`, 'info', 1500);
    }
}

function startChallenge(dayNumber) {
    if (!inProgressChallenges.includes(dayNumber)) {
        inProgressChallenges.push(dayNumber);
        saveProgress();
        updateProgressDisplay();
        showMessage(`Started Day ${dayNumber} challenge! 🎨`, 'success', 2000);
    }
    
    // Hide action menu
    document.getElementById(`actions-${dayNumber}`).style.display = 'none';
}

function completeChallenge(dayNumber) {
    const today = new Date().toDateString();
    
    if (!completedChallenges.includes(dayNumber)) {
        completedChallenges.push(dayNumber);
        
        // Remove from in-progress if it was there
        const inProgressIndex = inProgressChallenges.indexOf(dayNumber);
        if (inProgressIndex > -1) {
            inProgressChallenges.splice(inProgressIndex, 1);
        }
        
        // Update streak
        if (lastCompletedDate === today) {
            // Already completed something today, don't increase streak
        } else if (lastCompletedDate === getYesterday()) {
            // Consecutive day
            currentStreak++;
        } else {
            // New streak
            currentStreak = 1;
        }
        
        lastCompletedDate = today;
        saveProgress();
        updateProgressDisplay();
        
        // Show celebration
        showCompletionCelebration(dayNumber);
        
        // Check for milestones
        checkMilestones();
    }
    
    // Hide action menu
    document.getElementById(`actions-${dayNumber}`).style.display = 'none';
}

function getYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toDateString();
}

function showCompletionCelebration(dayNumber) {
    const messages = [
        `Amazing! Day ${dayNumber} completed! 🎉`,
        `You're building great habits! Day ${dayNumber} done! ✨`,
        `Fantastic progress! Day ${dayNumber} finished! 🎨`,
        `Keep going! Day ${dayNumber} completed! 💪`,
        `You're on fire! Day ${dayNumber} done! 🔥`
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showMessage(randomMessage, 'success', 3000);
    
    // Add confetti animation
    createConfetti();
}

function checkMilestones() {
    const completed = completedChallenges.length;
    
    if (completed === 7) {
        showMessage('🎉 Week 1 complete! You\'re building a solid foundation!', 'success', 4000);
    } else if (completed === 14) {
        showMessage('🎉 Week 2 complete! Your shading skills are improving!', 'success', 4000);
    } else if (completed === 21) {
        showMessage('🎉 Week 3 complete! Your color theory is getting stronger!', 'success', 4000);
    } else if (completed === 28) {
        showMessage('🎉 Week 4 complete! You\'re mastering advanced techniques!', 'success', 4000);
    } else if (completed === 30) {
        showMessage('🎉 CONGRATULATIONS! You\'ve completed the entire 30-day challenge! You\'re now a digital artist!', 'success', 5000);
        showFinalCelebration();
    }
}

function createConfetti() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                width: 8px;
                height: 8px;
                background: ${['#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)]};
                border-radius: 50%;
                animation: confetti-fall 3s ease-out forwards;
                pointer-events: none;
                z-index: 1000;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
}

function showFinalCelebration() {
    // Create a special celebration for completing all 30 days
    setTimeout(() => {
        showMessage('🌟 You\'ve transformed from beginner to artist! 🌟', 'success', 6000);
    }, 1000);
    
    setTimeout(() => {
        showMessage('🎨 Your artistic journey has just begun! 🎨', 'success', 6000);
    }, 2000);
}

function showWelcomeMessage() {
    setTimeout(() => {
        if (completedChallenges.length === 0) {
            showMessage('Welcome to your 30-day digital art journey! 🎨', 'info', 3000);
        } else {
            showMessage(`Welcome back! You've completed ${completedChallenges.length} days so far! 💪`, 'info', 3000);
        }
    }, 1000);
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

// Add confetti animation CSS
const style = document.createElement('style');
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
            case 'r':
                e.preventDefault();
                resetProgress();
                break;
            case 's':
                e.preventDefault();
                saveProgress();
                showMessage('Progress saved! 💾', 'success', 1500);
                break;
        }
    }
});

function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        completedChallenges = [];
        inProgressChallenges = [];
        currentStreak = 0;
        lastCompletedDate = null;
        saveProgress();
        updateProgressDisplay();
        showMessage('Progress reset! Starting fresh! 🆕', 'info', 2000);
    }
}

// Auto-save progress every 5 minutes
setInterval(() => {
    saveProgress();
}, 300000);

// Check for streak reset (if user hasn't completed anything in 2 days)
setInterval(() => {
    if (lastCompletedDate) {
        const lastCompleted = new Date(lastCompletedDate);
        const today = new Date();
        const diffTime = Math.abs(today - lastCompleted);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 2 && currentStreak > 0) {
            currentStreak = 0;
            saveProgress();
            updateProgressDisplay();
            showMessage('Streak reset - time to get back to creating! 💪', 'info', 3000);
        }
    }
}, 86400000); // Check once per day 