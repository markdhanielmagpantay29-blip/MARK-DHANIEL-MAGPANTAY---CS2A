/* STREAMING_CHUNK:Initializing main application logic on DOMContentLoaded... */
document.addEventListener('DOMContentLoaded', () => {
// Initialize icons & dynamic current year
if (typeof lucide !== 'undefined') {
lucide.createIcons();
}

const currentYearEl = document.getElementById('currentYear');
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

/* STREAMING_CHUNK:Setting up Theme Switcher with localStorage persistence... */
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
setTheme(savedTheme);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

function setTheme(theme) {
    if (theme === 'dark') {
        htmlElement.classList.add('dark');
        if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        htmlElement.classList.remove('dark');
        if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
    }
    localStorage.setItem('portfolio-theme', theme);
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/* STREAMING_CHUNK:Setting up Mobile Navigation Toggle... */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const menuIcon = document.getElementById('menuIcon');

if (mobileMenuBtn && navLinks && menuIcon) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isActive = navLinks.classList.contains('active');
        menuIcon.setAttribute('data-lucide', isActive ? 'x' : 'menu');
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.setAttribute('data-lucide', 'menu');
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });
}

/* STREAMING_CHUNK:Setting up Ask About Me Chatbot Logic... */
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

const botKnowledge = [
    {
        keywords: ['skill', 'skills', 'stack', 'tech', 'technologies', 'tools'],
        response: "Dhaniel excels in physical activities and web development stack skills!"
    },
    {
        keywords: ['education', 'degree', 'university', 'college', 'study', 'graduated'],
        response: "Dhaniel is currently taking a BS in Computer Science at Lipa City Colleges."
    },
    {
        keywords: ['goal', 'goals', 'career', 'future', 'aspire'],
        response: "Dhaniel's goal is to pursue his dream to become a web developer."
    },
    {
        keywords: ['freelance', 'work', 'hire', 'available', 'job', 'open'],
        response: "Yes! Dhaniel is actively open for freelance web development projects."
    }
];

// Delegate preset prompt button clicks
document.querySelectorAll('.preset-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const question = chip.getAttribute('data-question');
        if (question) {
            processUserMessage(question);
        }
    });
});

if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (text) {
            processUserMessage(text);
            chatInput.value = '';
        }
    });
}

function processUserMessage(text) {
    appendMessage('user', text);

    setTimeout(() => {
        const lowerText = text.toLowerCase();
        let matchedAnswer = null;

        for (const item of botKnowledge) {
            if (item.keywords.some(kw => lowerText.includes(kw))) {
                matchedAnswer = item.response;
                break;
            }
        }

        if (matchedAnswer) {
            appendMessage('bot', matchedAnswer);
        } else {
            appendMessage('bot', "Thanks for your question! Dhaniel is available for detailed chats—feel free to drop a message in the Contact form below!");
        }
    }, 400);
}

function appendMessage(sender, text) {
    if (!chatMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.innerHTML = `<div class="message-bubble">${text}</div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* STREAMING_CHUNK:Setting up Contact Form submission handling... */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formStatus.classList.add('success');
        contactForm.reset();

        setTimeout(() => {
            formStatus.classList.remove('success');
        }, 5000);
    });
}

/* STREAMING_CHUNK:Adding event listeners for demo and repository buttons... */
document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Live demo preview clicked');
    });
});

document.querySelectorAll('.repo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Repository link clicked');
    });
});


});