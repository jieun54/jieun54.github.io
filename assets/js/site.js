// Light/dark toggle: remembers the visitor's choice in localStorage.
(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var root = document.documentElement;
    var current = root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

// Publication filters on the Research page.
(function () {
  var chips = document.querySelectorAll('.chip[data-filter]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      document.querySelectorAll('.pub').forEach(function (p) {
        p.hidden = !(f === 'all' || p.getAttribute('data-theme-key') === f);
      });
      // Hide a year heading when none of its papers are showing.
      document.querySelectorAll('.year-group').forEach(function (g) {
        g.hidden = !g.querySelector('.pub:not([hidden])');
      });
    });
  });
})();

// "Abstract" buttons expand the abstract under a publication.
(function () {
  document.querySelectorAll('.abs-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var abs = btn.closest('.pub-body').querySelector('.abstract');
      abs.hidden = !abs.hidden;
      btn.setAttribute('aria-expanded', String(!abs.hidden));
    });
  });
})();
