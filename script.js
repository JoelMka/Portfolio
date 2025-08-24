// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            e.preventDefault();
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show success message
        showNotification('Thank you for your message! I will get back to you soon.', 'success');
    });
}

// Professional notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add professional styles
    const colors = {
        success: { bg: '#10b981', shadow: 'rgba(16, 185, 129, 0.2)' },
        error: { bg: '#ef4444', shadow: 'rgba(239, 68, 68, 0.2)' },
        info: { bg: '#3b82f6', shadow: 'rgba(59, 130, 246, 0.2)' }
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type].bg};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px ${colors[type].shadow};
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Smooth scroll animations with intersection observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .certificate-card, .info-item, .contact-item, .interest-category');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Subtle typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Subtle parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.2;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Smooth skills animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Trigger skills animation when skills section is visible
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skillsObserver.observe(skillsSection);
}

// Initialize skill items with subtle initial state
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease';
    });
});

// Professional back to top button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #1a1a1a;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        font-size: 1.1rem;
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Subtle hover effects
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-3px)';
        backToTop.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.2)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0)';
        backToTop.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    });
}

// Initialize back to top button
createBackToTopButton();

// Smooth loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loading class to elements with staggered timing
    const loadingElements = document.querySelectorAll('.skill-category, .project-card, .certificate-card, .interest-category');
    loadingElements.forEach((el, index) => {
        el.classList.add('loading');
        setTimeout(() => {
            el.classList.add('loaded');
        }, index * 150);
    });
});

// Copy phone number to clipboard
function copyPhoneNumber() {
    const phoneNumber = '+91 8590814137';
    navigator.clipboard.writeText(phoneNumber).then(() => {
        showNotification('Phone number copied to clipboard!', 'success');
        
        // Add subtle visual feedback
        const phoneElements = document.querySelectorAll('.contact-item p, .footer-section p');
        phoneElements.forEach(element => {
            if (element.textContent.includes('8590814137')) {
                element.style.color = '#1a1a1a';
                element.style.fontWeight = '600';
                setTimeout(() => {
                    element.style.color = '';
                    element.style.fontWeight = '';
                }, 1000);
            }
        });
    }).catch(() => {
        showNotification('Failed to copy phone number', 'error');
    });
}

// Add click event to phone numbers
document.addEventListener('DOMContentLoaded', () => {
    const phoneElements = document.querySelectorAll('.contact-item p, .footer-section p');
    phoneElements.forEach(element => {
        if (element.textContent.includes('8590814137')) {
            element.style.cursor = 'pointer';
            element.title = 'Click to copy';
            element.style.transition = 'all 0.3s ease';
            element.addEventListener('click', copyPhoneNumber);
            
            // Add subtle hover effect
            element.addEventListener('mouseenter', () => {
                element.style.color = '#1a1a1a';
                element.style.fontWeight = '600';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.color = '';
                element.style.fontWeight = '';
            });
        }
    });
});

// Add professional CSS for active navigation link and notifications
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #1a1a1a !important;
        font-weight: 600 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: all 0.3s ease;
    }
    
    /* Enhanced focus states for form elements */
    .form-group input:focus,
    .form-group textarea:focus {
        transform: scale(1.01);
    }
    
    /* Enhanced mobile menu animation */
    .nav-menu.active {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Smooth reveal animation for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const windowHeight = window.innerHeight;
        
        if (window.pageYOffset > sectionTop - windowHeight + 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize section reveal
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
    });
    
    // Trigger initial reveal
    setTimeout(revealOnScroll, 100);
});

// Add scroll event for section reveal
window.addEventListener('scroll', revealOnScroll); 