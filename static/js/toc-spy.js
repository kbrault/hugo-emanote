(function () {
  var toc = document.getElementById('toc');
  if (!toc) return;

  var links = Array.prototype.slice.call(toc.querySelectorAll('a.toc-link'));
  if (!links.length) return;

  var targets = links
    .map(function (a) {
      var id = a.getAttribute('data-toc-target');
      var el = id && document.getElementById(id);
      return el ? { link: a, el: el } : null;
    })
    .filter(Boolean);

  if (!targets.length) return;

  var current = null;
  function setActive(link) {
    if (current === link) return;
    if (current) current.classList.remove('toc-active');
    if (link) link.classList.add('toc-active');
    current = link;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var match = targets.find(function (t) { return t.el === entry.target; });
          if (match) setActive(match.link);
        }
      });
    },
    { rootMargin: '0px 0px -70% 0px', threshold: 0 }
  );

  targets.forEach(function (t) { observer.observe(t.el); });
})();
