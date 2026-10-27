/* Shared behaviour for every page: nav, scroll progress, back to top,
   scroll spy, accordion. */
(function () {
  var doc = document;

  // Nav toggle (mobile)
  var toggle = doc.getElementById('nav-toggle'), links = doc.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('active');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('active'); toggle.setAttribute('aria-expanded', 'false'); });
    });
  }

  // Scroll progress bar under the nav
  var bar = doc.createElement('div');
  bar.className = 'scroll-progress'; bar.setAttribute('aria-hidden', 'true');
  var nav = doc.querySelector('.site-nav');
  if (nav) nav.appendChild(bar);

  // Back to top
  var top = doc.getElementById('back-to-top');
  if (!top) {
    top = doc.createElement('button');
    top.id = 'back-to-top'; top.setAttribute('aria-label', 'Back to top'); top.innerHTML = '&uarr;';
    doc.body.appendChild(top);
  }
  top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  function onScroll() {
    var h = doc.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(window.scrollY / h, 1) : 0) + ')';
    top.classList.toggle('visible', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Scroll spy (index only)
  var spy = Array.prototype.slice.call(doc.querySelectorAll('.nav-links a[href^="#"]:not(.nav-cta)'));
  if (spy.length && 'IntersectionObserver' in window) {
    var map = {};
    spy.forEach(function (a) { var s = doc.querySelector(a.getAttribute('href')); if (s) map[s.id] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          spy.forEach(function (a) { a.removeAttribute('aria-current'); });
          map[e.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { io.observe(doc.getElementById(id)); });
  }

  // Accordion (one open at a time)
  var items = Array.prototype.slice.call(doc.querySelectorAll('.acc-item'));
  function set(item, open) {
    item.classList.toggle('open', open);
    item.querySelector('.acc-head').setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  items.forEach(function (item, i) {
    set(item, i === 0);
    item.querySelector('.acc-head').addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      items.forEach(function (o) { set(o, false); });
      set(item, !wasOpen);
    });
  });
})();
