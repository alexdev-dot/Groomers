// Initialize AOS
AOS.init({
  once: true,
  easing: 'ease-in-out',
  duration: 900,
  offset: 100
});

// Hide loader when page loads
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 500);
});

// Navigation scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 80);
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobileMenu');
const navMenu = document.getElementById('navMenu');

mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#navMenu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

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

// Handle contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  // Here you would normally send the data to a server
  // For now, we'll show a success message
  alert('Thank you for your message! We will get back to you soon.');
  this.reset();
});

// Testimonial Carousel
class TestimonialCarousel {
  constructor() {
    this.container = document.getElementById('reviewsContainer');
    this.cards = this.container.querySelectorAll('.review-card');
    this.currentIndex = 0;
    this.cardWidth = 410; // 380px width + 30px gap
    this.autoplayInterval = null;
    this.pauseOnHover = false;
    
    this.init();
  }
  
  getCardWidth() {
    const card = this.cards[0];
    if (!card) return 410;
    
    const cardStyle = window.getComputedStyle(card);
    const cardWidth = parseFloat(cardStyle.width);
    const containerStyle = window.getComputedStyle(this.container);
    const gap = parseFloat(containerStyle.gap) || 30;
    
    return cardWidth + gap;
  }
  
  init() {
    // Clone cards for infinite scroll effect
    this.cloneCards();
    
    // Start autoplay
    this.startAutoplay();
    
    // Pause on hover
    this.setupHoverPause();
    
    // Pause when tab is not visible
    this.setupVisibilityPause();
  }
  
  cloneCards() {
    const fragment = document.createDocumentFragment();
    this.cards.forEach(card => {
      const clone = card.cloneNode(true);
      fragment.appendChild(clone);
    });
    this.container.appendChild(fragment);
  }
  
  moveToNext() {
    this.currentIndex++;
    this.updatePosition();
    
    // Reset to start when we reach the cloned cards
    if (this.currentIndex >= this.cards.length) {
      setTimeout(() => {
        this.container.style.transition = 'none';
        this.currentIndex = 0;
        this.updatePosition();
        
        setTimeout(() => {
          this.container.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
      }, 500);
    }
  }
  
  updatePosition() {
    const currentCardWidth = this.getCardWidth();
    const offset = -this.currentIndex * currentCardWidth;
    this.container.style.transform = `translateX(${offset}px)`;
  }
  
  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      if (!this.pauseOnHover) {
        this.moveToNext();
      }
    }, 4000); // Change every 4 seconds
  }
  
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
  
  setupHoverPause() {
    const reviewsSection = document.getElementById('reviews');
    
    reviewsSection.addEventListener('mouseenter', () => {
      this.pauseOnHover = true;
    });
    
    reviewsSection.addEventListener('mouseleave', () => {
      this.pauseOnHover = false;
    });
  }
  
  setupVisibilityPause() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseOnHover = true;
      } else {
        this.pauseOnHover = false;
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.updatePosition();
    });
  }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TestimonialCarousel();
});
