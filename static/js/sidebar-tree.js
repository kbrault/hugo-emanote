(function () {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-tree-toggle]');
    if (!btn) return;
    var row = btn.closest('.pl-2');
    if (!row) return;
    var children = row.querySelector(':scope > .tree-children');
    if (!children) return;
    var chevron = btn.querySelector('[data-tree-chevron]');
    var open = children.classList.toggle('hidden') === false;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (chevron) chevron.classList.toggle('-rotate-90', !open);
  });
})();
