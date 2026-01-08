// =========================
// MENU
// =========================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// =========================
// TYPEWRITER EFFECT
// =========================
const heroTitle = document.querySelector(".hero h1");
const text = heroTitle.innerHTML; // Use innerHTML to preserve <br> tags
heroTitle.innerHTML = "";
heroTitle.style.visibility = "visible";

let charIndex = 0;

function typeWriter() {
  if (charIndex < text.length) {
    heroTitle.innerHTML += text.charAt(charIndex);
    charIndex++;
    // Velocidad de escritura (ajusta el valor en milisegundos)
    setTimeout(typeWriter, 80);
  }
}

// Iniciar el efecto después de un pequeño delay
setTimeout(typeWriter, 500);

// =========================
// SLIDER / GALLERY
// =========================
const gallery = document.querySelector(".projects-gallery");
const track = document.querySelector(".projects-track");
const dots = document.querySelectorAll(".gallery-dots .dot");
let slides = Array.from(track.children);
const slideGap = 20;
const slideWidth = slides[0].offsetWidth + slideGap;
let index = 0;

// CLONAR SLIDES PARA LOOP
slides.forEach((slide) => {
  const clone = slide.cloneNode(true);
  track.appendChild(clone);
});
slides = Array.from(track.children);

// FUNCION PARA ACTUALIZAR DOTS
function updateDots(i) {
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[i % dots.length].classList.add("active");
}

// FUNCION PARA MOVER SLIDER
function moveSlider() {
  index++;
  track.style.transition = "transform 0.6s ease";
  track.style.transform = `translateX(-${slideWidth * index}px)`;
  updateDots(index);

  if (index === dots.length) {
    setTimeout(() => {
      track.style.transition = "none";
      track.style.transform = `translateX(0)`;
      index = 0;
    }, 600);
  }
}

// AUTO LOOP
setInterval(moveSlider, 2000);

// DOTS CLICK
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i;
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${slideWidth * index}px)`;
    updateDots(index);
  });
});

// =========================
// DARK MODE TOGGLE
// =========================
const toggleButton = document.getElementById("theme-toggle");
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    toggleButton.textContent = "☀️";
  } else {
    toggleButton.textContent = "🌙";
  }
});

// =========================
// INTERSECTION OBSERVER ANIMATIONS
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  const sections = document.querySelectorAll(".fade-up");
  sections.forEach((section) => observer.observe(section));
});
