document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("nav-open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("nav-open"));
});

const header = document.getElementById("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const current = window.scrollY;
  if (current <= 10) {
    header.classList.remove("hidden", "scrolled");
  } else if (current > lastScroll && current > 80) {
    header.classList.add("hidden");
    navLinks.classList.remove("nav-open");
  } else {
    header.classList.remove("hidden");
    header.classList.add("scrolled");
  }
  lastScroll = current;
});

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((s) => observer.observe(s));

const styleTag = document.createElement("style");
styleTag.textContent = ".visible { opacity: 1 !important; transform: translateY(0) !important; }";
document.head.appendChild(styleTag);

const cards = document.querySelectorAll(".project-card, .timeline-item, .skills-card, .contact-card");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

cards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(18px)";
  card.style.transition = "opacity 0.45s ease, transform 0.45s ease";
  fadeObserver.observe(card);
});