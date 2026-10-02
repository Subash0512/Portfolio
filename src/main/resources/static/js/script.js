document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  // Active top navigation.
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const targetPath = href.split('#')[0].replace(/\/$/, '') || '/';
    link.classList.toggle('active', targetPath === path && (path !== '/' || href === '/'));
  });

  // Smooth same-page anchor scrolling.
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const url = new URL(anchor.href, window.location.href);
      const target = document.querySelector(url.hash);
      const samePath = url.pathname.replace(/\/$/, '') === path;
      if (target && samePath) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelector('.mobile-panel')?.classList.remove('open');
      }
    });
  });

  // Mobile menu.
  const menuToggle = document.querySelector('[data-mobile-toggle]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');
  menuToggle?.addEventListener('click', () => {
    const open = mobilePanel.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.innerHTML = open ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
  });

  // Scroll reveal.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  setupFilters();
  setupDialogs();
});

function setupFilters() {
  const buttons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-project-card]');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      cards.forEach((card) => {
        const categories = (card.dataset.category || '').split(/\s+/);
        card.classList.toggle('is-hidden', !(filter === 'all' || categories.includes(filter)));
      });
    });
  });
}

const projectData = {
  'ai-resume-maker': {
    title: 'AI Resume Maker / AI Career Companion',
    label: 'AI + BACKEND',
    tech: 'Java · Spring Boot · Spring Data JPA · MySQL · Google Gemini · Apache PDFBox',
    html: `
      <p>A Spring Boot career platform that brings several job-readiness workflows into one application.</p>
      <h4>Capabilities</h4>
      <ul>
        <li>Resume creation and retrieval through REST endpoints.</li>
        <li>Resume analysis with score, strengths, weaknesses, missing skills and suggestions.</li>
        <li>Resume-to-job matching using a job title and job description.</li>
        <li>Interview preparation and career guidance for a target role.</li>
        <li>Personalized study-plan generation from resume and target role information.</li>
        <li>Persistent history through Spring Data JPA and MySQL.</li>
      </ul>
      <h4>Engineering</h4>
      <p>Spring Security, Bean Validation, exception handling, Apache PDFBox parsing and a Google Gemini based AI service layer are part of the architecture.</p>`
  },
  'job-automation-bot': {
    title: 'Job Automation Bot',
    label: 'AUTOMATION + DATA',
    tech: 'Python · Playwright · SQLite · Flask · Gmail SMTP · Windows Task Scheduler',
    html: `
      <p>A Python automation workflow for collecting relevant jobs, applying preference rules, persisting results and tracking progress.</p>
      <h4>Workflow</h4>
      <p>Collect → Filter → Store → Apply → Track → Notify</p>
      <h4>Implementation</h4>
      <ul>
        <li>Filters jobs by role, location, experience and posting freshness.</li>
        <li>Uses SQLite persistence and duplicate protection for job records.</li>
        <li>Uses Playwright for browser automation and application workflows.</li>
        <li>Tracks application state and can send Gmail SMTP summaries.</li>
        <li>Designed for scheduled execution with Windows Task Scheduler.</li>
      </ul>
      <h4>Recorded run</h4>
      <p>A recorded run processed 93 jobs, identified 1 matching job, saved 0 new records, submitted 0 applications, recorded 0 errors and completed with a summary email.</p>`
  },
  'hospital-management': {
    title: 'Hospital Management System',
    label: 'JAVA + SPRING BOOT',
    tech: 'Java · Spring Boot · Spring Data JPA · MySQL · REST APIs · Thymeleaf',
    html: `
      <p>A backend-oriented hospital workflow application focused on structured CRUD operations and relational data.</p>
      <h4>Core areas</h4>
      <ul>
        <li>Patient and doctor management.</li>
        <li>Appointments and medical records.</li>
        <li>Billing workflows.</li>
        <li>Validation and REST API testing with Postman.</li>
      </ul>
    `
  },
  'prism': {
    title: 'PRISM | Spider',
    label: 'SECURITY PROJECT',
    tech: 'Python · Linux · ClamAV · YARA · Tkinter',
    html: `
      <p>A collaborative Linux malware-detection project built around multiple scanning layers and a cache-aware processing workflow.</p>
      <h4>Highlights</h4>
      <ul>
        <li>ClamAV and YARA scanning integration.</li>
        <li>SHA-256 based intelligent caching.</li>
        <li>Quarantine management.</li>
        <li>Automated PDF reporting.</li>
      </ul>
    `
  },
  'portfolio': {
    title: 'Personal Portfolio',
    label: 'THIS WEBSITE',
    tech: 'Java · Spring Boot · Thymeleaf · CSS · JavaScript · Bootstrap',
    html: `
      <p>A server-rendered portfolio that presents projects, skills, experience, education and a working contact workflow.</p>
      <h4>Design direction</h4>
      <p>The current iteration uses a restrained editorial layout with strong typography, a focused color palette, accessible interactions and responsive project storytelling.</p>
    `
  }
};

function setupDialogs() {
  const backdrop = document.querySelector('[data-project-dialog]');
  if (!backdrop) return;

  window.openProjectDialog = id => {
    const project = projectData[id];
    if (!project) return;
    document.querySelector('[data-dialog-title]').textContent = project.title;
    document.querySelector('[data-dialog-label]').textContent = project.label;
    document.querySelector('[data-dialog-tech]').textContent = project.tech;
    document.querySelector('[data-dialog-body]').innerHTML = project.html;
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-project-open]').forEach((btn) => {
    btn.addEventListener('click', () => {
      window.openProjectDialog(btn.dataset.projectOpen);
    });
  });
  backdrop.querySelector('[data-dialog-close]')?.addEventListener('click', close);
  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) {
      close();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      close();
    }
  });
}
