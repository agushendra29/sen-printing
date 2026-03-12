// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        navMenu.style.display = 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '5rem';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.backgroundColor = 'white';
        navMenu.style.flexDirection = 'column';
        navMenu.style.padding = '1rem';
        navMenu.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        navMenu.style.display = 'none';
    }
});

// Close mobile menu when clicking a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            navMenu.classList.remove('active');
            navMenu.style.display = 'none';
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Smooth Scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Portfolio Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.textContent.trim();
        
        portfolioItems.forEach(item => {
            const category = item.querySelector('.portfolio-category').textContent.trim();
            
            if (filterValue === 'All' || category === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Initialize portfolio items with transition
portfolioItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// Form Submission Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Log form data (in production, this would be sent to a server)
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your inquiry! We will contact you shortly.');
        
        // Reset form
        contactForm.reset();
    });
}

// Scroll Animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .process-card, .feature-card, .testimonial-card, .stat-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format numbers
        if (element.textContent.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else if (element.textContent.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (element.textContent.includes('/')) {
            element.textContent = current.toFixed(1) + '/5';
        } else if (element.textContent.includes('K+')) {
            element.textContent = Math.floor(current) + 'K+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe stat elements for counter animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const text = entry.target.textContent;
            let target;
            
            if (text.includes('4.9')) {
                target = 4.9;
            } else if (text.includes('25')) {
                target = 25;
            } else if (text.includes('5000')) {
                target = 5000;
            } else if (text.includes('50K')) {
                target = 50;
            } else if (text.includes('50+')) {
                target = 50;
            } else if (text.includes('15+')) {
                target = 15;
            } else if (text.includes('98')) {
                target = 98;
            } else if (text.includes('99')) {
                target = 99;
            } else if (text.includes('24')) {
                target = 24;
            } else {
                return;
            }
            
            animateCounter(entry.target, target);
        }
    });
}, { threshold: 0.5 });

// Observe all stat values
const statValues = document.querySelectorAll('.stat-value, .stat-card-value');
statValues.forEach(stat => {
    statObserver.observe(stat);
});

// Window resize handler for mobile menu
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        navMenu.style.display = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.right = '';
        navMenu.style.backgroundColor = '';
        navMenu.style.flexDirection = '';
        navMenu.style.padding = '';
        navMenu.style.boxShadow = '';
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else if (!navMenu.classList.contains('active')) {
        navMenu.style.display = 'none';
    }
});

// Initial check for mobile menu
if (window.innerWidth < 768) {
    navMenu.style.display = 'none';
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg img');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

console.log('PrintPro website loaded successfully!');
