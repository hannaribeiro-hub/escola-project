(function () {
  const section = document.getElementById('inicio');
  if (!section) return;

  const slides = Array.from(section.querySelectorAll('.hero-item'));
  const dots = Array.from(section.querySelectorAll('[id^="dot"]'));
  if (!slides.length) return;

  let cur = 0;
  let timer = null;

  function update() {
    slides.forEach((s, i) => {
      const ativo = i === cur;
      s.classList.toggle('opacity-100', ativo);
      s.classList.toggle('z-10', ativo);
      s.classList.toggle('opacity-0', !ativo);
      s.classList.toggle('z-0', !ativo);
      s.classList.toggle('pointer-events-none', !ativo);
    });
    dots.forEach((d, i) => {
      d.className = i === cur
        ? 'w-8 h-2 rounded-full bg-secondary transition-all'
        : 'w-2.5 h-2 rounded-full bg-white/40 transition-all';
    });
  }

  function go(i) {
    cur = (i + slides.length) % slides.length;
    update();
    reiniciar();
  }

  function reiniciar() {
    clearInterval(timer);
    timer = setInterval(() => go(cur + 1), 5000);
  }

  window.setSlide = (i) => go(i);
  window.nextSlide = () => go(cur + 1);
  window.prevSlide = () => go(cur - 1);

  section.addEventListener('mouseenter', () => clearInterval(timer));
  section.addEventListener('mouseleave', reiniciar);

  update();
  reiniciar();
})();
