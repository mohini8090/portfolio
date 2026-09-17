// DOM Elements
const projectsContainer = document.querySelector('.projects-grid');
const mobileMenuBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contact-form');
const currentYearSpan = document.getElementById('current-year');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    setupMobileMenu();
    setupSmoothScroll();
    setupFormSubmission();
    updateCopyright();
});

// Render Projects
function renderProjects() {
    // Access global projectsData from projects.js
    const projects = window.projectsData || [];

    if (!projectsContainer) return;

    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="skills-container" style="margin-bottom: 1.5rem; margin-top: 0;">
                    ${project.tags.map(tag => `<span class="skill-tag" style="font-size: 0.8rem; padding: 0.2rem 0.8rem;">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.liveLink}" class="link-btn" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.githubLink}" class="link-btn" target="_blank">
                        <i class="fab fa-github"></i> Source
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Mobile Menu
function setupMobileMenu() {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

//Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});
}

// Smooth Scroll for Navigation Links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Submission (Mock)
function setupFormSubmission() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;

        // Loading state
        btn.textContent = 'Sending...';
        btn.style.opacity = '0.7';

        // Simulate network request
        setTimeout(() => {
            alert('Message sent successfully! (This is a demo)');
            contactForm.reset();
            btn.textContent = originalText;
            btn.style.opacity = '1';
        }, 1500);
    });
}

function updateCopyright() {
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});