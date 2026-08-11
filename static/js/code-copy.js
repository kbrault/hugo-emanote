(function () {
  var copySvg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>';
  var checkSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  function addButtons() {
    document.querySelectorAll('#note-body pre').forEach(function (pre) {
      if (pre.querySelector('.code-copy-button')) return;
      var code = pre.querySelector('code');
      if (!code) return;

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'code-copy-button';
      btn.title = 'Copy code';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      btn.innerHTML = copySvg;

      btn.addEventListener('click', function () {
        navigator.clipboard.writeText(code.innerText).then(function () {
          btn.innerHTML = checkSvg;
          setTimeout(function () { btn.innerHTML = copySvg; }, 1500);
        });
      });

      pre.appendChild(btn);
    });
  }

  document.addEventListener('DOMContentLoaded', addButtons);
  if (document.readyState !== 'loading') addButtons();
})();
