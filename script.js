let data = null;

fetch("data/content.json")
  .then(res => res.json())
  .then(data => {
    loadAbout(data);
    loadSkills(data.skills);
    loadProjects(data.projects);
    loadExperience(data.experience);
    loadCertifications(data.certifications);
    loadContact(data.contact);
  });
 
  function renderCertificates() {
  const grid = document.querySelector(".cert-grid");
  if (!grid || !data.certifications) return;

  grid.innerHTML = "";

  data.certifications.forEach(cert => {
    const card = document.createElement("div");
    card.className = "cert-card";

    card.innerHTML = `
      <img src="assets/images/certificates/${cert.image}" alt="${cert.name}">
      <div class="cert-body">
        <h3>${cert.name}</h3>
        <p class="issuer">${cert.issuer}</p>
        <p class="date">${cert.year}</p>

        <div class="tags">
          ${cert.skills.map(s => `<span class="tag">${s}</span>`).join("")}
        </div>

        <a class="view-link" href="${cert.link}" target="_blank">
          View Credential ↗
        </a>
      </div>
    `;

    grid.appendChild(card);
  });
}

fetch("data/content.json")
  .then(response => response.json())
  .then(data => {
    loadAbout(data);
    loadSkills(data.skills);
    loadProjects(data.projects);
    loadExperience(data.experience);
    loadCertifications(data.certifications);
    loadContact(data.contact);
  });

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15
  }
);

document.querySelectorAll(".fade-up").forEach(el => {
  observer.observe(el);
});

function loadAbout(data) {
  document.getElementById("about").innerHTML = `
    <section class="section">
      <h2>${data.about.title}</h2>
      <p>${data.about.description.replace(/\n/g, "<br><br>")}</p>
    </section>
  `;
}

function loadSkills(skills) {
  const html = skills.map(skill => `
    <div class="card">
      <h3>${skill.category}</h3>
      ${skill.items.map(item => `
        <p>${item.name}</p>
        <div class="bar">
          <span style="width:${item.level}%"></span>
        </div>
      `).join("")}
    </div>
  `).join("");

  document.getElementById("skills").innerHTML = `
    <section class="section">
      <h2>Skills</h2>
      <div class="grid">${html}</div>
    </section>
  `;
}

function loadProjects(projects) {
  document.getElementById("projectsSubtitle").innerText =
    projects.subtitle;

  const p = projects.featured;

  document.getElementById("featuredProject").innerHTML = `
    <div class="featured-card">
      <div class="featured-header">
        <div class="icon">🛡️</div>
        <div>
          <span class="featured-label">FEATURED PROJECT</span>
          <h3>${p.name}</h3>
        </div>
        <span class="status">${p.status}</span>
      </div>

      <p class="project-desc">${p.description}</p>

      <div class="tags">
        ${p.tags
          .map(
            t => `<span class="tag ${t.color}">${t.label}</span>`
          )
          .join("")}
      </div>

      <div class="project-actions">
        <a href="${p.codeLink}" target="_blank" class="btn primary">
          View Code ↗
        </a>
        <a href="${p.detailsLink}" class="btn outline">
          Project Details
        </a>
      </div>
    </div>
  `;
}

function loadCertifications(certs) {
  const grid = document.querySelector(".cert-grid");
  if (!grid || !certs) return;

  grid.innerHTML = "";

  certs.forEach(cert => {
    const card = document.createElement("div");
    card.className = "cert-card fade-up";

    card.innerHTML = `
      <img src="${cert.image}" alt="${cert.name}">
      <div class="cert-body">
        <h3>${cert.name}</h3>
        <p class="issuer">${cert.issuer}</p>
        <p class="date">${cert.year}</p>

        <div class="tags">
          ${cert.skills.map(s => `<span class="tag">${s}</span>`).join("")}
        </div>

        <a class="view-link" href="${cert.link}" target="_blank">
          View Credential ↗
        </a>
      </div>
    `;

    grid.appendChild(card);
    observer.observe(card);
  });
}

function loadContact(contact) {
  document.getElementById("contact").innerHTML = `
    <section class="section">
      <h2>Contact</h2>

      <form class="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea rows="5" placeholder="Your Message" required></textarea>
        <button class="btn primary">Send Message</button>
      </form>

      <div class="contact-links">
        <a href="${contact.linkedin}" target="_blank">LinkedIn</a>
        <a href="${contact.github}" target="_blank">GitHub</a>
        <a href="${contact.instagram}" target="_blank">Instagram</a>
        <p>Email: ${contact.email}</p>
      </div>
    </section>
  `;
}

function loadExperience(experience) {
  const html = experience.map(item => `
    <div class="timeline-item fade">
      <span class="timeline-dot"></span>
      <div class="timeline-card">
        <span class="year">${item.year}</span>
        <h3>${item.title}</h3>
        <p class="type">${item.type}</p>
        <p>${item.description}</p>
      </div>
    </div>
  `).join("");

  document.getElementById("experience").innerHTML = `
    <section class="section">
      <h2>Experience</h2>
      <div class="timeline">
        ${html}
      </div>
    </section>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade").forEach(el => observer.observe(el));
});

// =========================
// Hero interactions (lightweight)
// Smooth scroll, rotating/typing role, entrance animation
// =========================

function initHeroInteractions() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Entrance animation for hero-inner
  const heroInner = document.querySelector('.hero-inner');
  if (heroInner) {
    if (prefersReduced) {
      heroInner.classList.add('is-visible');
    } else {
      // small delay for nicer sequencing
      window.requestAnimationFrame(() => {
        setTimeout(() => heroInner.classList.add('is-visible'), 120);
      });
    }
  }

  // Smooth scroll for in-page hero links (hash targets)
  const heroLinks = document.querySelectorAll('.hero-cta a[href^="#"]');
  heroLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
      // update focus for accessibility
      if (!prefersReduced) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  // Rotating / typing role text (lightweight)
  const roleEl = document.querySelector('.hero-role');
  if (!roleEl) return;

  const roles = [
    'AI & Cybersecurity Developer',
    'Security-focused ML Engineer',
    'Full-stack Web Engineer'
  ];

  // Prepare DOM
  roleEl.innerHTML = '<span class="role-text"></span><span class="role-cursor" aria-hidden="true"></span>';
  const textEl = roleEl.querySelector('.role-text');

  let idx = 0;

  function typeAndHold(text, cb) {
    if (prefersReduced) { textEl.textContent = text; if (cb) cb(); return; }
    textEl.textContent = '';
    let i = 0;
    const speed = 40; // ms per char
    function step() {
      if (i < text.length) {
        textEl.textContent += text.charAt(i++);
        setTimeout(step, speed);
      } else {
        // hold then callback
        setTimeout(() => cb && cb(), 1000);
      }
    }
    step();
  }

  function cycle() {
    const next = roles[idx % roles.length];
    typeAndHold(next, () => {
      if (prefersReduced) return; // stop cycling
      // delete effect (fast)
      let cur = textEl.textContent;
      let j = cur.length;
      const delSpeed = 30;
      function delStep() {
        if (j > 0) {
          textEl.textContent = cur.slice(0, --j);
          setTimeout(delStep, delSpeed);
        } else {
          idx++;
          setTimeout(cycle, 160);
        }
      }
      setTimeout(delStep, 600);
    });
  }

  // start
  cycle();
}

document.addEventListener('DOMContentLoaded', initHeroInteractions);
const canvas = document.getElementById("ocean");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 0.5;
    this.speed = Math.random() * 0.3 + 0.1;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  move() {
    this.y -= this.speed;
    if (this.y < 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(34, 211, 238, ${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.floor(window.innerWidth / 10);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.move();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

const footerIcons = document.getElementById("footerSocialIcons");

if (data && data.contact && data.contact.socials && footerIcons) {
  data.contact.socials.forEach(item => {
    const link = document.createElement("a");
    link.href = item.url;
    link.target = "_blank";
    link.innerHTML = `<i class="${item.icon}"></i>`;
    footerIcons.appendChild(link);
  });
}

function initCertificates() {
  const certGrid = document.querySelector(".cert-grid");
  if (!certGrid || !data?.certifications) return;

  certGrid.innerHTML = "";

  data.certifications.forEach(cert => {
    certGrid.innerHTML += `
      <div class="cert-card">
        <img src="${cert.image}" alt="${cert.name}">
        <div class="cert-body">
          <h3>${cert.name}</h3>
          <p class="issuer">${cert.issuer}</p>
          <p class="date">${cert.year}</p>

          <div class="tags">
            ${cert.skills.map(s => `<span class="tag">${s}</span>`).join("")}
          </div>

          <a class="view-link" href="${cert.link}" target="_blank">
            View Credential ↗
          </a>
        </div>
      </div>
    `;
  });
}

const certScroll = document.querySelector(".cert-scroll");
const leftArrow = document.querySelector(".cert-arrow.left");
const rightArrow = document.querySelector(".cert-arrow.right");

if (certScroll && leftArrow && rightArrow) {
  const scrollAmount = 360;

  leftArrow.addEventListener("click", () => {
    certScroll.scrollLeft -= scrollAmount;
  });

  rightArrow.addEventListener("click", () => {
    certScroll.scrollLeft += scrollAmount;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector(".cert-scroll");
  const leftArrow = document.querySelector(".cert-arrow.left");
  const rightArrow = document.querySelector(".cert-arrow.right");

  if (!scrollContainer || !leftArrow || !rightArrow) return;

  const scrollAmount = 380;

  leftArrow.addEventListener("click", () => {
    scrollContainer.scrollBy({
      left: -scrollAmount,
      behavior: "smooth"
    });
  });

  rightArrow.addEventListener("click", () => {
    scrollContainer.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
  });

function updateArrows() {
  const maxScroll =
    scrollContainer.scrollWidth - scrollContainer.clientWidth - 5;

  // LEFT
  if (scrollContainer.scrollLeft <= 0) {
    leftArrow.classList.add("hidden");
  } else {
    leftArrow.classList.remove("hidden");
  }

  // RIGHT
  if (scrollContainer.scrollLeft >= maxScroll) {
    rightArrow.classList.add("hidden");
  } else {
    rightArrow.classList.remove("hidden");
  }
}

scrollContainer.addEventListener("scroll", updateArrows);
updateArrows(); // run on load


function updateArrows() {
  // Hide LEFT arrow at start
  if (scrollContainer.scrollLeft <= 0) {
    leftArrow.style.opacity = "0";
    leftArrow.style.pointerEvents = "none";
  } else {
    leftArrow.style.opacity = "1";
    leftArrow.style.pointerEvents = "auto";
  }

  // Hide RIGHT arrow at end
  if (
    scrollContainer.scrollLeft + scrollContainer.clientWidth >=
    scrollContainer.scrollWidth - 5
  ) {
    rightArrow.style.opacity = "0";
    rightArrow.style.pointerEvents = "none";
  } else {
    rightArrow.style.opacity = "1";
    rightArrow.style.pointerEvents = "auto";
  }
}


scrollContainer.addEventListener("scroll", updateArrows);
updateArrows();});
