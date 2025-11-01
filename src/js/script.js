// =================== THEME TOGGLE ===================
const checkbox = document.getElementById("switch");
const html = document.documentElement;

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", currentTheme);
if (currentTheme === "dark") {
  checkbox.checked = true;
}

checkbox.addEventListener("change", function () {
  if (this.checked) {
    html.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

// =================== HAMBURGER MENU ===================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when clicking on a nav link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// =================== NAVBAR SCROLL EFFECT ===================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// =================== SCROLL SPY & ACTIVE NAV LINKS ===================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let current = "";
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
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

window.addEventListener("scroll", updateActiveLink);

// =================== SCROLL DOTS NAVIGATION (Desktop) ===================
const scrollDotsContainer = document.createElement("div");
scrollDotsContainer.className = "scroll-dots";

const sectionData = [
  { id: "hero", name: "Home" },
  { id: "about", name: "About" },
  { id: "skills", name: "Skills" },
  { id: "experience", name: "Experience" },
  { id: "projects", name: "Projects" },
  { id: "contact", name: "Contact" }
];

sectionData.forEach((section) => {
  const dot = document.createElement("div");
  dot.className = "scroll-dot";
  dot.setAttribute("data-section", section.id);
  
  const tooltip = document.createElement("span");
  tooltip.className = "scroll-dot-tooltip";
  tooltip.textContent = section.name;
  dot.appendChild(tooltip);
  
  dot.addEventListener("click", () => {
    document.getElementById(section.id).scrollIntoView({ behavior: "smooth" });
  });
  
  scrollDotsContainer.appendChild(dot);
});

document.body.appendChild(scrollDotsContainer);

// Update active dot on scroll
function updateActiveDot() {
  let current = "";
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 300) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".scroll-dot").forEach((dot) => {
    dot.classList.remove("active");
    if (dot.getAttribute("data-section") === current) {
      dot.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveDot);

// =================== MOBILE SCROLL PROGRESS BAR ===================
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
document.body.appendChild(progressBar);

function updateProgressBar() {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  document.querySelector(".scroll-progress-bar").style.width = scrolled + "%";
}

window.addEventListener("scroll", updateProgressBar);

// =================== BACK TO TOP BUTTON ===================
const backToTop = document.createElement("div");
backToTop.className = "back-to-top";
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =================== TYPING ANIMATION ===================
const typingText = "Building scalable backend systems, data pipelines, and intelligent solutions with clean, maintainable code.";
const typingElement = document.querySelector(".hero-description");
let charIndex = 0;

function typeWriter() {
  if (charIndex < typingText.length) {
    typingElement.textContent = typingText.substring(0, charIndex + 1);
    charIndex++;
    setTimeout(typeWriter, 50);
  } else {
    // Add blinking cursor after typing is complete
    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";
    typingElement.appendChild(cursor);
    
    // Remove cursor after 3 seconds
    setTimeout(() => {
      cursor.style.display = "none";
    }, 3000);
  }
}

// Start typing animation when page loads
window.addEventListener("load", () => {
  typingElement.textContent = "";
  setTimeout(typeWriter, 500);
});

// =================== PARALLAX EFFECT FOR HERO ===================
const profileImage = document.querySelector(".profile-image");
const gradientBlobs = document.querySelectorAll(".gradient-blob");

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  // Profile image parallax (3D tilt effect)
  if (profileImage && window.innerWidth > 768) {
    const moveX = (mouseX - 0.5) * 20;
    const moveY = (mouseY - 0.5) * 20;
    profileImage.style.transform = `translateY(0) perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
  }
  
  // Gradient blobs parallax
  gradientBlobs.forEach((blob, index) => {
    const speed = (index + 1) * 0.5;
    const moveX = (mouseX - 0.5) * 50 * speed;
    const moveY = (mouseY - 0.5) * 50 * speed;
    blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

// =================== SCROLL ANIMATIONS ===================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("skills-grid")) {
        // Stagger animation for all skill cards in this grid
        const cards = entry.target.querySelectorAll(".skill-card");
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("animate");
          }, index * 100);
        });
        observer.unobserve(entry.target);
      } else if (entry.target.classList.contains("projects-grid")) {
        // Stagger animation for project cards
        const cards = entry.target.querySelectorAll(".project-card");
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("animate");
          }, index * 150);
        });
        observer.unobserve(entry.target);
      } else {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

// Observe all skills grids
document.querySelectorAll(".skills-grid").forEach((grid) => {
  observer.observe(grid);
});

// Observe projects grid
const projectsGrid = document.querySelector(".projects-grid");
if (projectsGrid) {
  observer.observe(projectsGrid);
}

// Observe timeline items
document.querySelectorAll(".timeline-item").forEach((item) => {
  observer.observe(item);
});

// =================== RESUME MODAL ===================
const resumeBtn = document.getElementById("resumeBtn");
const modal = document.getElementById("resumeModal");
const modalClose = document.querySelector(".modal-close");

if (resumeBtn && modal) {
  resumeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

// =================== FOOTER YEAR ===================
const dateElement = document.getElementById("datee");
if (dateElement) {
  dateElement.textContent = new Date().getFullYear();
}

// =================== SMOOTH SCROLL FOR ALL ANCHOR LINKS ===================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});