/* NEC design system v2 — header, mobile nav, accordions */
(function () {
  // Header darkens on scroll
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu toggle
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('mobile-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.documentElement.style.overflow = open ? 'hidden' : '';
    });
  }

  // Mobile: tapping a top-level label expands its submenu instead of navigating.
  // (Each expanded submenu carries an explicit Overview link.)
  document.querySelectorAll('.nav-item.has-children > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.matchMedia('(max-width: 900px)').matches && menu && menu.classList.contains('mobile-open')) {
        e.preventDefault();
        var item = link.parentElement;
        var wasOpen = item.classList.contains('open');
        menu.querySelectorAll('.nav-item.open').forEach(function (o) { o.classList.remove('open'); });
        if (!wasOpen) item.classList.add('open');
      }
    });
  });

  // Accordions (keyboard-accessible buttons)
  document.querySelectorAll('.accordion-trigger').forEach(function (btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var item = btn.closest('.accordion-item');
      var panel = item.querySelector('.accordion-panel');
      var isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (panel) panel.style.maxHeight = isOpen ? panel.scrollHeight + 'px' : '';
    });
  });
})();
