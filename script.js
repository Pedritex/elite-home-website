// Elite Home Website Scripts
console.log("Elite Home Website Loaded");

/* ===== STICKY HEADER ===== */
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* ===== MOBILE MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

/* ===== HERO SLIDER ===== */
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

if (slides.length > 0) {
    setInterval(nextSlide, 6000);
}

/* ===== COUNTER ANIMATION ===== */
const statsSection = document.getElementById('stats');
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateCounters() {
    statNumbers.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + (target < 100 && target > 15 ? "" : "");
            }
        };
        updateCounter();
    });
}

window.addEventListener('scroll', () => {
    if (!statsSection) return;
    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos && !animated) {
        animateCounters();
        animated = true;
    }
});

/* ===== TESTIMONIAL SLIDER ===== */
const testimonialSlider = document.getElementById('testimonialSlider');
const testimonialDots = document.getElementById('testimonialDots');
const testimonialCards = document.querySelectorAll('.testimonial-card');

if (testimonialSlider && testimonialCards.length > 0) {
    // Create dots
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        testimonialDots.appendChild(dot);
    });

    let currentTestimonial = 0;
    const dots = document.querySelectorAll('.dot');

    function goToTestimonial(index) {
        testimonialCards[currentTestimonial].classList.remove('active');
        dots[currentTestimonial].classList.remove('active');
        
        currentTestimonial = index;
        
        testimonialCards[currentTestimonial].classList.add('active');
        dots[currentTestimonial].classList.add('active');
    }

    // Auto slide
    setInterval(() => {
        let next = (currentTestimonial + 1) % testimonialCards.length;
        goToTestimonial(next);
    }, 8000);
}

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'ENVIANDO...';
        btn.disabled = true;

        setTimeout(() => {
            alert('¡Gracias! Hemos recibido tu mensaje. Nos pondremos en contacto contigo lo antes posible.');
            contactForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

/* ===== SMOOTH SCROLL FOR ALL ANCHORS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
