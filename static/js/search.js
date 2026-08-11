(function () {
  var modal = document.querySelector('[data-search-modal]');
  if (!modal) return;
  var input = modal.querySelector('[data-search-input]');
  var resultsEl = modal.querySelector('[data-search-results]');
  var emptyEl = modal.querySelector('[data-search-empty]');

  var indexPromise = null;
  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch(window.emanoteSearchIndexUrl || '/index.json')
        .then(function (r) { return r.ok ? r.json() : []; })
        .catch(function () { return []; });
    }
    return indexPromise;
  }

  function open() {
    modal.hidden = false;
    loadIndex();
    setTimeout(function () { input.focus(); }, 0);
  }

  function close() {
    modal.hidden = true;
    input.value = '';
    resultsEl.innerHTML = '';
    emptyEl.classList.add('hidden');
  }

  function render(items) {
    resultsEl.innerHTML = '';
    emptyEl.classList.toggle('hidden', items.length !== 0);
    items.slice(0, 30).forEach(function (item) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = item.url;
      a.className = 'block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors';
      var title = document.createElement('div');
      title.className = 'font-sans font-semibold text-sm text-primary-600 dark:text-primary-300';
      title.textContent = item.title;
      a.appendChild(title);
      if (item.summary) {
        var summary = document.createElement('div');
        summary.className = 'text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1';
        summary.textContent = item.summary;
        a.appendChild(summary);
      }
      li.appendChild(a);
      resultsEl.appendChild(li);
    });
  }

  input.addEventListener('input', function () {
    var q = input.value.trim().toLowerCase();
    if (!q) { render([]); return; }
    loadIndex().then(function (items) {
      var filtered = items.filter(function (item) {
        return (
          (item.title && item.title.toLowerCase().indexOf(q) !== -1) ||
          (item.summary && item.summary.toLowerCase().indexOf(q) !== -1)
        );
      });
      render(filtered);
    });
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-search-open]')) {
      e.preventDefault();
      open();
    } else if (e.target === modal) {
      close();
    }
  });

  document.addEventListener('keydown', function (e) {
    var mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.hidden ? open() : close();
    } else if (e.key === 'Escape' && !modal.hidden) {
      close();
    }
  });
})();
