// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    setActiveNavLink();
    initializeDropdowns();
    loadPresentations();
});

// Navigation functionality
function initializeNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
        });

        // Close menu when link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('mobile-active');
            });
        });
    }
}

// Set active navigation link
function setActiveNavLink() {
    const currentPage = globalThis.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Dropdown functionality
function initializeDropdowns() {
    const dropdownButtons = document.querySelectorAll('.dropdown-btn');

    dropdownButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdownContent = this.nextElementSibling;
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown-content').forEach(content => {
                if (content !== dropdownContent) {
                    content.classList.remove('show');
                }
            });

            dropdownContent.classList.toggle('show');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-content').forEach(content => {
            content.classList.remove('show');
        });
    });

    // Close dropdown when selecting item
    const dropdownItems = document.querySelectorAll('.dropdown-content a');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            this.closest('.dropdown-content').classList.remove('show');
        });
    });
}

// Load presentations dynamically
function loadPresentations() {
    const presentationsList = document.getElementById('presentations-list');
    if (!presentationsList) return;

    const presentations = [
        {
            title: 'Project Proposal',
            description: 'Initial project proposal and objectives',
            file: 'proposal.pptx',
            date: 'January 2025'
        },
        {
            title: 'Progress Presentation 1',
            description: 'First milestone - System design and architecture',
            file: 'progress1.pptx',
            date: 'February 2025'
        },
        {
            title: 'Progress Presentation 2',
            description: 'Second milestone - Implementation progress',
            file: 'progress2.pptx',
            date: 'March 2025'
        },
        {
            title: 'Final Presentation',
            description: 'Final project presentation and results',
            file: 'final.pptx',
            date: 'April 2025'
        }
    ];

    presentations.forEach(presentation => {
        const listItem = createPresentationItem(presentation);
        presentationsList.appendChild(listItem);
    });
}

// Create presentation item element
function createPresentationItem(presentation) {
    const li = document.createElement('li');
    li.className = 'file-item';

    li.innerHTML = `
        <div class="file-info">
            <h4>${presentation.title}</h4>
            <p>${presentation.description}</p>
            <p style="color: #999; margin-top: 5px; font-size: 0.8rem;">${presentation.date}</p>
        </div>
        <div class="file-actions">
            <a href="presentations/${presentation.file}" class="btn-view" download>Download</a>
            <button class="btn-download" onclick="viewPresentation('presentations/${presentation.file}')">View</button>
        </div>
    `;

    return li;
}

// View presentation
function viewPresentation(filePath) {
    // Open in new tab or handle viewing
    window.open(filePath, '_blank');
}

// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validate
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Here you would typically send the data to a server
        console.log('Form submitted:', { name, email, message });
        alert('Thank you for your message! We will get back to you soon.');

        // Reset form
        this.reset();
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .team-member, .file-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
}

// Call animation on scroll when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}

// Arrow icon animation for dropdown
document.querySelectorAll('.dropdown-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const arrow = this.querySelector('.arrow-icon');
        if (arrow) {
            arrow.style.transform = arrow.style.transform === 'rotate(180deg)' 
                ? 'rotate(0deg)' 
                : 'rotate(180deg)';
        }
    });
});

// ── Hero Enhancement: sonar rings + wave + page-hero label ──
function enhanceHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const pageTags = {
        'domain.html':        'Research Domain',
        'milestones.html':    'Project Timeline',
        'documents.html':     'Project Resources',
        'contact.html':       'Contact Us',
        'about.html':         'Our Team',
        'presentations.html': 'Presentations'
    };

    const currentPage = globalThis.location.pathname.split('/').pop() || 'index.html';

    // Apply inner-page variant
    if (pageTags[currentPage]) {
        hero.classList.add('page-hero');
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            const tag = document.createElement('span');
            tag.className = 'hero-tag';
            tag.textContent = pageTags[currentPage];
            heroContent.insertBefore(tag, heroContent.firstChild);
        }
    }

    // Inject sonar pulse rings
    const rings = document.createElement('div');
    rings.className = 'hero-rings';
    for (let i = 0; i < 3; i++) {
        const ring = document.createElement('span');
        ring.className = 'hero-ring';
        rings.appendChild(ring);
    }
    hero.appendChild(rings);

    // Inject bottom wave (colour matches next section)
    const nextSection = hero.nextElementSibling;
    const waveFill = nextSection?.classList.contains('alternate')
        ? '#e2ecf3'
        : '#ffffff';
    const wave = document.createElement('div');
    wave.className = 'hero-wave';
    wave.innerHTML = `<svg viewBox="0 0 1440 52" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,36 C240,8 480,52 720,28 C960,4 1200,48 1440,32 L1440,52 L0,52 Z" fill="${waveFill}"/></svg>`;
    hero.appendChild(wave);
}
