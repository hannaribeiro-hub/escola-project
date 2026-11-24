(function () {
  const header = document.querySelector('header');
  const btn = document.getElementById('btnMobileMenu');
  const menu = document.getElementById('mobileMenu');

  if (header) {
    const onScroll = () => header.classList.toggle('header--scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('hidden'));
    menu.querySelectorAll('.mobile-link').forEach((link) =>
      link.addEventListener('click', () => menu.classList.add('hidden'))
    );
  }
})();
