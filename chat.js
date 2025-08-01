// Chat functionality
let chatHistory = [];
let isTyping = false;
let userProfile = {
    interests: [],
    timeAvailable: '',
    learningStyle: '',
    currentStage: '',
    goals: [],
    challenges: []
};

// Initialize chat
document.addEventListener('DOMContentLoaded', () => {
    loadChatHistory();
    loadUserProfile();
    autoResizeTextarea();
    scrollToBottom();
});

// Auto-resize textarea
function autoResizeTextarea() {
    const textarea = document.getElementById('messageInput');
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
}

// Handle Enter key
function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// Send message
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message || isTyping) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    input.style.height = 'auto';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate intelligent AI response
    setTimeout(() => {
        hideTypingIndicator();
        const aiResponse = generateIntelligentResponse(message);
        addMessage(aiResponse, 'ai');
    }, 1000 + Math.random() * 2000);
}

// Send quick message
function sendQuickMessage(message) {
    const input = document.getElementById('messageInput');
    input.value = message;
    sendMessage();
}

// Add message to chat
function addMessage(content, sender) {
    const messagesContainer = document.getElementById('messagesContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const time = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    const avatar = sender === 'ai' ? '🤖' : '👤';
    const avatarClass = sender === 'ai' ? 'ai-message' : 'user-message';
    
    messageDiv.innerHTML = `
        <div class="message-avatar ${avatarClass}">
            <span class="${sender === 'ai' ? 'ai-icon' : 'user-icon'}">${avatar}</span>
        </div>
        <div class="message-content">
            <div class="message-bubble">
                ${formatMessage(content)}
            </div>
            <div class="message-time">${time}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
    
    // Save to history
    chatHistory.push({ content, sender, time });
    saveChatHistory();
}

// Format message content
function formatMessage(content) {
    // Convert URLs to links
    content = content.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #4ade80;">$1</a>');
    
    // Convert line breaks to <br>
    content = content.replace(/\n/g, '<br>');
    
    // Convert **text** to bold
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    return content;
}

// Show typing indicator
function showTypingIndicator() {
    isTyping = true;
    const messagesContainer = document.getElementById('messagesContainer');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-indicator-message';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar ai-message">
            <span class="ai-icon">🤖</span>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Generate intelligent AI response
function generateIntelligentResponse(userMessage) {
    // Update user profile based on message
    updateUserProfile(userMessage);
    
    // Check for specific keywords and generate personalized responses
    if (userMessage.includes('programming') || userMessage.includes('code') || userMessage.includes('development') || userMessage.includes('coding')) {
        return generateProgrammingPlan();
    }
    
    if (userMessage.includes('art') || userMessage.includes('painting') || userMessage.includes('drawing') || userMessage.includes('creative')) {
        return generateArtPlan();
    }
    
    if (userMessage.includes('music') || userMessage.includes('instrument') || userMessage.includes('singing') || userMessage.includes('guitar')) {
        return generateMusicPlan();
    }
    
    if (userMessage.includes('fitness') || userMessage.includes('exercise') || userMessage.includes('workout') || userMessage.includes('gym')) {
        return generateFitnessPlan();
    }
    
    if (userMessage.includes('writing') || userMessage.includes('write') || userMessage.includes('creative writing')) {
        return generateWritingPlan();
    }
    
    if (userMessage.includes('photography') || userMessage.includes('photo') || userMessage.includes('camera')) {
        return generatePhotographyPlan();
    }
    
    if (userMessage.includes('cooking') || userMessage.includes('food') || userMessage.includes('recipe')) {
        return generateCookingPlan();
    }
    
    if (userMessage.includes('language') || userMessage.includes('english') || userMessage.includes('spanish') || userMessage.includes('french')) {
        return generateLanguagePlan();
    }
    
    if (userMessage.includes('time') || userMessage.includes('busy') || userMessage.includes('schedule')) {
        return generateTimeManagementPlan();
    }
    
    if (userMessage.includes('plan') || userMessage.includes('goal') || userMessage.includes('target')) {
        return generateGeneralPlan(userMessage);
    }
    
    if (userMessage.includes('difficulty') || userMessage.includes('problem') || userMessage.includes('struggle') || userMessage.includes('challenge')) {
        return generateProblemSolvingPlan(userMessage);
    }
    
    // Default intelligent response
    return generateContextualResponse(userMessage);
}

// Update user profile
function updateUserProfile(message) {
    const timeKeywords = ['5 minutes', '15 minutes', '30 minutes', '1 hour', 'daily', 'weekly'];
    const styleKeywords = ['video', 'reading', 'practice', 'listen', 'watch', 'do'];
    
    // Extract time availability
    for (const keyword of timeKeywords) {
        if (message.includes(keyword)) {
            userProfile.timeAvailable = keyword;
            break;
        }
    }
    
    // Extract learning style
    for (const keyword of styleKeywords) {
        if (message.includes(keyword)) {
            userProfile.learningStyle = keyword;
            break;
        }
    }
    
    // Extract interests
    const interestKeywords = ['programming', 'art', 'music', 'fitness', 'writing', 'photography', 'cooking', 'language'];
    for (const interest of interestKeywords) {
        if (message.includes(interest) && !userProfile.interests.includes(interest)) {
            userProfile.interests.push(interest);
        }
    }
    
    saveUserProfile();
}

// Generate programming plan
function generateProgrammingPlan() {
    const timeAvailable = userProfile.timeAvailable || '30 minutes';
    const plan = {
        '5 minutes': {
            daily: 'Watch a 5-minute programming video daily (recommended: YouTube "Programming with Mosh", "freeCodeCamp")',
            weekly: 'Learn one simple programming concept per week',
            resources: ['YouTube programming tutorials', 'freeCodeCamp', 'MDN Web Docs']
        },
        '15 minutes': {
            daily: 'Practice one simple programming exercise daily',
            weekly: 'Complete one small project per week',
            resources: ['LeetCode easy problems', 'Codewars', 'GitHub mini-projects']
        },
        '30 minutes': {
            daily: 'Learn one programming concept and practice daily',
            weekly: 'Complete one medium-difficulty project per week',
            resources: ['Udemy courses', 'Coursera', 'edX']
        }
    };
    
    const selectedPlan = plan[timeAvailable] || plan['30 minutes'];
    
    return `**Programming Learning Plan** 🖥️

Based on your time availability, here's your personalized plan:

**Daily Tasks:**
${selectedPlan.daily}

**Weekly Goals:**
${selectedPlan.weekly}

**Recommended Resources:**
${selectedPlan.resources.map(r => `• ${r}`).join('\n')}

**Learning Tips:**
• Start with HTML/CSS, then move to JavaScript
• Keep a learning journal
• Join programming communities
• Don't be afraid to make mistakes - programming is all about trial and error

Which area would you like to start with?`;
}

// Generate art plan
function generateArtPlan() {
    const timeAvailable = userProfile.timeAvailable || '30 minutes';
    const plan = {
        '5 minutes': {
            daily: 'Draw a simple sketch or doodle daily',
            weekly: 'Complete one small artwork per week',
            resources: ['Pinterest art inspiration', 'Instagram art tutorials', 'YouTube art channels']
        },
        '15 minutes': {
            daily: 'Practice basic drawing techniques daily',
            weekly: 'Complete one full artwork per week',
            resources: ['YouTube drawing tutorials', 'Procreate tutorials', 'Drawing fundamentals']
        },
        '30 minutes': {
            daily: 'Systematically learn art techniques daily',
            weekly: 'Complete one complex artwork per week',
            resources: ['Skillshare art courses', 'Local art classes', 'Professional art books']
        }
    };
    
    const selectedPlan = plan[timeAvailable] || plan['30 minutes'];
    
    return `**Art Learning Plan** 🎨

Your personalized art learning plan:

**Daily Tasks:**
${selectedPlan.daily}

**Weekly Goals:**
${selectedPlan.weekly}

**Recommended Resources:**
${selectedPlan.resources.map(r => `• ${r}`).join('\n')}

**Learning Tips:**
• Start with simple geometric shapes
• Observe objects in daily life
• Don't pursue perfection, enjoy the creative process
• Try digital art (iPad + Procreate)

**Beginner Tools:**
• Pencil + sketch paper
• Watercolor paints
• Digital drawing tablet

Which art style would you like to start with?`;
}

// Generate music plan
function generateMusicPlan() {
    const timeAvailable = userProfile.timeAvailable || '30 minutes';
    const plan = {
        '5 minutes': {
            daily: 'Listen to one new song and analyze it daily',
            weekly: 'Learn one simple song per week',
            resources: ['Spotify', 'Apple Music', 'YouTube music tutorials']
        },
        '15 minutes': {
            daily: 'Practice basic music theory or instrument daily',
            weekly: 'Learn one medium-difficulty song per week',
            resources: ['YouTube instrument tutorials', 'Ukulele beginner', 'Guitar basics']
        },
        '30 minutes': {
            daily: 'Systematically learn music theory and instrument daily',
            weekly: 'Complete one complex piece per week',
            resources: ['Local music classes', 'Professional music theory courses', 'Music teachers']
        }
    };
    
    const selectedPlan = plan[timeAvailable] || plan['30 minutes'];
    
    return `**Music Learning Plan** 🎵

Your personalized music learning plan:

**Daily Tasks:**
${selectedPlan.daily}

**Weekly Goals:**
${selectedPlan.weekly}

**Recommended Resources:**
${selectedPlan.resources.map(r => `• ${r}`).join('\n')}

**Beginner Instruments:**
• Ukulele (easiest)
• Harmonica
• Keyboard
• Guitar

**Learning Tips:**
• Start with simple children's songs
• Practice scales daily
• Listen to different music genres
• Try composing your own music

Which instrument would you like to learn?`;
}

// Generate fitness plan
function generateFitnessPlan() {
    const timeAvailable = userProfile.timeAvailable || '30 minutes';
    const plan = {
        '5 minutes': {
            daily: 'Do 5 minutes of simple stretching daily',
            weekly: 'Try one new exercise per week',
            resources: ['Nike Training Club', 'YouTube fitness videos', 'Instagram fitness']
        },
        '15 minutes': {
            daily: 'Do 15 minutes of cardio daily',
            weekly: 'Complete 3 full workouts per week',
            resources: ['Nike Training Club', 'YouTube fitness tutorials', 'Home workout videos']
        },
        '30 minutes': {
            daily: 'Do 30 minutes of comprehensive training daily',
            weekly: 'Complete 5 workouts per week',
            resources: ['Gym membership', 'Personal trainer', 'Systematic fitness courses']
        }
    };
    
    const selectedPlan = plan[timeAvailable] || plan['30 minutes'];
    
    return `**Fitness Plan** 💪

Your personalized fitness plan:

**Daily Tasks:**
${selectedPlan.daily}

**Weekly Goals:**
${selectedPlan.weekly}

**Recommended Resources:**
${selectedPlan.resources.map(r => `• ${r}`).join('\n')}

**Beginner Exercises:**
• Walking/Jogging
• Jump rope
• Push-ups/Squats
• Yoga/Stretching

**Important Notes:**
• Progress gradually, don't rush
• Pay attention to proper form
• Warm up before exercise
• Stay hydrated

Which exercise would you like to start with?`;
}

// Generate writing plan
function generateWritingPlan() {
    const timeAvailable = userProfile.timeAvailable || '30分钟';
    const plan = {
        '5分钟': {
            daily: '每天写5分钟日记或随笔',
            weekly: '每周完成一篇短文',
            resources: ['简书', '知乎', '微信公众号']
        },
        '15分钟': {
            daily: '每天练习写作技巧',
            weekly: '每周完成一篇完整文章',
            resources: ['写作课程', '阅读经典作品', '写作社群']
        },
        '30分钟': {
            daily: '每天系统学习写作',
            weekly: '每周完成一篇高质量文章',
            resources: ['专业写作班', '文学创作课程', '出版社投稿']
        }
    };
    
    const selectedPlan = plan[timeAvailable] || plan['30分钟'];
    
    return `**写作学习计划** ✍️

为你定制的写作计划：

**每日任务：**
${selectedPlan.daily}

**每周目标：**
${selectedPlan.weekly}

**推荐资源：**
${selectedPlan.resources.map(r => `• ${r}`).join('\n')}

**写作类型推荐：**
• 日记/随笔
• 故事创作
• 技术写作
• 诗歌创作

**学习建议：**
• 多读书，积累素材
• 每天记录灵感
• 不要害怕写得不好
• 可以尝试不同文体

你想写什么类型的内容呢？`;
}

// Generate photography plan
function generatePhotographyPlan() {
    const timeAvailable = userProfile.timeAvailable || '30分钟';
    const plan = {
        '5分钟': {
            daily: '每天拍一张照片并分析',
            weekly: '每周学习一个摄影技巧',
            resources: ['小红书摄影', '抖音摄影技巧', '500px']
        },
        '15分钟': {
            daily: '每天练习摄影技巧',
            weekly: '每周完成一组主题拍摄',
            resources: ['B站摄影教程', '摄影书籍', '线下摄影班']
        },
        '30分钟': {
            daily: '每天系统学习摄影',
            weekly: '每周完成一组完整作品',
            resources: ['专业摄影课程', '摄影工作室', '摄影比赛']
        }
    };
    
    const selectedPlan = plan[timeAvailable] || plan['30分钟'];
    
    return `**摄影学习计划** 📸

为你定制的摄影计划：

**每日任务：**
${selectedPlan.daily}

**每周目标：**
${selectedPlan.weekly}

**推荐资源：**
${selectedPlan.resources.map(r => `• ${r}`).join('\n')}

**摄影类型推荐：**
• 人像摄影
• 风景摄影
• 街拍
• 美食摄影

**入门设备：**
• 手机（最简单）
• 入门单反
• 微单相机

**学习建议：**
• 学习构图法则
• 多观察光线
• 尝试不同角度
• 后期处理也很重要

你想拍什么类型的照片呢？`;
}

// Generate cooking plan
function generateCookingPlan() {
    const timeAvailable = userProfile.timeAvailable || '30分钟';
    const plan = {
        '5分钟': {
            daily: '每天学习一个烹饪小技巧',
            weekly: '每周学会一道简单菜',
            resources: ['小红书美食', '抖音美食', '下厨房App']
        },
        '15分钟': {
            daily: '每天练习基础烹饪技巧',
            weekly: '每周学会一道中等难度菜',
            resources: ['B站美食教程', '美食书籍', '线下烹饪班']
        },
        '30分钟': {
            daily: '每天系统学习烹饪',
            weekly: '每周学会一道复杂菜',
            resources: ['专业烹饪学校', '美食博主', '餐厅实习']
        }
    };
    
    const selectedPlan = plan[timeAvailable] || plan['30分钟'];
    
    return `**烹饪学习计划** 👨‍🍳

为你定制的烹饪计划：

**每日任务：**
${selectedPlan.daily}

**每周目标：**
${selectedPlan.weekly}

**推荐资源：**
${selectedPlan.resources.map(r => `• ${r}`).join('\n')}

**入门菜系推荐：**
• 家常菜
• 西式简餐
• 烘焙甜点
• 健康轻食

**必备工具：**
• 基础锅具
• 调味料
• 菜刀
• 烤箱（可选）

**学习建议：**
• 从简单的炒菜开始
• 注意食材搭配
• 多尝试不同口味
• 注意食品安全

你想学做什么菜呢？`;
}

// Generate language plan
function generateLanguagePlan() {
    const timeAvailable = userProfile.timeAvailable || '30分钟';
    const plan = {
        '5分钟': {
            daily: '每天学习5个新单词',
            weekly: '每周学会一个语法点',
            resources: ['多邻国', '百词斩', '扇贝单词']
        },
        '15分钟': {
            daily: '每天练习听说读写',
            weekly: '每周完成一个学习单元',
            resources: ['流利说', 'B站语言教程', '语言交换']
        },
        '30分钟': {
            daily: '每天系统学习语言',
            weekly: '每周完成一个完整课程',
            resources: ['线下语言班', '外教一对一', '语言考试']
        }
    };
    
    const selectedPlan = plan[timeAvailable] || plan['30分钟'];
    
    return `**语言学习计划** 🌍

为你定制的语言学习计划：

**每日任务：**
${selectedPlan.daily}

**每周目标：**
${selectedPlan.weekly}

**推荐资源：**
${selectedPlan.resources.map(r => `• ${r}`).join('\n')}

**推荐语言：**
• 英语（最实用）
• 日语（兴趣导向）
• 韩语（文化相关）
• 西班牙语（使用广泛）

**学习建议：**
• 每天坚持，哪怕只有5分钟
• 多听多说，不要害怕犯错
• 看原版电影/电视剧
• 找语言交换伙伴

你想学习哪种语言呢？`;
}

// Generate time management plan
function generateTimeManagementPlan() {
    return `**时间管理计划** ⏰

我理解你的时间紧张，这里有一些高效的时间管理方法：

**5分钟法则：**
• 如果一件事只需要5分钟，立即去做
• 利用碎片时间学习

**番茄工作法：**
• 25分钟专注工作 + 5分钟休息
• 每4个番茄钟后休息15分钟

**时间块管理：**
• 早上：精力充沛时做重要的事
• 中午：处理简单任务
• 晚上：复习和总结

**实用建议：**
• 列出每日3件最重要的事
• 使用手机提醒功能
• 减少刷手机时间
• 学会说"不"

**学习时间安排：**
• 通勤时间：听音频课程
• 午休时间：看短视频教程
• 晚上：专注学习30分钟

你想从哪个时间管理方法开始呢？`;
}

// Generate general plan
function generateGeneralPlan(message) {
    return `**个性化计划制定** 📋

根据你的情况，我建议按以下步骤制定计划：

**第一步：明确目标**
• 你想达到什么效果？
• 这个目标对你有多重要？
• 你愿意投入多少时间？

**第二步：分解目标**
• 把大目标分解成小目标
• 每个小目标都要可衡量
• 设定完成时间

**第三步：制定行动计划**
• 每天具体做什么？
• 需要什么资源？
• 如何跟踪进度？

**第四步：开始行动**
• 从最简单的开始
• 不要追求完美
• 持续调整优化

**SMART原则：**
• Specific（具体）
• Measurable（可衡量）
• Achievable（可实现）
• Relevant（相关）
• Time-bound（有时限）

你想制定什么类型的计划呢？告诉我你的具体目标，我可以帮你制定更详细的计划。`;
}

// Generate problem solving plan
function generateProblemSolvingPlan(message) {
    return `**问题解决计划** 🔧

遇到困难是成长的一部分，让我们一起来解决：

**问题分析：**
• 具体遇到了什么困难？
• 这个困难让你感觉怎么样？
• 你希望得到什么样的帮助？

**解决策略：**
1. **分解问题** - 把大问题拆成小问题
2. **寻求帮助** - 不要害怕向他人求助
3. **调整期望** - 给自己更多时间和耐心
4. **庆祝小进步** - 每个小进步都值得庆祝

**实用建议：**
• 写下来具体的问题
• 列出可能的解决方案
• 选择最简单的方法开始
• 记录解决过程

**心理支持：**
• 每个人都会遇到困难
• 困难是学习的机会
• 不要和别人比较
• 相信自己的能力

具体遇到了什么困难呢？我可以帮你分析并提供更具体的建议。`;
}

// Generate contextual response
function generateContextualResponse(message) {
    // Analyze message sentiment and content
    const positiveWords = ['like', 'happy', 'excited', 'looking forward', 'interesting', 'love'];
    const negativeWords = ['difficult', 'stress', 'anxiety', 'worry', 'afraid', 'hard'];
    const questionWords = ['how', 'what', 'why', 'when', 'where'];
    
    let response = '';
    
    // Check for questions
    if (questionWords.some(word => message.includes(word))) {
        response = `That's a great question! Let me help you analyze it.

Based on your situation, I suggest you can:

1. **Start with basics** - Begin with the simplest things
2. **Find your interests** - What excites you?
3. **Set small goals** - Don't set big goals from the start
4. **Keep learning** - Make progress every day

Which area would you like to start with? Or is there anything specific you'd like to know?`;
    }
    // Check for positive sentiment
    else if (positiveWords.some(word => message.includes(word))) {
        response = `Excellent! Your positive attitude is the key to success.

Keep up this enthusiasm, and remember:
• Interest is the best teacher
• Enjoy the learning process
• Don't put too much pressure on yourself
• Every small progress is worth celebrating

Which field would you like to channel this enthusiasm into?`;
    }
    // Check for negative sentiment
    else if (negativeWords.some(word => message.includes(word))) {
        response = `I understand how you feel. It's normal to encounter difficulties.

Remember:
• Everyone faces setbacks
• Difficulties are opportunities for growth
• You're not alone
• Take it slow, don't rush

Is there anything specific you'd like to talk about? I can help analyze problems and provide advice.`;
    }
    // Default response
    else {
        response = `Thank you for sharing! I understand your thoughts.

Exploration is a process, and everyone has their own pace. What's important is maintaining curiosity and an open mind.

Based on what you've mentioned before, I suggest you can:
• Start with areas that interest you
• Create a simple and feasible plan
• Invest a little time every day
• Don't be afraid to try new things

Is there anything specific you'd like to talk about? Or is there anything I can help you with?`;
    }
    
    return response;
}

// Save user profile
function saveUserProfile() {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

// Load user profile
function loadUserProfile() {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
        userProfile = JSON.parse(saved);
    }
}

// Clear chat
function clearChat() {
    if (confirm('Are you sure you want to clear all conversations?')) {
        const messagesContainer = document.getElementById('messagesContainer');
        messagesContainer.innerHTML = `
            <div class="message ai-message">
                <div class="message-avatar">
                    <span class="ai-icon">🤖</span>
                </div>
                <div class="message-content">
                    <div class="message-bubble">
                        <p>Conversation cleared. What would you like to talk about?</p>
                    </div>
                    <div class="message-time">Just now</div>
                </div>
            </div>
        `;
        
        chatHistory = [];
        saveChatHistory();
    }
}

// Save chat history
function saveChatHistory() {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Load chat history
function loadChatHistory() {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
        chatHistory = JSON.parse(saved);
        // Optionally restore chat history here
    }
}

// Scroll to bottom
function scrollToBottom() {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Go back
function goBack() {
    window.history.back();
}

// Show message notification
function showMessage(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        color: #333;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style); 