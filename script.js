// DOM Elements
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

// Mobile Menu Toggle
mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Active Navigation Link Highlighting
function updateActiveNavLink() {
  let current = "";
  const scrollPosition = window.pageYOffset;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    const isLastSection = index === sections.length - 1;

    // Check if we're in the normal range of the section
    const inSectionRange =
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight;

    // For the last section, also check if we're near the bottom of the page
    const nearBottomOfPage =
      isLastSection && scrollPosition + windowHeight >= documentHeight - 50;

    if (inSectionRange || nearBottomOfPage) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Typing Animation
class TypeWriter {
  constructor(element, words, wait = 3000) {
    this.element = element;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialize Typing Animation
document.addEventListener("DOMContentLoaded", () => {
  const typedSubtitle = document.getElementById("typed-subtitle");
  if (typedSubtitle) {
    const words = [
      "Full Stack Developer",
      "UI/UX Designer",
      "Problem Solver",
      "Creative Thinker",
    ];
    new TypeWriter(typedSubtitle, words, 2000);
  }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe elements for scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".skill-item, .project-card, .contact-item, .about-description"
  );

  animatedElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
}

// Parallax Effect for Hero Section
function parallaxEffect() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".floating-element");

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
}

// Navbar Background on Scroll
function updateNavbarBackground() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)";
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)";
  }
}

// Smooth Scroll to Top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Form Handling
function initFormHandling() {
  const form = document.querySelector(".form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const name = form.querySelector('input[type="text"]').value;
      const email = form.querySelector('input[type="email"]').value;
      const message = form.querySelector("textarea").value;

      // Simple validation
      if (!name || !email || !message) {
        showNotification("Please fill in all fields", "error");
        return;
      }

      // Simulate form submission
      showNotification("Message sent successfully!", "success");
      form.reset();
    });
  }
}

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${
          type === "success" ? "var(--primary-color)" : "var(--secondary-color)"
        };
        color: var(--bg-primary);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;

  // Add close functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;

  closeBtn.addEventListener("click", () => {
    notification.remove();
  });

  // Add to DOM
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// Add notification animation styles
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Event Listeners
window.addEventListener(
  "scroll",
  throttle(() => {
    updateActiveNavLink();
    updateNavbarBackground();
    parallaxEffect();
  }, 16)
); // ~60fps

window.addEventListener(
  "resize",
  debounce(() => {
    // Handle resize events if needed
    updateActiveNavLink();
  }, 250)
);

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  initFormHandling();

  // Add loading animation
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease-in";
    document.body.style.opacity = "1";
  }, 100);
});

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  // ESC key closes mobile menu
  if (e.key === "Escape") {
    mobileMenu.classList.remove("active");
    navMenu.classList.remove("active");
  }

  // Arrow keys for navigation (optional)
  if (e.key === "ArrowUp" && e.ctrlKey) {
    e.preventDefault();
    scrollToTop();
  }
});

// Add smooth hover effects for interactive elements
function addHoverEffects() {
  const interactiveElements = document.querySelectorAll(
    ".btn, .project-card, .skill-item, .social-link"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    });
  });
}

// Initialize hover effects
document.addEventListener("DOMContentLoaded", addHoverEffects);

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty("--transition", "all 0.2s ease");
}

// Add focus management for accessibility
function initAccessibility() {
  // Skip to main content link
  const skipLink = document.createElement("a");
  skipLink.href = "#home";
  skipLink.textContent = "Skip to main content";
  skipLink.className = "skip-link";
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: var(--bg-primary);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1002;
        transition: top 0.3s;
    `;

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px";
  });

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Focus management for mobile menu
  const firstNavLink = navMenu.querySelector(".nav-link");
  const lastNavLink = navMenu.querySelector(".nav-link:last-child");

  mobileMenu.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      setTimeout(() => firstNavLink.focus(), 100);
    }
  });
}

// Initialize accessibility features
document.addEventListener("DOMContentLoaded", initAccessibility);

// Console welcome message
console.log(
  `
%c🚀 Welcome to the Portfolio Site! %c
%cBuilt with modern web technologies
%c• Semantic HTML5
• Modern CSS with custom properties
• Vanilla JavaScript
• Responsive design
• Accessibility features

%cFeel free to explore the code!
`,
  "color: #00ff88; font-size: 16px; font-weight: bold;",
  "",
  "color: #4ecdc4; font-size: 14px;",
  "color: #b0b0b0; font-size: 12px;",
  "color: #00ff88; font-size: 12px;"
);
