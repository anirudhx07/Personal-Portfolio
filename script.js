let data = null;

fetch("data/content.json")
  .then(res => res.json())
  .then(payload => {
    data = payload; // cache globally for functions that may use it
    loadAbout(data);
    loadSkills(data.skills);
    loadProjects(data.projects);
    // initialize GitHub Activity section (populates links if available)
    try { loadGithubSection(); } catch (e) { /* ignore if function missing */ }
    loadExperience(data.experience);
    loadCertifications(data.certifications);
    loadContact(data.contact);
  })
  .catch(err => console.error('Failed to load content.json', err));

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

// Redesigned About Section Viewport Observer
const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        aboutObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

document.querySelectorAll(".about-section").forEach(el => {
  aboutObserver.observe(el);
});

function loadAbout(data) {
  const container = document.getElementById("aboutContent");
  if (!container) return;

  container.innerHTML = `
    <div class="about-layout">
      <!-- Left Column: Terminal Card -->
      <div class="about-left">
        <div class="about-terminal">
          <div class="terminal-topbar">
            <div class="terminal-dots">
              <span class="dot-red"></span>
              <span class="dot-yellow"></span>
              <span class="dot-green"></span>
            </div>
            <div class="terminal-title">about.js</div>
            <div style="width: 48px;"></div>
          </div>
          <pre class="terminal-body"><code><div class="code-line"><span class="line-number">1</span><span class="code-keyword">const</span> <span class="code-property">anirudh</span> <span class="code-syntax">=</span> <span class="code-syntax">{</span></div><div class="code-line"><span class="line-number">2</span>  <span class="code-property">name</span><span class="code-syntax">:</span> <span class="code-string">"Anirudh Kumar"</span><span class="code-syntax">,</span></div><div class="code-line"><span class="line-number">3</span>  <span class="code-property">education</span><span class="code-syntax">:</span> <span class="code-string">"B.Tech CSE (AI/ML)"</span><span class="code-syntax">,</span></div><div class="code-line"><span class="line-number">4</span>  <span class="code-property">university</span><span class="code-syntax">:</span> <span class="code-string">"GLA University"</span><span class="code-syntax">,</span></div><div class="code-line"><span class="line-number">5</span>  <span class="code-property">focus</span><span class="code-syntax">:</span> <span class="code-syntax">[</span></div><div class="code-line"><span class="line-number">6</span>    <span class="code-string">"Machine Learning"</span><span class="code-syntax">,</span></div><div class="code-line"><span class="line-number">7</span>    <span class="code-string">"Cybersecurity"</span><span class="code-syntax">,</span></div><div class="code-line"><span class="line-number">8</span>    <span class="code-string">"Flutter"</span></div><div class="code-line"><span class="line-number">9</span>  <span class="code-syntax">]</span><span class="code-syntax">,</span></div><div class="code-line"><span class="line-number">10</span>  <span class="code-property">alsoKnownFor</span><span class="code-syntax">:</span> <span class="code-syntax">[</span></div><div class="code-line"><span class="line-number">11</span>    <span class="code-string">"Drone Engineering"</span><span class="code-syntax">,</span></div><div class="code-line"><span class="line-number">12</span>    <span class="code-string">"Azure Cloud"</span><span class="code-syntax">,</span></div><div class="code-line"><span class="line-number">13</span>    <span class="code-string">"Competing & Winning"</span></div><div class="code-line"><span class="line-number">14</span>  <span class="code-syntax">]</span><span class="code-syntax">,</span></div><div class="code-line"><span class="line-number">15</span>  <span class="code-property">seeking</span><span class="code-syntax">:</span> <span class="code-string">"Internship Opportunities"</span><span class="code-syntax">,</span></div><div class="code-line"><span class="line-number">16</span>  <span class="code-property">available</span><span class="code-syntax">:</span> <span class="code-boolean">true</span></div><div class="code-line"><span class="line-number">17</span><span class="code-syntax">};</span><span class="code-cursor"></span></div></code></pre>
        </div>
      </div>

      <!-- Right Column: Bio Paragraphs -->
      <div class="about-right">
        <div class="about-bio-wrapper">
          <span class="bio-label">// who I am</span>
          <div class="about-bio">
            <p>A determined B.Tech CSE (AI/ML) student at <span class="bio-highlight">GLA University</span> who builds technology that solves real problems — from <span class="bio-highlight">AI-powered phishing detection</span> to <span class="bio-highlight">mobile neurological screening tools</span>.</p>
            <p>Skilled in Android development (<span class="bio-highlight">Flutter</span>), cloud computing (<span class="bio-highlight">Azure</span>), and <span class="bio-highlight">drone engineering</span>, with a consistent track record of competing and winning.</p>
            <p>Guided by a leadership-first mindset: I take full ownership on stage, in an arena, and behind a keyboard. Actively seeking <span class="bio-highlight">internship opportunities</span> to grow alongside industry professionals.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stat Pills Row -->
    <div class="about-pills-row">
      <div class="about-stat-pill">🎓 B.Tech CSE (AI/ML) · GLA University</div>
      <div class="about-stat-pill">💻 6+ Projects Built</div>
      <div class="about-stat-pill">🤝 Open to Internships</div>
    </div>

    <!-- Open to Work Badge -->
    <div class="about-work-badge">
      <div class="pulse-dot"></div>
      <span>Open to internships & collaborations</span>
    </div>
  `;
}

// Lightweight hook to wire GitHub section links if contact.github exists
function loadGithubSection() {
  const profile = data?.contact?.github;
  if (!profile) return;
  const match = profile.match(/github\.com\/(.+?)(?:\/|$)/i);
  if (!match) return;
  const username = match[1].replace(/\W+$/, '');

  const contrib = document.getElementById('contribGraph');
  const stats = document.getElementById('ghStats');
  const langs = document.getElementById('ghLangs');
  const contribImg = document.getElementById('contribImg');
  const contribLink = document.getElementById('contribLink');
  const statsImg = document.getElementById('statsImg');
  const statsLink = document.getElementById('statsLink');
  const langsImg = document.getElementById('langsImg');
  const langsLink = document.getElementById('langsLink');

  // Build widget URLs
  const contribURL = `https://ghchart.rshah.org/${username}`;
  // use a dark-friendly theme to ensure visibility on the portfolio's dark background
  const statsURL = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true`;
  const langsURL = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&hide_border=true`;

  // Helper to safely preload and swap image source with loading/fallback handling
  function makeFallback(text, w = 600, h = 120) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'><rect width='100%' height='100%' fill='#071026'/><text x='50%' y='50%' fill='#9ca3af' font-family='Inter,Arial,sans-serif' font-size='16' dominant-baseline='middle' text-anchor='middle'>${text}</text></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  const fallbackContrib = makeFallback('Contributions unavailable', 880, 240);
  const fallbackStats = makeFallback('GitHub stats unavailable', 600, 140);
  const fallbackLangs = makeFallback('Top languages unavailable', 600, 100);

  function safeLoad(imgEl, url, linkEl, fallback) {
    if (!imgEl) return;
    const container = imgEl.closest('.gh-card, .contrib-graph') || imgEl.parentElement;
    if (container) container.classList.add('loading');
    imgEl.setAttribute('aria-busy', 'true');
    try { imgEl.loading = 'lazy'; imgEl.decoding = 'async'; } catch (e) {}

    const loader = new Image();
    loader.onload = () => {
      // swap only after fully loaded to avoid layout shifts
      imgEl.src = url;
      if (container) container.classList.remove('loading');
      imgEl.removeAttribute('aria-busy');
    };
    loader.onerror = () => {
      // swap to a readable fallback so the card isn't empty
      if (fallback) imgEl.src = fallback;
      imgEl.classList.add('failed');
      if (container) container.classList.remove('loading');
      imgEl.removeAttribute('aria-busy');
    };
    // start preload
    try { loader.src = url; } catch (e) { loader.onerror(); }

    if (linkEl) {
      linkEl.href = `https://github.com/${username}`;
      linkEl.setAttribute('target', '_blank');
      linkEl.setAttribute('rel', 'noopener');
    }
  }

  // Load widgets immediately, then keep lazy observer as a lightweight fallback
  safeLoad(contribImg, contribURL, contribLink, fallbackContrib);
  safeLoad(statsImg, statsURL, statsLink, fallbackStats);
  safeLoad(langsImg, langsURL, langsLink, fallbackLangs);

  // Load widgets lazily when the section is near viewport
  const widgetObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      // when the graph container enters view, load all widgets
      safeLoad(contribImg, contribURL, contribLink);
      safeLoad(statsImg, statsURL, statsLink);
      safeLoad(langsImg, langsURL, langsLink);
      obs.disconnect();
    });
  }, { rootMargin: '300px 0px' });

  const triggerEl = document.getElementById('github-activity') || contrib;
  if (triggerEl) widgetObserver.observe(triggerEl);

  // still register fade-up elements for reveal animations
  document.querySelectorAll('#github-activity .fade-up').forEach(el => { if (observer) observer.observe(el); });
}

function loadSkills(skills) {
  const categoryIcons = {
    Frontend: "layout-grid",
    Backend: "server",
    Cybersecurity: "shield",
    "AI/ML": "brain"
  };

  const skillIcons = {
    HTML: "code-2",
    CSS: "paintbrush",
    JavaScript: "braces",
    React: "atom",
    Python: "terminal",
    Flask: "flask-conical",
    "Node.js": "workflow",
    MySQL: "database",
    "Burp Suite": "shield-check",
    Nmap: "radar",
    Wireshark: "waves",
    Linux: "monitor-cog",
    Pandas: "table-2",
    "Scikit-learn": "search",
    "TensorFlow Basics": "brain-circuit"
  };

  const html = skills.map(skill => `
    <div class="skill-card fade-up">
      <div class="skill-card-header">
        <span class="skill-card-icon" aria-hidden="true"><i data-lucide="${categoryIcons[skill.category] || 'badge-info'}"></i></span>
        <h3>${skill.category}</h3>
      </div>
      <div class="skill-badges" aria-label="${skill.category} skills">
        ${skill.items.map(item => `
          <span class="skill-badge">
            <i class="skill-badge-icon" data-lucide="${skillIcons[item.name] || 'sparkles'}" aria-hidden="true"></i>
            <span>${item.name}</span>
          </span>
        `).join("")}
      </div>
    </div>
  `).join("");

  const skillsContainer = document.getElementById("skillsContent");
  if (skillsContainer) {
    skillsContainer.innerHTML = `<div class="skills-grid">${html}</div>`;
    const newEls = skillsContainer.querySelectorAll('.fade-up');
    newEls.forEach(el => observer.observe(el));
  }
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

function loadProjects(projects) {
  // set a subtitle if provided by content.json — do not overwrite project grid markup
  const subtitleEl = document.getElementById("projectsSubtitle");
  if (subtitleEl && projects.subtitle) subtitleEl.innerText = projects.subtitle;

  // initialize interactions (filtering, lazy images, animations)
  try {
    initProjectInteractions();
  } catch (e) {
    console.warn('initProjectInteractions error', e);
  }
}

/* Project interactions: filtering, lazy-load images, and reveal animations */
function initProjectInteractions() {
  // Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = Array.from(document.querySelectorAll('.project-card'));

  function applyFilter(filter) {
    cards.forEach(card => {
      const cat = card.dataset.category || 'all';
      if (filter === 'all' || cat === filter) {
        card.classList.remove('filtered-out');
        card.style.display = '';
        // ensure reveal observer re-adds show class
        if (typeof observer !== 'undefined') observer.observe(card);
      } else {
        card.classList.add('filtered-out');
        // hide after animation so layout transitions smoothly
        setTimeout(() => { card.style.display = 'none'; }, 280);
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed','true');
      applyFilter(btn.dataset.filter);
    });
  });

  // Lazy-load project images with IntersectionObserver
  const imgs = document.querySelectorAll('.project-thumb-img');
  const imgObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const img = en.target;
      const src = img.dataset.src;
      if (src) {
        const fallbackSrc = img.getAttribute('src') || '';
        img.src = src;
        img.onload = () => img.classList.add('loaded');
        img.onerror = () => {
          if (fallbackSrc && img.src !== fallbackSrc) {
            img.src = fallbackSrc;
          }
          img.classList.add('loaded');
        };
        img.removeAttribute('data-src');
      }
      obs.unobserve(img);
    });
  }, { rootMargin: '200px 0px' });

  imgs.forEach(i => imgObserver.observe(i));

  // Ensure keyboard accessibility for filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  // initial reveal for cards already in view
  cards.forEach(c => { if (typeof observer !== 'undefined') observer.observe(c); });
}

// ensure interactions are initialized on DOM load if content.json already called loadProjects earlier
document.addEventListener('DOMContentLoaded', () => {
  try { initProjectInteractions(); } catch (e) { /* ignore */ }
});

function loadCertifications(certs) {
  const grid = document.querySelector(".cert-grid");
  if (!grid || !certs) return;

  grid.innerHTML = "";

  certs.forEach(cert => {
    const card = document.createElement("div");
    card.className = "cert-card fade-up";

    card.innerHTML = `
      <img src="${cert.image}" alt="${cert.name} certification" loading="lazy">
      <div class="cert-body">
        <h3>${cert.name}</h3>
        <p class="issuer">${cert.issuer}</p>
        <p class="date">${cert.year}</p>

        <div class="tags">
          ${cert.skills.map(s => `<span class="tag">${s}</span>`).join("")}
        </div>

        <a class="view-link" href="${cert.link}" target="_blank" rel="noopener">
          View Credential ↗
        </a>
      </div>
    `;

    grid.appendChild(card);
    observer.observe(card);
  });
}

function loadContact(contact) {
  const contactContainer = document.getElementById('contactContent');
  if (contactContainer) {
    contactContainer.innerHTML = `
      <form class="contact-form fade-up">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea rows="5" placeholder="Your Message" required></textarea>
        <button class="btn primary">Send Message</button>
      </form>

      <div class="contact-links fade-up">
        <a href="${contact.linkedin}" target="_blank">LinkedIn</a>
        <a href="${contact.github}" target="_blank">GitHub</a>
        <a href="${contact.instagram}" target="_blank">Instagram</a>
        <p>Email: ${contact.email}</p>
      </div>
    `;
    contactContainer.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  }
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

  const expContainer = document.getElementById('experienceContent');
  if (expContainer) {
    expContainer.innerHTML = `<div class="timeline">${html}</div>`;
    expContainer.querySelectorAll('.fade').forEach(el => observer.observe(el));
  }
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
    'AI & ML Developer',
    'Android Developer (with AI Integration)',
    'Full-stack Web Engineer',
    'Flutter Developer',
    'Drone Operations & Technical Engineer',
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
    link.rel = "noopener";
    link.setAttribute("aria-label", item.name || "Social Link");
    link.innerHTML = `<i class="${item.icon}" aria-hidden="true"></i>`;
    footerIcons.appendChild(link);
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
});

// ==========================================
// Hamburger Menu & Accessibility Focus Trap
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinksContainer = document.getElementById("navLinks");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (hamburger && navLinksContainer) {
    hamburger.setAttribute("aria-expanded", "false");

    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
      hamburger.classList.toggle("active");
      navLinksContainer.classList.toggle("active");
      
      if (!isExpanded) {
        document.body.style.overflow = "hidden"; // Prevent background scroll
        // Focus first link in drawer
        const firstLink = navLinksContainer.querySelector("a");
        if (firstLink) {
          setTimeout(() => firstLink.focus(), 100);
        }
      } else {
        document.body.style.overflow = "";
      }
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinksContainer.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinksContainer.classList.contains("active")) {
        hamburger.classList.remove("active");
        navLinksContainer.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        hamburger.focus();
      }
    });

    // Trap focus inside mobile drawer
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && navLinksContainer.classList.contains("active")) {
        const focusables = Array.from(navLinksContainer.querySelectorAll("a[href]"));
        const elements = [hamburger, ...focusables];
        const first = elements[0];
        const last = elements[elements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  // ==========================================
  // Back to Top Button scroll handler
  // ==========================================
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
