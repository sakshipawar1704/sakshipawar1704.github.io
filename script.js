/* =========================
   Feature 2: Typed.js Premium Typing Animation
========================= */

if (document.getElementById("typing")) {
  new Typed("#typing", {
    strings: [
      "Web Developer",
      "MERN Stack Developer",
      "AI Enthusiast",
      "Frontend Designer",
    ],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 1400,
    startDelay: 300,
    loop: true,
    showCursor: true,
    cursorChar: "|",
  });
}

/* =========================
   Feature 3: Animated Counters
========================= */

function animateCounter(el, target, isDecimal) {
  const duration = 1600;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = target * eased;

    el.textContent = isDecimal ? value.toFixed(2) : Math.round(value);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = isDecimal ? target.toFixed(2) : target;
    }
  }

  requestAnimationFrame(step);
}

const statItems = document.querySelectorAll(".stat-item");

if (statItems.length) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const counterEl = el.querySelector(".counter");
          const target = parseFloat(el.dataset.target);
          const isDecimal = el.dataset.decimal === "true";

          animateCounter(counterEl, target, isDecimal);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.4 },
  );

  statItems.forEach((item) => counterObserver.observe(item));
}

/* =========================
   Feature 4: GSAP Scroll Animations
   (driven by IntersectionObserver instead of
   ScrollTrigger's pixel math, so reveals always
   fire correctly even as page height changes)
========================= */

if (window.gsap) {
  function revealOnScroll(selector, options = {}) {
    const els = Array.from(document.querySelectorAll(selector));
    if (!els.length) return;

    const {
      x = 0,
      y = x === 0 ? 40 : 0,
      duration = 0.8,
      stagger = 0,
      ease = "power3.out",
    } = options;

    gsap.set(els, { opacity: 0, x, y });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const index = els.indexOf(el);

          gsap.to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            delay: stagger * index,
            ease,
            clearProps: "transform",
          });

          obs.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    els.forEach((el) => observer.observe(el));
  }

  revealOnScroll(".section-title", { y: 40 });
  revealOnScroll(".section-subtitle", { y: 20, duration: 0.6 });

  // About section
  revealOnScroll(".terminal-card", { x: -40 });
  revealOnScroll(".fact-chip", { y: 20, duration: 0.6, stagger: 0.12 });
  revealOnScroll(".about-text", { x: 40 });
  revealOnScroll(".about-tags span", { y: 15, duration: 0.5, stagger: 0.08 });

  // Education
  revealOnScroll(".timeline .item", { y: 40, stagger: 0.15 });

  // Skills
  revealOnScroll(".skill-category", { y: 40, stagger: 0.1 });

  // Projects
  revealOnScroll(".project-card", { y: 40, stagger: 0.15 });

  // Certifications
  revealOnScroll(".certificate-card", { y: 40, stagger: 0.15 });

  // Stats
  revealOnScroll(".stat-item", { y: 30, duration: 0.7, stagger: 0.12 });

  // Contact
  revealOnScroll(".contact-info", { x: -40 });
  revealOnScroll(".contact-card", { y: 20, duration: 0.6, stagger: 0.12 });
  revealOnScroll("#contact-form", { x: 40 });
}

/* =========================
   Feature 6: Project Modals
========================= */

const modal = document.getElementById("project-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalTech = document.getElementById("modal-tech");
const modalGithub = document.getElementById("modal-github");
const modalClose = document.getElementById("modal-close");

function openProjectModal(card) {
  const { title, image, description, tech, github } = card.dataset;

  modalTitle.textContent = title || "";
  modalImage.src = image || "";
  modalImage.alt = title || "";
  modalDescription.textContent = description || "";
  modalGithub.href = github || "#";

  modalTech.innerHTML = "";
  (tech || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .forEach((t) => {
      const span = document.createElement("span");
      span.textContent = t;
      modalTech.appendChild(span);
    });

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => openProjectModal(card));
});

if (modalClose) {
  modalClose.addEventListener("click", closeProjectModal);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeProjectModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeProjectModal();
});

/* =========================
   EmailJS Contact Form
========================= */

emailjs.init("GWG2w72pjL0RDZjRt");

const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = form.querySelector("button");

    btn.innerHTML = "Sending...";
    btn.disabled = true;

    emailjs
      .sendForm(
        "service_vl666d8",

        "template_narzd4o",

        this,
      )

      .then(() => {
        btn.innerHTML = "✓ Message Sent";

        btn.style.background = "#22c55e";

        form.reset();

        setTimeout(() => {
          btn.innerHTML = "Send Message 🚀";

          btn.style.background = "#7C3AED";

          btn.disabled = false;
        }, 3000);
      })

      .catch((error) => {
        console.log("ERROR:", error);

        btn.innerHTML = "Send Message 🚀";

        btn.disabled = false;

        alert("Failed to send message.");
      });
  });
}
