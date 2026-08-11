(function () {
  var btn = document.querySelector('[data-focus-toggle]');
  if (!btn) return;

  function setFocus(on) {
    document.documentElement.classList.toggle('note-focus', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    var maximizeIcon = btn.querySelector('[data-focus-icon="maximize"]');
    var restoreIcon = btn.querySelector('[data-focus-icon="restore"]');
    if (maximizeIcon) maximizeIcon.hidden = on;
    if (restoreIcon) restoreIcon.hidden = !on;
    btn.title = on ? 'Restore note layout' : 'Maximize note area';
  }

  btn.addEventListener('click', function () {
    setFocus(!document.documentElement.classList.contains('note-focus'));
  });
})();
