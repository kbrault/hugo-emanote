(function () {
  var STORAGE_KEY = 'hugo-theme';

  function isDark() {
    return document.documentElement.classList.contains('dark');
  }

  function apply(dark) {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    try { localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light'); } catch (e) {}
  }

  window.themeToggle = function () {
    apply(!isDark());
  };

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-theme-toggle]');
    if (btn) window.themeToggle();
  });
})();
