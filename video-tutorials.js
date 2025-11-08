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

function showTutorialSections(tutorialId) {
    const tutorialNames = {
        'tutorial1': 'Digital Art Basics: Getting Started',
        'tutorial2': 'Color Theory for Digital Artists',
        'tutorial3': 'Character Design Fundamentals'
    };
    
    // Update modal title
    document.getElementById('modalTutorialTitle').textContent = tutorialNames[tutorialId];
    
    // Store current tutorial ID for section playback
    window.currentTutorialId = tutorialId;
    
    // Show modal with animation
    const modal = document.getElementById('tutorialSectionsModal');
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '1';
    }, 10);
    
    showMessage(`Opening sections for: ${tutorialNames[tutorialId]} 📚`, 'info', 2000);
}

function closeTutorialSections() {
    const modal = document.getElementById('tutorialSectionsModal');
    modal.style.transition = 'opacity 0.3s ease';
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function playVideoSection(sectionType) {
    const sectionNames = {
        'color': 'Color Techniques',
        'line': 'Line Work & Sketching'
    };
    
    const tutorialNames = {
        'tutorial1': 'Digital Art Basics',
        'tutorial2': 'Color Theory',
        'tutorial3': 'Character Design'
    };
    
    const currentTutorial = window.currentTutorialId || 'tutorial1';
    const tutorialName = tutorialNames[currentTutorial];
    const sectionName = sectionNames[sectionType];
    
    // Close modal first
    closeTutorialSections();
    
    // Show loading message
    showMessage(`Loading ${sectionName} section...`, 'info', 2000);
    
    // Simulate video loading
    setTimeout(() => {
        showMessage(`Playing: ${tutorialName} - ${sectionName} 🎥`, 'success', 3000);
        
        // Track the interaction
        trackTutorialInteraction('play_section', `${currentTutorial}_${sectionType}`);
        
        // Here you would implement actual video player functionality
        setTimeout(() => {
            showMessage('Video player feature coming soon! 🎬', 'info', 3000);
        }, 2000);
    }, 1000);
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

// Global variables to track current category and section
let currentCategory = '';
let currentSection = '';

// Video data structure
const videoData = {
    beginner: {
        color: [
            { id: 'b_color_crystal_cake', title: '水晶蛋糕插画教程 - 零基础绘画教学', duration: '30 min', difficulty: '🟢 Beginner', description: '暑假带练30天！超详细绘画教程，零基础教你插画食物（水晶蛋糕）', videoUrl: 'https://www.bilibili.com/video/BV11Q8DzyE4Q/?share_source=copy_web', cover: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=240&fit=crop&crop=center' },
            { id: 'b_color_1', title: 'Color Theory Basics', duration: '8 min', difficulty: '🟢 Beginner', description: 'Learn the fundamentals of color theory', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1267?w=400&h=240&fit=crop&crop=center' },
            { id: 'b_color_2', title: 'Color Mixing Techniques', duration: '10 min', difficulty: '🟢 Beginner', description: 'Master digital color mixing', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop&crop=center' },
            { id: 'b_color_3', title: 'Color Harmony', duration: '12 min', difficulty: '🟢 Beginner', description: 'Create beautiful color combinations', cover: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=240&fit=crop&crop=center' },
            { id: 'b_color_4', title: 'Color Psychology', duration: '9 min', difficulty: '🟢 Beginner', description: 'Understand how colors affect emotions', cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop&crop=center' },
            { id: 'b_color_5', title: 'Digital Painting Basics', duration: '15 min', difficulty: '🟢 Beginner', description: 'Start your digital painting journey', cover: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=240&fit=crop&crop=center' },
            { id: 'b_color_6', title: 'Color Gradients', duration: '11 min', difficulty: '🟢 Beginner', description: 'Create smooth color transitions', cover: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=240&fit=crop&crop=center' }
        ],
        line: [
            { id: 'b_line_1', title: 'Basic Line Drawing', duration: '7 min', difficulty: '🟢 Beginner', description: 'Learn fundamental line techniques', cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=240&fit=crop&crop=center' },
            { id: 'b_line_2', title: 'Sketching Fundamentals', duration: '9 min', difficulty: '🟢 Beginner', description: 'Master basic sketching skills', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1267?w=400&h=240&fit=crop&crop=center' },
            { id: 'b_line_3', title: 'Line Quality', duration: '8 min', difficulty: '🟢 Beginner', description: 'Improve your line work', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop&crop=center' },
            { id: 'b_line_4', title: 'Basic Shapes', duration: '6 min', difficulty: '🟢 Beginner', description: 'Draw basic geometric shapes', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop&crop=center' },
            { id: 'b_line_5', title: 'Contour Drawing', duration: '10 min', difficulty: '🟢 Beginner', description: 'Learn contour drawing techniques', cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=240&fit=crop&crop=center' },
            { id: 'b_line_6', title: 'Line Art Basics', duration: '12 min', difficulty: '🟢 Beginner', description: 'Create clean line art', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop&crop=center' }
        ]
    },
    intermediate: {
        color: [
            { id: 'i_color_1', title: 'Advanced Color Theory', duration: '15 min', difficulty: '🟡 Intermediate', description: 'Deep dive into color theory', cover: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=240&fit=crop&crop=center' },
            { id: 'i_color_2', title: 'Color Grading', duration: '18 min', difficulty: '🟡 Intermediate', description: 'Professional color grading techniques', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop&crop=center' },
            { id: 'i_color_3', title: 'Color Palettes', duration: '12 min', difficulty: '🟡 Intermediate', description: 'Create custom color palettes', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1267?w=400&h=240&fit=crop&crop=center' },
            { id: 'i_color_4', title: 'Lighting and Color', duration: '20 min', difficulty: '🟡 Intermediate', description: 'How light affects color', cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop&crop=center' },
            { id: 'i_color_5', title: 'Digital Painting Advanced', duration: '25 min', difficulty: '🟡 Intermediate', description: 'Advanced painting techniques', cover: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=240&fit=crop&crop=center' },
            { id: 'i_color_6', title: 'Color Composition', duration: '16 min', difficulty: '🟡 Intermediate', description: 'Compose with color effectively', cover: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=240&fit=crop&crop=center' }
        ],
        line: [
            { id: 'i_line_1', title: 'Advanced Sketching', duration: '14 min', difficulty: '🟡 Intermediate', description: 'Advanced sketching techniques', cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=240&fit=crop&crop=center' },
            { id: 'i_line_2', title: 'Line Weight', duration: '11 min', difficulty: '🟡 Intermediate', description: 'Master line weight variations', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop&crop=center' },
            { id: 'i_line_3', title: 'Gesture Drawing', duration: '13 min', difficulty: '🟡 Intermediate', description: 'Dynamic gesture drawing', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1267?w=400&h=240&fit=crop&crop=center' },
            { id: 'i_line_4', title: 'Perspective Lines', duration: '17 min', difficulty: '🟡 Intermediate', description: 'Perspective drawing techniques', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop&crop=center' },
            { id: 'i_line_5', title: 'Character Line Art', duration: '19 min', difficulty: '🟡 Intermediate', description: 'Character line art techniques', cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=240&fit=crop&crop=center' },
            { id: 'i_line_6', title: 'Inking Techniques', duration: '15 min', difficulty: '🟡 Intermediate', description: 'Professional inking methods', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop&crop=center' }
        ]
    },
    advanced: {
        color: [
            { id: 'a_color_1', title: 'Master Color Theory', duration: '25 min', difficulty: '🔴 Advanced', description: 'Expert-level color theory', cover: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=240&fit=crop&crop=center' },
            { id: 'a_color_2', title: 'Color Psychology Advanced', duration: '22 min', difficulty: '🔴 Advanced', description: 'Advanced color psychology', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop&crop=center' },
            { id: 'a_color_3', title: 'Color Grading Mastery', duration: '30 min', difficulty: '🔴 Advanced', description: 'Professional color grading', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1267?w=400&h=240&fit=crop&crop=center' },
            { id: 'a_color_4', title: 'Color Harmony Mastery', duration: '28 min', difficulty: '🔴 Advanced', description: 'Advanced color harmony', cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop&crop=center' },
            { id: 'a_color_5', title: 'Digital Painting Mastery', duration: '35 min', difficulty: '🔴 Advanced', description: 'Master-level painting', cover: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=240&fit=crop&crop=center' },
            { id: 'a_color_6', title: 'Color Composition Mastery', duration: '32 min', difficulty: '🔴 Advanced', description: 'Expert color composition', cover: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=240&fit=crop&crop=center' }
        ],
        line: [
            { id: 'a_line_1', title: 'Master Line Art', duration: '20 min', difficulty: '🔴 Advanced', description: 'Expert line art techniques', cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=240&fit=crop&crop=center' },
            { id: 'a_line_2', title: 'Advanced Gesture', duration: '18 min', difficulty: '🔴 Advanced', description: 'Master gesture drawing', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop&crop=center' },
            { id: 'a_line_3', title: 'Complex Perspective', duration: '25 min', difficulty: '🔴 Advanced', description: 'Complex perspective drawing', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1267?w=400&h=240&fit=crop&crop=center' },
            { id: 'a_line_4', title: 'Character Design Lines', duration: '28 min', difficulty: '🔴 Advanced', description: 'Advanced character line work', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop&crop=center' },
            { id: 'a_line_5', title: 'Master Inking', duration: '22 min', difficulty: '🔴 Advanced', description: 'Professional inking mastery', cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=240&fit=crop&crop=center' },
            { id: 'a_line_6', title: 'Line Art Mastery', duration: '30 min', difficulty: '🔴 Advanced', description: 'Expert line art creation', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop&crop=center' }
        ]
    },
    specialized: {
        color: [
            { id: 's_color_1', title: 'Character Color Design', duration: '30 min', difficulty: '🎯 Specialized', description: 'Character color design techniques', cover: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=240&fit=crop&crop=center' },
            { id: 's_color_2', title: 'Landscape Color Mastery', duration: '35 min', difficulty: '🎯 Specialized', description: 'Landscape color techniques', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop&crop=center' },
            { id: 's_color_3', title: 'Portrait Color Theory', duration: '28 min', difficulty: '🎯 Specialized', description: 'Portrait color mastery', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1267?w=400&h=240&fit=crop&crop=center' },
            { id: 's_color_4', title: 'Concept Art Color', duration: '32 min', difficulty: '🎯 Specialized', description: 'Concept art color design', cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop&crop=center' },
            { id: 's_color_5', title: 'Environment Color Design', duration: '40 min', difficulty: '🎯 Specialized', description: 'Environment color techniques', cover: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=240&fit=crop&crop=center' },
            { id: 's_color_6', title: 'Specialized Color Palettes', duration: '25 min', difficulty: '🎯 Specialized', description: 'Specialized color palette creation', cover: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=240&fit=crop&crop=center' }
        ],
        line: [
            { id: 's_line_1', title: 'Character Line Design', duration: '25 min', difficulty: '🎯 Specialized', description: 'Character line design techniques', cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=240&fit=crop&crop=center' },
            { id: 's_line_2', title: 'Landscape Line Art', duration: '30 min', difficulty: '🎯 Specialized', description: 'Landscape line art mastery', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop&crop=center' },
            { id: 's_line_3', title: 'Portrait Line Work', duration: '28 min', difficulty: '🎯 Specialized', description: 'Portrait line techniques', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1267?w=400&h=240&fit=crop&crop=center' },
            { id: 's_line_4', title: 'Concept Art Lines', duration: '35 min', difficulty: '🎯 Specialized', description: 'Concept art line work', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop&crop=center' },
            { id: 's_line_5', title: 'Environment Line Design', duration: '32 min', difficulty: '🎯 Specialized', description: 'Environment line techniques', cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=240&fit=crop&crop=center' },
            { id: 's_line_6', title: 'Specialized Line Art', duration: '27 min', difficulty: '🎯 Specialized', description: 'Specialized line art creation', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop&crop=center' }
        ]
    }
};

function showCategorySections(category) {
    const categoryNames = {
        'beginner': 'Beginner',
        'intermediate': 'Intermediate', 
        'advanced': 'Advanced',
        'specialized': 'Specialized Skills'
    };
    
    currentCategory = category;
    
    // Update modal title
    document.getElementById('modalCategoryTitle').textContent = `${categoryNames[category]} Tutorials`;
    
    // Show modal with animation
    const modal = document.getElementById('categorySectionsModal');
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '1';
    }, 10);
    
    showMessage(`Opening ${categoryNames[category]} sections...`, 'info', 2000);
}

function closeCategorySections() {
    const modal = document.getElementById('categorySectionsModal');
    modal.style.transition = 'opacity 0.3s ease';
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function showVideosInSection(sectionType) {
    const sectionNames = {
        'color': 'Color Techniques',
        'line': 'Line Work & Sketching'
    };
    
    const categoryNames = {
        'beginner': 'Beginner',
        'intermediate': 'Intermediate', 
        'advanced': 'Advanced',
        'specialized': 'Specialized Skills'
    };
    
    currentSection = sectionType;
    
    // Update modal title
    document.getElementById('modalVideosTitle').textContent = `${categoryNames[currentCategory]} - ${sectionNames[sectionType]}`;
    
    // Load videos for this category and section
    loadVideosForSection(currentCategory, sectionType);
    
    // Close category modal and show videos modal
    closeCategorySections();
    
    setTimeout(() => {
        const videosModal = document.getElementById('videosInSectionModal');
        videosModal.style.display = 'flex';
        videosModal.style.opacity = '0';
        
        setTimeout(() => {
            videosModal.style.transition = 'opacity 0.3s ease';
            videosModal.style.opacity = '1';
        }, 10);
    }, 350);
    
    showMessage(`Loading ${sectionNames[sectionType]} videos...`, 'info', 2000);
}

function closeVideosInSection() {
    const modal = document.getElementById('videosInSectionModal');
    modal.style.transition = 'opacity 0.3s ease';
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function loadVideosForSection(category, sectionType) {
    const videosGrid = document.getElementById('videosGrid');
    const videos = videoData[category][sectionType];
    
    videosGrid.innerHTML = '';
    
    videos.forEach(video => {
        const videoCard = createVideoCard(video);
        videosGrid.appendChild(videoCard);
    });
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card hover-lift';
    card.onclick = () => playVideo(video.id);
    
    // Add special indicator for videos with URL
    const videoIndicator = video.videoUrl ? '🔗' : '▶️';
    const videoBadge = video.videoUrl ? '<span class="video-badge external">外部链接</span>' : '';
    
    // Create fallback cover image based on video type
    const fallbackCover = video.id.includes('color') 
        ? 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=240&fit=crop&crop=center'
        : 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=240&fit=crop&crop=center';
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.cover || fallbackCover}" alt="${video.title}" 
                 onerror="this.src='${fallbackCover}'; this.onerror=null;">
            <div class="play-button">${videoIndicator}</div>
            ${videoBadge}
        </div>
        <div class="video-info">
            <h4>${video.title}</h4>
            <p>${video.description}</p>
            <div class="video-meta">
                <span class="duration">⏱️ ${video.duration}</span>
                <span class="difficulty">${video.difficulty}</span>
            </div>
        </div>
    `;
    
    return card;
}

function playVideo(videoId) {
    const video = findVideoById(videoId);
    if (video) {
        if (video.videoUrl) {
            // If video has a URL, open it in a new tab
            showMessage(`Opening: ${video.title} 🎥`, 'success', 2000);
            setTimeout(() => {
                window.open(video.videoUrl, '_blank');
            }, 1000);
        } else {
            // For videos without URL, show coming soon message
            showMessage(`Playing: ${video.title} 🎥`, 'success', 2000);
            
            // Track the interaction
            trackTutorialInteraction('play_video', videoId);
            
            // Here you would implement actual video player functionality
            setTimeout(() => {
                showMessage('Video player feature coming soon! 🎬', 'info', 3000);
            }, 2000);
        }
    }
}

function findVideoById(videoId) {
    for (const category in videoData) {
        for (const section in videoData[category]) {
            const video = videoData[category][section].find(v => v.id === videoId);
            if (video) return video;
        }
    }
    return null;
} 

// Debug function to check for missing covers
function checkMissingCovers() {
    console.log('Checking for missing video covers...');
    let missingCovers = [];
    
    for (const category in videoData) {
        for (const section in videoData[category]) {
            videoData[category][section].forEach(video => {
                if (!video.cover) {
                    missingCovers.push({
                        id: video.id,
                        title: video.title,
                        category: category,
                        section: section
                    });
                }
            });
        }
    }
    
    if (missingCovers.length > 0) {
        console.log('Videos missing covers:', missingCovers);
    } else {
        console.log('All videos have covers! ✅');
    }
}

// Call the check function when page loads
document.addEventListener('DOMContentLoaded', () => {
    checkMissingCovers();
}); 

// Resource links data
const resourceLinks = {
    procreate: {
        name: 'Procreate',
        url: 'https://procreate.art/',
        description: 'Professional drawing and painting app for iPad'
    },
    photoshop: {
        name: 'Adobe Photoshop',
        url: 'https://www.adobe.com/products/photoshop.html',
        description: 'Industry-standard digital art and photo editing'
    },
    krita: {
        name: 'Krita',
        url: 'https://krita.org/',
        description: 'Free and open-source digital painting software'
    },
    pinterest: {
        name: 'Pinterest',
        url: 'https://www.pinterest.com/',
        description: 'Discover millions of art references and ideas'
    },
    artstation: {
        name: 'ArtStation',
        url: 'https://www.artstation.com/',
        description: 'Showcase your art and discover professional work'
    },
    deviantart: {
        name: 'DeviantArt',
        url: 'https://www.deviantart.com/',
        description: 'Connect with artists and share your artwork'
    }
};

function openResource(resourceId) {
    const resource = resourceLinks[resourceId];
    if (resource) {
        showMessage(`Opening ${resource.name}...`, 'success', 2000);
        
        // Track the interaction
        trackTutorialInteraction('open_resource', resourceId);
        
        // Open resource in new tab
        setTimeout(() => {
            window.open(resource.url, '_blank');
        }, 1000);
    } else {
        showMessage('Resource not found', 'error', 2000);
    }
} 