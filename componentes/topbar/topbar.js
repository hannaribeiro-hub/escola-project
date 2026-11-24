(function () {
  const topbar = document.querySelector('body > aside');
  if (!topbar) return;
  topbar.classList.add('topbar');

  let ultimoY = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      topbar.classList.toggle('topbar--hidden', y > 80 && y > ultimoY);
      ultimoY = y;
    },
    { passive: true }
  );
})();
