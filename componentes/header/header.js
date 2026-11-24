(function () {
  const header = document.querySelector('header');
  if (!header) return;

  const onScroll = () => header.classList.toggle('header--scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
