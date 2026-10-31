/* ==========================================================
   Portfolio interactivity
   1. Mobile menu   2. Theme toggle   3. Project tabs
   4. Scroll-spy    5. Contact form   6. Copy email   7. Footer year
   Everything is wrapped in an IIFE so no variables leak globally.
   ========================================================== */
(function () {
  'use strict';

  // Tells the CSS that JavaScript is running (used for the tab styles).
  document.documentElement.classList.add('js');

  /* ---------- 1. Mobile menu ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open)); // keeps screen readers in sync
  });

  // Close the menu after choosing a link (mobile).
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- 2. Theme toggle (light / dark) ---------- */
  var themeBtn = document.getElementById('themeBtn');
  var root = document.documentElement;

  function applyTheme(theme) {
    root.dataset.theme = theme;
    themeBtn.setAttribute('aria-pressed', String(theme === 'dark'));
    themeBtn.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    try { localStorage.setItem('theme', theme); } catch (e) { /* storage can be blocked; ignore */ }
  }

  // Start from the saved choice, otherwise the visitor's system setting.
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  themeBtn.addEventListener('click', function () {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  /* ---------- 3. Project tabs ---------- */
  // Builds a tab button for each <article class="project"> in the HTML.
  // Without JavaScript all projects simply stay visible as a list.
  var tablist = document.getElementById('projectTabs');
  var panels = Array.prototype.slice.call(document.querySelectorAll('#projectPanels .project'));
  var tabs = [];

  function selectTab(index, moveFocus) {
    tabs.forEach(function (tab, i) {
      var active = i === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;      // only the active tab is in the tab order
      panels[i].hidden = !active;
    });
    if (moveFocus) tabs[index].focus();
  }

  panels.forEach(function (panel, i) {
    var tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'tab';
    tab.id = 'tab-' + panel.id;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    tab.textContent = panel.dataset.title;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);

    tab.addEventListener('click', function () { selectTab(i, false); });

    // Arrow keys / Home / End move between tabs (standard tab keyboard pattern).
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      if (next !== null) { e.preventDefault(); selectTab(next, true); }
    });

    tabs.push(tab);
    tablist.appendChild(tab);
  });
  if (panels.length) selectTab(0, false);

  /* ---------- 4. Scroll-spy: highlight the nav link for the section in view ---------- */
  var links = Array.prototype.slice.call(navLinks.querySelectorAll('a'));
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (a) {
            if (a.getAttribute('href') === '#' + entry.target.id) a.setAttribute('aria-current', 'true');
            else a.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' }); // a section counts when it crosses the middle of the screen

    links.forEach(function (a) {
      var section = document.querySelector(a.getAttribute('href'));
      if (section) observer.observe(section);
    });
  }

  /* ---------- 5. Contact form: validation + feedback ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  var TO_EMAIL = 'you@example.com'; // TODO: replace with your real email

  // Returns an error message, or '' if the field is fine.
  function check(field) {
    var value = field.value.trim();
    if (!value) return 'Enter your ' + (field.name === 'message' ? 'message.' : field.name + '.');
    if (field.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Enter an email address like name@example.com.';
    }
    return '';
  }

  function showError(field, message) {
    var box = document.getElementById(field.id + '-error');
    box.textContent = message;
    box.hidden = !message;
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', box.id);
    } else {
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    }
  }

  var fields = Array.prototype.slice.call(form.querySelectorAll('input, textarea'));

  // Validate a field when the visitor leaves it, and clear errors as they fix them.
  fields.forEach(function (field) {
    field.addEventListener('blur', function () { showError(field, check(field)); });
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid')) showError(field, check(field));
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.className = 'status';
    status.textContent = '';

    var firstBad = null;
    fields.forEach(function (field) {
      var message = check(field);
      showError(field, message);
      if (message && !firstBad) firstBad = field;
    });

    if (firstBad) {
      status.textContent = 'Fix the highlighted fields and send again.';
      firstBad.focus(); // moves keyboard and screen reader users to the problem
      return;
    }

    // GitHub Pages is static (no server), so the form opens the visitor's
    // email app with the message filled in. See README for the Formspree upgrade.
    var data = new FormData(form);
    var subject = 'Portfolio message from ' + data.get('name');
    var body = data.get('message') + '\n\n' + data.get('name') + '\n' + data.get('email');
    window.location.href = 'mailto:' + TO_EMAIL +
      '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    status.className = 'status ok';
    status.textContent = 'Your email app should open with the message ready. Press send there to finish.';
    form.reset();
  });

  /* ---------- 6. Copy email button ---------- */
  var copyBtn = document.getElementById('copyEmail');
  copyBtn.addEventListener('click', function () {
    var address = document.getElementById('emailLink').textContent;
    if (!navigator.clipboard) { copyBtn.textContent = 'Select and copy it above'; return; }
    navigator.clipboard.writeText(address).then(function () {
      copyBtn.textContent = 'Copied';
      setTimeout(function () { copyBtn.textContent = 'Copy email'; }, 2000);
    }, function () {
      copyBtn.textContent = 'Copy failed';
    });
  });

  /* ---------- 7. Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
