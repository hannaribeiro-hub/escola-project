(function () {
  const section = document.querySelector('main > section');
  const img = section && section.querySelector('img');
  if (!img) return;

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect();
      const progresso = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      img.style.transform = `translateY(${progresso * 24}px) scale(${1 + progresso * 0.04})`;
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
