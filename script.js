// Global Variables
let userLocation = null;
let isInTurkey = false;

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const locationText = document.getElementById('location-text');
const currencyDisplay = document.getElementById('currency-display');
const mainPrice = document.getElementById('main-price');
const mainCurrency = document.getElementById('main-currency');
const additionalPrice = document.getElementById('additional-price');
const additionalCurrency = document.getElementById('additional-currency');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Get User Location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                // Reverse geocoding to get country
                fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=tr`)
                    .then(response => response.json())
                    .then(data => {
                        userLocation = data;
                        const country = data.countryName;
                        const city = data.city || data.locality;
                        
                        // Check if user is in Turkey
                        isInTurkey = country === 'Turkey' || country === 'Türkiye' || data.countryCode === 'TR';
                        
                        // Update location display
                        locationText.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${city}, ${country}`;
                        
                        // Update pricing based on location
                        updatePricing();
                    })
                    .catch(error => {
                        console.log('Konum servisi hatası:', error);
                        // Default to Turkey pricing if location fails
                        locationText.innerHTML = '<i class="fas fa-map-marker-alt"></i> Konum belirlenemedi';
                        isInTurkey = true;
                        updatePricing();
                    });
            },
            error => {
                console.log('Konum erişim hatası:', error);
                // Default to Turkey pricing if location access denied
                locationText.innerHTML = '<i class="fas fa-map-marker-alt"></i> Konum erişimi reddedildi';
                isInTurkey = true;
                updatePricing();
            }
        );
    } else {
        locationText.innerHTML = '<i class="fas fa-map-marker-alt"></i> Konum desteklenmiyor';
        isInTurkey = true;
        updatePricing();
    }
}

// Update Pricing Based on Location
function updatePricing() {
    if (isInTurkey) {
        // Turkey pricing in TL
        currencyDisplay.textContent = 'TL';
        mainPrice.textContent = '500';
        mainCurrency.textContent = '₺';
        additionalPrice.textContent = '50';
        additionalCurrency.textContent = '₺';
    } else {
        // International pricing in EUR
        currencyDisplay.textContent = 'EUR';
        mainPrice.textContent = '100';
        mainCurrency.textContent = '€';
        additionalPrice.textContent = '25';
        additionalCurrency.textContent = '€';
    }
    
    // Add animation to price change
    animatePriceChange();
}

// Animate Price Change
function animatePriceChange() {
    const priceElements = [mainPrice, additionalPrice];
    priceElements.forEach(element => {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#00ff88';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '#00d4ff';
        }, 300);
    });
}

// Typing Animation for Hero Title
function typeWriter() {
    const text = "Profesyonel Web Geliştirme";
    const typingElement = document.querySelector('.typing-text');
    let i = 0;
    
    function type() {
        if (i < text.length) {
            typingElement.textContent = text.substring(0, i + 1);
            i++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                i = 0;
                typingElement.textContent = '';
                type();
            }, 2000);
        }
    }
    
    type();
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Floating Animation for Code Elements
function initFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.floating-code span');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        
        // Add random floating effect
        setInterval(() => {
            const randomY = Math.random() * 10 - 5;
            const randomX = Math.random() * 10 - 5;
            element.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 2000 + index * 500);
    });
}

// Particle Effect for Background
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(0, 212, 255, 0.5);
        border-radius: 50%;
        animation: particleFloat ${Math.random() * 10 + 5}s linear infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 15000);
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Add hover effects to service cards
function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add pricing card hover effects
function initPricingCardEffects() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'none';
        });
    });
}

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00d4ff, #0099cc);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
        window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Add cursor trail effect
function initCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(0, 212, 255, ${1 - i / trailLength});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 10);
        });
    });
}

// Logo animation effects
function initLogoAnimations() {
    const logoContainer = document.querySelector('.logo-container');
    const logoImg = document.querySelector('.logo-container img');
    
    if (logoContainer && logoImg) {
        // Add click effect to logo
        logoImg.addEventListener('click', () => {
            logoImg.style.transform = 'scale(1.1) rotate(360deg)';
            setTimeout(() => {
                logoImg.style.transform = 'scale(1) rotate(0deg)';
            }, 500);
        });
        
        // Add pulse effect on hover
        logoContainer.addEventListener('mouseenter', () => {
            logoImg.style.animation = 'logoFloat 1s ease-in-out infinite';
        });
        
        logoContainer.addEventListener('mouseleave', () => {
            logoImg.style.animation = 'logoFloat 3s ease-in-out infinite';
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    getUserLocation();
    typeWriter();
    initScrollAnimations();
    initFloatingAnimations();
    createParticles();
    initServiceCardEffects();
    initPricingCardEffects();
    initScrollProgress();
    initCursorTrail();
    initLogoAnimations();
    
    // Continuously create new particles
    setInterval(() => {
        const container = document.querySelector('.particles');
        if (container && container.children.length < 50) {
            createParticle(container);
        }
    }, 1000);
});

// Add smooth reveal animations for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.pageYOffset;
        
        if (scrolled > (sectionTop - windowHeight + sectionHeight / 3)) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

// Scroll event listener - Video parallax kaldırıldı
window.addEventListener('scroll', () => {
    // Navbar effect
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
    
    // Section reveal animations
    revealSections();
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Console welcome message
console.log(`
🦅 Kartal Kod'a Hoş Geldiniz! 🦅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Profesyonel web geliştirme hizmetleri
📧 kartalkod00@gmail.com
📱 @zafer_varol08
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
